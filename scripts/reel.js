// Reels de Neriva en un solo comando. Necesita playwright (npm) con Chromium, y ffmpeg.
//   node reel.js ver   cuerpo.js 1,5,9,14 prev.png               -> vista previa (cuadros sueltos)
//   node reel.js final cuerpo.js voz.mp3 anclas.json salida.mp4 [sfx.json] [--sin-acelerar]   (por defecto recorta silencios y acelera x1.2)
// anclas.json: [[segundo_del_video, segundo_en_voz.mp3], ...] (una por frase, del texto de PHRASES)
// sfx.json (opcional): [[segundo_final, "whoosh"|"pop"|"boom"|"ding", volumen], ...]. Si falta, se arma solo.
const path = require('path'), fs = require('fs'), os = require('os'), cp = require('child_process')
const KIT = path.join(__dirname, '..', 'kit'), SFX = path.join(__dirname, '..', 'sfx')
const sh = (args) => cp.execFileSync('ffmpeg', ['-nostdin', '-y', '-loglevel', 'error', ...args], { stdio: ['ignore', 'pipe', 'pipe'] })

function armar(cuerpo) {
  // Dibujos aportados por otros (kit/aportes/*.js) se cargan antes del cuerpo.
  const ap = path.join(KIT, 'aportes'), aportes = fs.existsSync(ap) ? fs.readdirSync(ap).filter((f) => f.endsWith('.js')).sort() : []
  const tags = aportes.map((f) => `    <script src="aportes/${f}"></script>\n`).join('')
  const html = fs.readFileSync(path.join(KIT, 'plantilla.html'), 'utf8').replace('    <script>\n', tags + '    <script>\n').replace('/*CUERPO*/', fs.readFileSync(cuerpo, 'utf8'))
  const out = path.join(KIT, path.basename(cuerpo, '.js') + '.html')
  fs.writeFileSync(out, html)
  return out
}

async function pagina(html) {
  const { chromium } = require('playwright')
  const b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 1080, height: 1920 } })
  const errs = []
  pg.on('pageerror', (e) => errs.push(String(e)))
  await pg.goto('file://' + path.resolve(html))
  await pg.evaluate('document.fonts.ready')
  await pg.waitForTimeout(300)
  return { b, pg, errs }
}

const mapa = (A) => (T) => {
  for (let i = 0; i < A.length - 1; i++) {
    const [o0, n0] = A[i], [o1, n1] = A[i + 1]
    if (T <= n1) return o0 + ((T - n0) / (n1 - n0)) * (o1 - o0)
  }
  return A[A.length - 1][0] + (T - A[A.length - 1][1])
}

async function ver(cuerpo, ts, out) {
  const html = armar(cuerpo), { b, pg, errs } = await pagina(html)
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'prev-')), list = ts.split(',')
  for (const [i, t] of list.entries()) {
    await pg.evaluate(`render(${t})`)
    await pg.screenshot({ path: `${dir}/p${i}.png` })
  }
  await b.close()
  sh(['-i', `${dir}/p%d.png`, '-vf', `scale=270:480,tile=${list.length}x1`, out])
  console.log(errs.length ? 'ERRORES: ' + errs.join(' | ') : 'ok ' + out)
}

// Recorta silencios largos y acelera la voz. Devuelve la función tiempo_original -> tiempo_nuevo.
function comprimir(src, out, tempo) {
  const r = cp.spawnSync('ffmpeg', ['-nostdin', '-i', src, '-af', 'silencedetect=n=-35dB:d=0.25', '-f', 'null', '-'], { encoding: 'utf8' }).stderr
  const st = [...r.matchAll(/silence_start: ([\d.]+)/g)].map((m) => +m[1]), en = [...r.matchAll(/silence_end: ([\d.]+)/g)].map((m) => +m[1])
  const dur = +cp.execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src], { encoding: 'utf8' })
  const KEEP = 0.18, cuts = []
  st.forEach((s, i) => en[i] - s > KEEP && cuts.push([s + KEEP / 2, en[i] - KEEP / 2]))
  const keep = []
  let a = 0
  for (const [s, e] of cuts) keep.push([a, s]), (a = e)
  keep.push([a, dur])
  let f = keep.map(([s, e], i) => `[0]atrim=${s}:${e},asetpts=PTS-STARTPTS[k${i}];`).join('')
  f += keep.map((_, i) => `[k${i}]`).join('') + `concat=n=${keep.length}:v=0:a=1,atempo=${tempo}[a]`
  sh(['-i', src, '-filter_complex', f, '-map', '[a]', out])
  return (t) => {
    let q = 0
    for (const [s, e] of cuts) q += t >= e ? e - s : t > s ? t - s : 0
    return (t - q) / tempo
  }
}

