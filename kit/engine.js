// =============================================================================
// MOTOR NERIVA — anima ITEMS en el tiempo y subtítulos palabra por palabra.
// Cada video define: ITEMS (qué aparece, dónde, cuándo y cómo), PHRASES
// (subtítulos) y opcionalmente HOOKS (efectos especiales por frame).
// render(t) dibuja el frame del segundo t (lo llama el renderizador).
// =============================================================================
const E = {
  clamp: (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)),
  ease: (x) => 1 - Math.pow(1 - E.clamp(x), 3),
  back: (x) => {
    x = E.clamp(x)
    const c = 1.9
    return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2)
  },
  elastic: (x) => {
    x = E.clamp(x)
    return x === 0 || x === 1
      ? x
      : Math.pow(2, -10 * x) * Math.sin(((x * 10 - 0.75) * (2 * Math.PI)) / 3) + 1
  },
  lerp: (a, b, k) => a + (b - a) * k,
}
// entradas: pop | drop | slideL | slideR | slideU | zoom | blur | spin | stamp | none
function enterFx(kind, k) {
  const e = E.ease(k),
    b = E.back(k)
  switch (kind) {
    case 'pop':
      return { s: E.lerp(0.2, 1, b), o: E.clamp(k * 3), blur: 0 }
    case 'drop':
      return { y: E.lerp(-900, 0, E.elastic(k)), o: E.clamp(k * 4) }
    case 'slideL':
      return { x: E.lerp(-1200, 0, b), o: 1 }
    case 'slideR':
      return { x: E.lerp(1200, 0, b), o: 1 }
    case 'slideU':
      return { y: E.lerp(700, 0, b), o: 1 }
    case 'zoom':
      return { s: E.lerp(3, 1, e), o: E.clamp(k * 2), blur: (1 - e) * 30 }
    case 'blur':
      return { s: E.lerp(1.15, 1, e), o: e, blur: (1 - e) * 24 }
    case 'spin':
      return { s: b, r: E.lerp(-180, 0, e), o: E.clamp(k * 3) }
    case 'stamp':
      return { s: E.lerp(2.6, 1, E.ease(k * 1.4)), o: E.clamp(k * 5), r: -8 }
    default:
      return { o: 1 }
  }
}
// salidas: blur | shrink | flyL | flyR | flyU | fade
function exitFx(kind, k) {
  const e = E.ease(k)
  switch (kind) {
    case 'shrink':
      return { s: 1 - e, o: 1 - e }
    case 'flyL':
      return { x: -1300 * e * e, o: 1 }
    case 'flyR':
      return { x: 1300 * e * e, o: 1 }
    case 'flyU':
      return { y: -1500 * e * e, o: 1 }
    case 'fade':
      return { o: 1 - e }
    default:
      return { s: 1 + e * 0.5, o: 1 - e, blur: e * 30 }
  }
}
// idle: float | bob | pulse | wobble | spin | none  (movimiento constante)
function idleFx(kind, t, seed = 0) {
  switch (kind) {
    case 'float':
      return { y: Math.sin(t * 2.2 + seed) * 14, r: Math.sin(t * 1.4 + seed) * 2 }
    case 'bob':
      return { y: -Math.abs(Math.sin(t * 5 + seed)) * 22 }
    case 'pulse':
      return { s: 1 + Math.sin(t * 6 + seed) * 0.04 }
    case 'wobble':
      return { r: Math.sin(t * 8 + seed) * 5 }
    case 'spin':
      return { r: t * 90 }
    default:
      return {}
  }
}
const ENTER_D = 0.38,
  EXIT_D = 0.28
let STAGE,
  CAP,
  CAMERA = { shakeUntil: 0, shakeAmt: 0 }
function setup() {
  STAGE = document.getElementById('stage')
  CAP = document.getElementById('cap')
  for (const it of ITEMS) {
    const d = document.createElement('div')
    d.className = 'it'
    d.innerHTML = it.html
    d.style.left = it.x + 'px'
    d.style.top = it.y + 'px'
    d.style.width = (it.w || 400) + 'px'
    d.style.zIndex = it.z || 5
    const sv = d.querySelector('svg')
    if (sv) {
      sv.setAttribute('width', '100%')
      sv.removeAttribute('height')
      sv.style.height = 'auto'
      sv.style.display = 'block'
    }
    STAGE.appendChild(d)
    it.el = d
  }
}
function shake(at, dur = 0.35, amt = 18) {
  ;(CAMERA.shakes ||= []).push([at, dur, amt])
}
function render(t) {
  if (!STAGE) setup()
  // cámara: deriva lenta + sacudones
  let sx = 0,
    sy = 0
  for (const [at, dur, amt] of CAMERA.shakes || [])
    if (t >= at && t < at + dur) {
      const k = 1 - (t - at) / dur
      sx += Math.sin(t * 90) * amt * k
      sy += Math.cos(t * 77) * amt * k
    }
  const zoom = 1 + 0.03 * Math.sin(t * 0.6) + (typeof CAMZOOM === 'function' ? CAMZOOM(t) : 0)
  STAGE.style.transform = `translate(${sx}px,${sy}px) scale(${zoom})`
  for (const it of ITEMS) {
    const el = it.el
    const tin = it.t[0],
      tout = it.t[1]
    if (t < tin || t > tout + EXIT_D) {
      el.style.opacity = 0
      el.style.visibility = 'hidden'
      continue
    }
    el.style.visibility = 'visible'
    let f = { x: 0, y: 0, s: 1, r: 0, o: 1, blur: 0 }
    const add = (g) => {
      if (!g) return
      f.x += g.x || 0
      f.y += g.y || 0
      f.r += g.r || 0
      if (g.s !== undefined) f.s *= g.s
      if (g.o !== undefined) f.o *= g.o
      f.blur += g.blur || 0
    }
    add(enterFx(it.in || 'pop', (t - tin) / (it.inD || ENTER_D)))
    if (t > tout) add(exitFx(it.out || 'blur', (t - tout) / EXIT_D))
    add(idleFx(it.idle || 'float', t, it.x * 0.01))
    if (it.hook) add(it.hook(t - tin, el, t))
    el.style.opacity = f.o
    el.style.transform = `translate(${f.x}px,${f.y}px) rotate(${f.r}deg) scale(${f.s})`
    el.style.filter = f.blur > 0.3 ? `blur(${f.blur}px)` : 'none'
  }
  // subtítulos palabra por palabra
  let html = ''
  for (let i = 0; i < PHRASES.length; i++) {
    const [t0, text, hi = []] = PHRASES[i]
    const t1 = i + 1 < PHRASES.length ? PHRASES[i + 1][0] : t0 + 2
    if (t < t0 || t >= t1) continue
    const words = text.split(' ')
    const per = Math.min(0.42, (t1 - t0 - 0.15) / words.length)
    const shown = Math.min(words.length, Math.floor((t - t0) / per) + 1)
    html = words
      .slice(0, shown)
      .map((w, j) => {
        const isHi = hi.some((h) => w.toLowerCase().includes(h.toLowerCase()))
        const fresh = j === shown - 1 ? E.back((t - t0 - j * per) / 0.18) : 1
        return `<span class="${isHi ? 'hi' : ''}" style="display:inline-block;transform:scale(${fresh})">${w}</span>`
      })
      .join(' ')
  }
  CAP.innerHTML = html
  if (typeof HOOKS === 'function') HOOKS(t)
  document.querySelectorAll('[data-tw]').forEach((p) => {
    p.style.opacity = 0.15 + 0.4 * Math.abs(Math.sin(t * 1.5 + +p.dataset.tw))
  })
}