// Efectos automáticos: boom al arrancar, whoosh en cada escena nueva, pop cuando entra un objeto, ding en el cierre.
function sfxAuto(items, toNew, dur) {
  const P = { boom: 4, whoosh: 3, ding: 2, pop: 1 }, V = { boom: 0.7, whoosh: 0.6, ding: 0.45, pop: 0.5 }, ev = [[0.05, 'boom']]
  for (const it of items) {
    if (it.t <= 0.05) continue
    if (it.z >= 40) ev.push([it.t, 'ding'])
    else if (it.w >= 1000) ev.push([it.t, 'whoosh'])
    else if (['pop', 'stamp', 'spin', 'zoom', 'drop'].includes(it.in)) ev.push([it.t, 'pop'])
  }
  ev.sort((x, y) => x[0] - y[0] || P[y[1]] - P[x[1]])
  const out = []
  for (const [t, n] of ev) {
    const T = toNew(t), last = out[out.length - 1]
    if (T >= dur - 0.3) continue
    if (last && T - last[0] < 0.35) { if (P[n] > P[last[1]]) out[out.length - 1] = [T, n, V[n]]; continue }
    out.push([+T.toFixed(2), n, V[n]])
  }
  return out
}

async function parte(html, anc, dir, from, to) {
  const toOld = mapa(JSON.parse(anc)), { b, pg } = await pagina(html)
  for (let i = +from; i < +to; i++) {
    await pg.evaluate(`render(${Math.max(0, toOld(i / 30))})`)
    await pg.screenshot({ path: `${dir}/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 })
  }
  await b.close()
}

async function final(cuerpo, voz, anclasF, out, ...resto) {
  const sfxF = resto.find((x) => x.endsWith('.json')), tempo = resto.includes('--sin-acelerar') ? 1 : 1.2
  const html = armar(cuerpo), { b, pg, errs } = await pagina(html)
  const items = await pg.evaluate('ITEMS.map((i) => ({ t: i.t[0], end: i.t[1], w: i.w, in: i.in, z: i.z || 0 }))')
  await b.close()
  if (errs.length) throw new Error('El video tiene errores: ' + errs.join(' | '))
  const finVideo = Math.max(...items.map((i) => i.end))
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'reel-')), voz2 = path.join(tmp, 'voz.mp3')
  const m = tempo === 1 ? (fs.copyFileSync(voz, voz2), (t) => t) : comprimir(voz, voz2, tempo)
  const A = JSON.parse(fs.readFileSync(anclasF)).map(([v, a]) => [v, +m(a).toFixed(2)]).sort((x, y) => x[0] - y[0])
  if (A[0][0] > 0) A.unshift([0, 0])
  const [lv, ln] = A[A.length - 1]
  A.push([finVideo, ln + (finVideo - lv)])
  const dur = A[A.length - 1][1], n = Math.round(30 * dur), W = Math.max(1, Math.min(4, os.cpus().length))
  const toNew = (t) => { for (let i = 0; i < A.length - 1; i++) if (t <= A[i + 1][0]) return A[i][1] + ((t - A[i][0]) / (A[i + 1][0] - A[i][0])) * (A[i + 1][1] - A[i][1]); return dur }
  const S = sfxF ? JSON.parse(fs.readFileSync(sfxF)) : sfxAuto(items, toNew, dur)
  const frames = path.join(tmp, 'f')
  fs.mkdirSync(frames)
  console.log(`Renderizando ${dur.toFixed(1)} s en ${W} partes...`)
  await Promise.all(Array.from({ length: W }, (_, k) => new Promise((ok, mal) => {
    const p = cp.spawn(process.execPath, [__filename, 'parte', html, JSON.stringify(A), frames, Math.floor((n * k) / W), Math.floor((n * (k + 1)) / W)], { stdio: 'inherit' })
    p.on('exit', (c) => (c ? mal(new Error('falló una parte')) : ok()))
  })))
  const inp = ['-framerate', '30', '-i', `${frames}/f%04d.jpg`, '-i', voz2]
  const f = S.map(([t, nm, v], i) => (inp.push('-i', path.join(SFX, nm + '.wav')), `[${i + 2}]adelay=${Math.round(t * 1000)}:all=1,volume=${v}[s${i}]`))
  const mix = `[1]apad[v];${f.join(';')}${f.length ? ';' : ''}[v]${S.map((_, i) => `[s${i}]`).join('')}amix=inputs=${S.length + 1}:normalize=0:duration=first,alimiter=limit=0.95[a]`
  sh([...inp, '-filter_complex', mix, '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-t', String(dur), '-movflags', '+faststart', out])
  fs.rmSync(tmp, { recursive: true })
  console.log(`ok ${out} (${dur.toFixed(1)} s, ${S.length} efectos)`)
}

const [cmd, ...args] = process.argv.slice(2)
const fn = { ver, final, parte }[cmd]
if (!fn) console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(0, 5).join('\n'))
else fn(...args).catch((e) => { console.error(e.message); process.exit(1) })
