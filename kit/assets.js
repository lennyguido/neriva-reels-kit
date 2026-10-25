// =============================================================================
// KIT NERIVA — dibujos SVG reutilizables para reels animados.
// Cada función devuelve un string SVG (viewBox propio). Opciones por objeto.
// Paleta Neriva + acentos. Estilo: plano, degradés suaves, brillo arriba a la izq.
// =============================================================================
const C = {
  blue: '#1F4FD6',
  blue2: '#4A74F2',
  blue3: '#9DB4FF',
  ink: '#16181D',
  ink2: '#23262e',
  paper: '#F2F3F0',
  white: '#ffffff',
  red: '#ff4d4f',
  green: '#1f8f4e',
  green2: '#3ccf7a',
  yellow: '#ffc93c',
  orange: '#ff8a3d',
  pink: '#ff6fb5',
  purple: '#7b5cff',
  brown: '#7a4a2a',
  brown2: '#b07a4f',
  skin1: '#f6c9a3',
  skin2: '#d9a07a',
  skin3: '#9c6b4a',
  gray: '#8b93a3',
}
let _id = 0
const uid = (p = 'g') => `${p}${++_id}`

// ---- utilidades -------------------------------------------------------------
function grad(id, a, b, vertical = true) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`
}
function svg(w, h, body, defs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" overflow="visible"><defs>${defs}</defs>${body}</svg>`
}
const shine = (x, y, w, h, r = 30) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#fff" opacity=".18"/>`

// ---- caras (expresiones) ----------------------------------------------------
// expr: happy | smile | surprised | sad | worried | wink | angry | love | sleepy | shock
function face(cx, cy, s = 1, expr = 'smile', ink = C.ink) {
  const e = (dx, ry = 9) =>
    `<ellipse cx="${cx + dx * s}" cy="${cy}" rx="${8 * s}" ry="${ry * s}" fill="${ink}"/>`
  const eyeHi = (dx) =>
    `<circle cx="${cx + dx * s + 3 * s}" cy="${cy - 3 * s}" r="${2.6 * s}" fill="#fff"/>`
  let eyes = e(-22) + e(22) + eyeHi(-22) + eyeHi(22),
    mouth = '',
    extra = ''
  const my = cy + 26 * s
  switch (expr) {
    case 'happy':
      eyes = `<path d="M${cx - 31 * s} ${cy + 2 * s} q${9 * s} -${12 * s} ${18 * s} 0 M${cx + 13 * s} ${cy + 2 * s} q${9 * s} -${12 * s} ${18 * s} 0" stroke="${ink}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`
      mouth = `<path d="M${cx - 20 * s} ${my - 6 * s} q${20 * s} ${26 * s} ${40 * s} 0 z" fill="${ink}"/><path d="M${cx - 10 * s} ${my + 6 * s} q${10 * s} ${8 * s} ${20 * s} 0" fill="${C.red}"/>`
      break
    case 'smile':
      mouth = `<path d="M${cx - 16 * s} ${my - 4 * s} q${16 * s} ${16 * s} ${32 * s} 0" stroke="${ink}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`
      break
    case 'surprised':
      eyes = e(-22, 12) + e(22, 12) + eyeHi(-22) + eyeHi(22)
      mouth = `<ellipse cx="${cx}" cy="${my + 2 * s}" rx="${9 * s}" ry="${12 * s}" fill="${ink}"/>`
      break
    case 'shock':
      eyes = `<circle cx="${cx - 22 * s}" cy="${cy}" r="${13 * s}" fill="#fff" stroke="${ink}" stroke-width="${3 * s}"/><circle cx="${cx + 22 * s}" cy="${cy}" r="${13 * s}" fill="#fff" stroke="${ink}" stroke-width="${3 * s}"/><circle cx="${cx - 22 * s}" cy="${cy}" r="${4 * s}" fill="${ink}"/><circle cx="${cx + 22 * s}" cy="${cy}" r="${4 * s}" fill="${ink}"/>`
      mouth = `<ellipse cx="${cx}" cy="${my + 6 * s}" rx="${14 * s}" ry="${18 * s}" fill="${ink}"/>`
      extra = `<path d="M${cx + 48 * s} ${cy - 30 * s} q${8 * s} ${14 * s} 0 ${22 * s} q-${8 * s} -${8 * s} 0 -${22 * s}z" fill="${C.blue3}"/>`
      break
    case 'sad':
      mouth = `<path d="M${cx - 15 * s} ${my + 6 * s} q${15 * s} -${14 * s} ${30 * s} 0" stroke="${ink}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`
      extra = `<path d="M${cx - 34 * s} ${cy - 18 * s} l${16 * s} -${6 * s} M${cx + 34 * s} ${cy - 18 * s} l-${16 * s} -${6 * s}" stroke="${ink}" stroke-width="${4 * s}" stroke-linecap="round"/>`
      break
    case 'worried':
      mouth = `<path d="M${cx - 14 * s} ${my + 2 * s} q${7 * s} -${6 * s} ${14 * s} 0 q${7 * s} ${6 * s} ${14 * s} 0" stroke="${ink}" stroke-width="${4.5 * s}" fill="none" stroke-linecap="round"/>`
      extra = `<path d="M${cx + 46 * s} ${cy - 26 * s} q${8 * s} ${14 * s} 0 ${22 * s} q-${8 * s} -${8 * s} 0 -${22 * s}z" fill="${C.blue3}"/>`
      break
    case 'wink':
      eyes =
        e(-22) +
        eyeHi(-22) +
        `<path d="M${cx + 12 * s} ${cy} q${10 * s} -${8 * s} ${20 * s} 0" stroke="${ink}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`
      mouth = `<path d="M${cx - 16 * s} ${my - 4 * s} q${16 * s} ${16 * s} ${32 * s} 0" stroke="${ink}" stroke-width="${5 * s}" fill="none" stroke-linecap="round"/>`
      break
    case 'angry':
      extra = `<path d="M${cx - 34 * s} ${cy - 22 * s} l${18 * s} ${8 * s} M${cx + 34 * s} ${cy - 22 * s} l-${18 * s} ${8 * s}" stroke="${ink}" stroke-width="${5 * s}" stroke-linecap="round"/>`
      mouth = `<path d="M${cx - 14 * s} ${my + 4 * s} h${28 * s}" stroke="${ink}" stroke-width="${5 * s}" stroke-linecap="round"/>`
      break
    case 'love':
      eyes = [-22, 22]
        .map(
          (dx) =>
            `<path transform="translate(${cx + dx * s} ${cy}) scale(${s * 0.55})" d="M0 14 C-28 -6 -14 -26 0 -12 C14 -26 28 -6 0 14Z" fill="${C.red}"/>`,
        )
        .join('')
      mouth = `<path d="M${cx - 18 * s} ${my - 6 * s} q${18 * s} ${24 * s} ${36 * s} 0 z" fill="${ink}"/>`
      break
    case 'sleepy':
      eyes = `<path d="M${cx - 30 * s} ${cy} h${16 * s} M${cx + 14 * s} ${cy} h${16 * s}" stroke="${ink}" stroke-width="${5 * s}" stroke-linecap="round"/>`
      mouth = `<ellipse cx="${cx}" cy="${my}" rx="${6 * s}" ry="${5 * s}" fill="${ink}"/>`
      break
  }
  const blush = `<ellipse cx="${cx - 40 * s}" cy="${cy + 18 * s}" rx="${10 * s}" ry="${6 * s}" fill="${C.pink}" opacity=".35"/><ellipse cx="${cx + 40 * s}" cy="${cy + 18 * s}" rx="${10 * s}" ry="${6 * s}" fill="${C.pink}" opacity=".35"/>`
  return eyes + mouth + blush + extra
}

// ---- MASCOTA: "Puntito" (tarjeta de puntos con vida) ------------------------
function mascot({ expr = 'happy', color = C.blue2, stamps = 3, arms = 'down' } = {}) {
  const g = uid('m')
  const armL =
    arms === 'up'
      ? 'M40 170 q-40 -60 -20 -110'
      : arms === 'wave'
        ? 'M40 170 q-50 -20 -40 -90'
        : 'M40 180 q-30 30 -20 70'
  const armR =
    arms === 'up'
      ? 'M320 170 q40 -60 20 -110'
      : arms === 'point'
        ? 'M320 180 q50 -10 80 -30'
        : 'M320 180 q30 30 20 70'
  const st = Array.from(
    { length: 5 },
    (_, i) =>
      `<circle cx="${95 + i * 42}" cy="250" r="14" fill="${i < stamps ? C.yellow : 'none'}" stroke="#fff" stroke-width="4" opacity="${i < stamps ? 1 : 0.6}"/>`,
  ).join('')
  return svg(
    360,
    360,
    `
    <ellipse cx="180" cy="340" rx="120" ry="14" fill="#000" opacity=".25"/>
    <path d="${armL}" stroke="${color}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="${armR}" stroke="${color}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M140 300 v30 M220 300 v30" stroke="${C.ink}" stroke-width="20" stroke-linecap="round"/>
    <rect x="40" y="70" width="280" height="230" rx="44" fill="url(#${g})"/>
    ${shine(60, 84, 120, 26, 13)}
    <rect x="70" y="228" width="220" height="44" rx="22" fill="#000" opacity=".15"/>${st}
    ${face(180, 150, 1.3, expr, C.ink)}`,
    grad(g, C.blue3, color),
  )
}

// ---- PERSONAS ---------------------------------------------------------------
// role: owner (delantal) | client | barber | girl | kid | grandma ; expr
function person({
  role = 'client',
  expr = 'smile',
  skin = C.skin1,
  shirt = C.blue2,
  hair = C.ink,
  hairStyle = 'short',
  pose = 'idle',
  apron = null,
} = {}) {
  const g = uid('p')
  const hairs = {
    short: `<path d="M110 120 q70 -80 140 0 q-10 -30 -70 -34 q-60 4 -70 34z" fill="${hair}"/>`,
    long: `<path d="M100 130 q80 -110 160 0 v110 q-20 -20 -20 -60 v-40 q-60 -40 -120 0 v40 q0 40 -20 60z" fill="${hair}"/>`,
    bun: `<circle cx="180" cy="44" r="26" fill="${hair}"/><path d="M110 122 q70 -80 140 0 q-10 -30 -70 -34 q-60 4 -70 34z" fill="${hair}"/>`,
    curly: Array.from(
      { length: 9 },
      (_, i) =>
        `<circle cx="${112 + i * 17}" cy="${90 - Math.sin((i / 8) * Math.PI) * 26}" r="20" fill="${hair}"/>`,
    ).join(''),
    bald: '',
    cap: `<path d="M108 112 q72 -70 144 0z" fill="${C.red}"/><rect x="200" y="104" width="70" height="14" rx="7" fill="${C.red}"/>`,
    gray: `<path d="M110 122 q70 -80 140 0 q-10 -30 -70 -34 q-60 4 -70 34z" fill="#d6d6d6"/><circle cx="180" cy="46" r="22" fill="#d6d6d6"/>`,
  }
  const armsP =
    pose === 'wave'
      ? `<path d="M110 250 q-60 -40 -50 -120" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/><circle cx="60" cy="126" r="20" fill="${skin}"/><path d="M250 250 q30 60 20 110" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/>`
      : pose === 'phone'
        ? `<path d="M110 250 q-20 60 30 90" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/><path d="M250 250 q20 60 -30 90" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/><rect x="150" y="300" width="60" height="96" rx="12" fill="${C.ink}" transform="rotate(-8 180 340)"/><rect x="157" y="308" width="46" height="78" rx="8" fill="${C.blue3}" transform="rotate(-8 180 340)"/>`
        : pose === 'point'
          ? `<path d="M250 250 q60 -10 100 -50" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/><circle cx="352" cy="198" r="20" fill="${skin}"/><path d="M110 250 q-30 60 -20 110" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/>`
          : pose === 'cheer'
            ? `<path d="M110 250 q-60 -60 -40 -150" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/><path d="M250 250 q60 -60 40 -150" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/><circle cx="70" cy="96" r="20" fill="${skin}"/><circle cx="290" cy="96" r="20" fill="${skin}"/>`
            : `<path d="M110 250 q-30 60 -20 110" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/><path d="M250 250 q30 60 20 110" stroke="${shirt}" stroke-width="36" fill="none" stroke-linecap="round"/>`
  const ap = apron
    ? `<path d="M140 250 h80 v170 q-40 14 -80 0z" fill="${apron}"/><path d="M150 252 q30 -30 60 0" stroke="${apron}" stroke-width="8" fill="none"/><rect x="160" y="320" width="40" height="30" rx="6" fill="#000" opacity=".15"/>`
    : ''
  const extra =
    role === 'barber'
      ? `<path d="M250 380 l30 -40 M262 386 l26 -34" stroke="${C.gray}" stroke-width="7" stroke-linecap="round"/>`
      : ''
  return svg(
    360,
    460,
    `
    <ellipse cx="180" cy="448" rx="110" ry="12" fill="#000" opacity=".22"/>
    <path d="M90 460 q0 -230 90 -230 q90 0 90 230z" fill="url(#${g})"/>
    ${armsP}${ap}
    <rect x="166" y="190" width="28" height="40" fill="${skin}"/>
    <circle cx="180" cy="140" r="78" fill="${skin}"/>
    <circle cx="102" cy="146" r="14" fill="${skin}"/><circle cx="258" cy="146" r="14" fill="${skin}"/>
    ${hairs[hairStyle] || ''}
    ${face(180, 146, 1, expr)}${extra}`,
    grad(g, shirt, shade(shirt, -0.25)),
  )
}
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16)
  let r = n >> 16,
    g = (n >> 8) & 255,
    b = n & 255
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (k < 0 ? v * k : (255 - v) * k))))
  return '#' + [f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, '0')).join('')
}

// ---- LOCALES (fachadas) -----------------------------------------------------
// type: cafe | barberia | verduleria | peluqueria | panaderia | kiosco | manicura | pizzeria
function shop({ type = 'cafe', name = null, lit = true } = {}) {
  const T = {
    cafe: { wall: '#6b4a3a', aw1: C.paper, aw2: C.brown2, sign: 'CAFÉ', icon: 'cup' },
    barberia: { wall: '#2d3a5c', aw1: C.red, aw2: '#fff', sign: 'BARBERÍA', icon: 'pole' },
    verduleria: { wall: '#3d6b3a', aw1: C.green2, aw2: '#fff', sign: 'VERDULERÍA', icon: 'fruit' },
    peluqueria: { wall: '#7a3d6b', aw1: C.pink, aw2: '#fff', sign: 'PELUQUERÍA', icon: 'scissors' },
    panaderia: { wall: '#a0622d', aw1: C.yellow, aw2: '#fff', sign: 'PANADERÍA', icon: 'bread' },
    kiosco: { wall: '#2a5c6b', aw1: C.blue2, aw2: '#fff', sign: 'KIOSCO', icon: 'candy' },
    manicura: { wall: '#5c2d6b', aw1: C.purple, aw2: C.pink, sign: 'NAILS', icon: 'polish' },
    pizzeria: { wall: '#8a2d1f', aw1: C.red, aw2: C.yellow, sign: 'PIZZERÍA', icon: 'pizza' },
  }[type]
  const g = uid('s'),
    w = uid('w')
  const stripes = Array.from(
    { length: 8 },
    (_, i) =>
      `<path d="M${20 + i * 45} 150 h45 v40 q-22 26 -45 0z" fill="${i % 2 ? T.aw2 : T.aw1}"/>`,
  ).join('')
  const icons = {
    cup: `<g transform="translate(250 270)"><path d="M0 0 h50 v40 q0 22 -25 22 q-25 0 -25 -22z" fill="#fff"/><path d="M50 10 q20 0 20 16 q0 16 -20 16" stroke="#fff" stroke-width="7" fill="none"/><path d="M14 -10 q-6 -14 4 -24 M30 -10 q-6 -14 4 -24" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/></g>`,
    pole: `<g transform="translate(300 220)"><rect x="0" y="0" width="34" height="140" rx="17" fill="#fff"/>${Array.from({ length: 6 }, (_, i) => `<path d="M0 ${i * 24 + 8} l34 -14 v10 l-34 14z" fill="${i % 2 ? C.blue2 : C.red}"/>`).join('')}<circle cx="17" cy="-6" r="12" fill="${C.yellow}"/></g>`,
    fruit: `<g transform="translate(240 330)"><circle cx="0" cy="0" r="22" fill="${C.red}"/><circle cx="44" cy="4" r="20" fill="${C.orange}"/><circle cx="86" cy="0" r="22" fill="${C.green2}"/><path d="M0 -22 q4 -10 10 -12" stroke="${C.green}" stroke-width="4" fill="none"/></g>`,
    scissors: `<g transform="translate(270 270)" stroke="#fff" stroke-width="7" fill="none"><circle cx="0" cy="40" r="14"/><circle cx="40" cy="40" r="14"/><path d="M8 30 l40 -50 M32 30 l-40 -50"/></g>`,
    bread: `<g transform="translate(240 300)"><path d="M0 30 q0 -40 50 -40 q50 0 50 40z" fill="${C.yellow}"/><path d="M25 0 l10 20 M50 -6 l6 22 M75 0 l-6 20" stroke="${C.brown2}" stroke-width="5"/></g>`,
    candy: `<g transform="translate(260 290)"><circle cx="20" cy="20" r="22" fill="${C.pink}"/><path d="M-14 10 l12 10 l-12 10z M54 10 l-12 10 l12 10z" fill="${C.pink}"/><rect x="60" y="-10" width="16" height="60" rx="8" fill="${C.yellow}"/></g>`,
    polish: `<g transform="translate(280 260)"><rect x="8" y="0" width="24" height="40" rx="4" fill="${C.ink}"/><rect x="0" y="38" width="40" height="60" rx="12" fill="${C.pink}"/></g>`,
    pizza: `<g transform="translate(250 270)"><path d="M0 0 l90 0 l-45 80z" fill="${C.yellow}"/><circle cx="30" cy="16" r="9" fill="${C.red}"/><circle cx="58" cy="20" r="9" fill="${C.red}"/><circle cx="45" cy="44" r="8" fill="${C.red}"/></g>`,
  }
  return svg(
    400,
    520,
    `
    <rect x="10" y="40" width="380" height="480" rx="10" fill="url(#${g})"/>
    <rect x="10" y="40" width="380" height="20" fill="#000" opacity=".2"/>
    <rect x="40" y="70" width="320" height="64" rx="12" fill="${C.ink}"/>
    <text x="200" y="115" text-anchor="middle" font-family="Archivo" font-weight="800" font-stretch="125%" font-size="${(name || T.sign).length > 10 ? 26 : 34}" fill="#fff" letter-spacing="2">${name || T.sign}</text>
    ${stripes}
    <rect x="40" y="220" width="190" height="200" rx="10" fill="url(#${w})"/>
    <rect x="40" y="220" width="190" height="200" rx="10" fill="none" stroke="${C.ink}" stroke-width="10"/>
    ${shine(52, 232, 60, 170, 8)}
    ${icons[T.icon]}
    <rect x="250" y="380" width="110" height="140" rx="8" fill="${C.ink}"/><rect x="262" y="392" width="86" height="118" rx="6" fill="${lit ? '#ffe7a8' : '#3a3f4b'}" opacity="${lit ? 0.85 : 1}"/>
    <circle cx="336" cy="455" r="6" fill="${C.yellow}"/>
    <rect x="0" y="510" width="400" height="14" fill="#000" opacity=".35"/>`,
    grad(g, T.wall, shade(T.wall, -0.35)) +
      grad(w, lit ? '#ffe7a8' : '#4a5160', lit ? '#ffb85c' : '#2a2f3a'),
  )
}

// ---- CELULAR con pantallas --------------------------------------------------
// screen: card | whatsapp | booking | notif | stats | qr | blank | chat
function phone({
  screen = 'card',
  title = 'Café del Barrio',
  stamps = 7,
  total = 10,
  msg = '¡Hola Ana! Te extrañamos ☕',
  notif = 'Ana dejó de venir',
  w = 300,
} = {}) {
  const g = uid('ph')
  const S = {
    card: `<rect x="34" y="120" width="232" height="150" rx="22" fill="${C.blue}"/><text x="54" y="156" font-family="Archivo" font-size="16" fill="#fff" opacity=".8">${title}</text>
      <text x="54" y="210" font-family="Archivo" font-weight="800" font-stretch="125%" font-size="46" fill="#fff">${stamps}/${total}</text><text x="54" y="240" font-family="Archivo" font-size="15" fill="#fff" opacity=".85">sellos · te faltan ${total - stamps}</text>
      ${Array.from({ length: total }, (_, i) => `<circle cx="${62 + (i % 5) * 44}" cy="${320 + Math.floor(i / 5) * 48}" r="17" fill="${i < stamps ? C.yellow : 'none'}" stroke="${i < stamps ? C.yellow : '#c5cad3'}" stroke-width="4"/>`).join('')}
      <rect x="34" y="420" width="232" height="56" rx="28" fill="${C.ink}"/><text x="150" y="455" text-anchor="middle" font-family="Archivo" font-weight="700" font-size="18" fill="#fff">Mostrar mi QR</text>`,
    whatsapp: `<rect x="20" y="70" width="260" height="60" fill="#075e54"/><circle cx="52" cy="100" r="18" fill="#cfd8dc"/><text x="80" y="107" font-family="Archivo" font-weight="700" font-size="18" fill="#fff">${title}</text>
      <rect x="20" y="130" width="260" height="400" fill="#e5ddd5"/>
      <rect x="70" y="170" width="190" height="${msg.length > 30 ? 96 : 66}" rx="14" fill="#dcf8c6"/><foreignObject x="80" y="178" width="172" height="90"><div xmlns="http://www.w3.org/1999/xhtml" style="font:16px Archivo;color:#111;line-height:1.3">${msg}</div></foreignObject>
      <text x="246" y="${msg.length > 30 ? 258 : 228}" text-anchor="end" font-family="Archivo" font-size="11" fill="#34b7f1">✓✓</text>`,
    booking: `<text x="34" y="130" font-family="Archivo" font-weight="800" font-size="22" fill="${C.ink}">${title}</text><text x="34" y="156" font-family="Archivo" font-size="15" fill="${C.gray}">Elegí un horario</text>
      ${['10:00', '10:30', '11:00', '15:00', '15:30', '16:00', '17:00', '17:30', '18:00'].map((h, i) => `<rect x="${34 + (i % 3) * 78}" y="${180 + Math.floor(i / 3) * 62}" width="68" height="48" rx="12" fill="${i === 4 ? C.blue : '#fff'}" stroke="${C.blue}" stroke-width="2"/><text x="${68 + (i % 3) * 78}" y="${210 + Math.floor(i / 3) * 62}" text-anchor="middle" font-family="Archivo" font-weight="700" font-size="16" fill="${i === 4 ? '#fff' : C.blue}">${h}</text>`).join('')}
      <rect x="34" y="420" width="232" height="56" rx="28" fill="${C.blue}"/><text x="150" y="455" text-anchor="middle" font-family="Archivo" font-weight="700" font-size="18" fill="#fff">Reservar</text>`,
    notif: `<rect x="20" y="70" width="260" height="460" fill="url(#${g}b)"/><text x="150" y="170" text-anchor="middle" font-family="Archivo" font-weight="300" font-size="64" fill="#fff">21:30</text>
      <rect x="34" y="230" width="232" height="96" rx="20" fill="#fff" opacity=".92"/><rect x="48" y="246" width="30" height="30" rx="8" fill="${C.blue}"/><text x="88" y="268" font-family="Archivo" font-weight="700" font-size="15" fill="${C.ink}">NERIVA</text>
      <foreignObject x="48" y="282" width="210" height="40"><div xmlns="http://www.w3.org/1999/xhtml" style="font:15px Archivo;color:#222">${notif}</div></foreignObject>`,
    stats: `<text x="34" y="130" font-family="Archivo" font-weight="800" font-size="22" fill="${C.ink}">Este mes</text>
      ${[60, 90, 75, 130, 110, 170, 200].map((h, i) => `<rect x="${40 + i * 32}" y="${400 - h}" width="22" height="${h}" rx="6" fill="${i === 6 ? C.blue : C.blue3}"/>`).join('')}
      <text x="34" y="450" font-family="Archivo" font-weight="800" font-stretch="125%" font-size="34" fill="${C.green}">+38%</text><text x="150" y="450" font-family="Archivo" font-size="15" fill="${C.gray}">clientes que vuelven</text>`,
    qr: `<rect x="60" y="150" width="180" height="180" rx="12" fill="#fff" stroke="${C.ink}" stroke-width="4"/>${qrcells(70, 160, 160)}<text x="150" y="380" text-anchor="middle" font-family="Archivo" font-weight="700" font-size="18" fill="${C.ink}">Escaneá y sumá</text>`,
    chat: `<rect x="20" y="130" width="260" height="400" fill="#e5ddd5"/><rect x="30" y="160" width="180" height="56" rx="14" fill="#fff"/><text x="44" y="194" font-family="Archivo" font-size="15" fill="#111">¿tenés turno a las 5?</text><rect x="30" y="230" width="150" height="56" rx="14" fill="#fff"/><text x="44" y="264" font-family="Archivo" font-size="15" fill="#111">holaa hay lugar?</text>`,
    blank: '',
  }
  const s = w / 300
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 600" width="${w}" height="${600 * s}" overflow="visible"><defs>${grad(g + 'b', C.purple, C.blue)}</defs>
    <rect x="6" y="10" width="288" height="580" rx="46" fill="#000" opacity=".3"/>
    <rect x="0" y="0" width="300" height="580" rx="46" fill="${C.ink}"/>
    <rect x="16" y="16" width="268" height="548" rx="34" fill="${C.paper}"/>
    <rect x="110" y="28" width="80" height="22" rx="11" fill="${C.ink}"/>
    ${S[screen]}
    <rect x="16" y="16" width="268" height="548" rx="34" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/></svg>`
}
function qrcells(x, y, size) {
  let o = ''
  const n = 13,
    c = size / n
  let seed = 7
  const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const f = (i < 4 && j < 4) || (i < 4 && j > 8) || (i > 8 && j < 4)
      const on = f
        ? i % 4 === 0 ||
          i % 4 === 3 ||
          j % 4 === 0 ||
          j % 4 === 3 ||
          i % 4 === 1.5 ||
          ((i % 4 === 1 || i % 4 === 2) && (j % 4 === 1 || j % 4 === 2) && false)
        : r() > 0.5
      if (f) {
        const ii = i % 9 === i ? i : i - 9,
          jj = j > 8 ? j - 9 : j
        const ring =
          ii === 0 ||
          ii === 3 ||
          jj === 0 ||
          jj === 3 ||
          (ii >= 1 && ii <= 2 && jj >= 1 && jj <= 2 && false)
        const core = ii >= 1 && ii <= 2 && jj >= 1 && jj <= 2
        if (ring || core)
          o += `<rect x="${x + j * c}" y="${y + i * c}" width="${c}" height="${c}" fill="${C.ink}"/>`
      } else if (on)
        o += `<rect x="${x + j * c}" y="${y + i * c}" width="${c}" height="${c}" fill="${C.ink}"/>`
    }
  return o
}

// ---- OBJETOS ----------------------------------------------------------------
const P = {
  card: ({
    stamps = 6,
    total = 10,
    color = C.blue,
    label = 'TARJETA DE SELLOS',
    paper = false,
  } = {}) => {
    const g = uid('c')
    return svg(
      420,
      260,
      `
    <rect x="8" y="12" width="410" height="246" rx="26" fill="#000" opacity=".25"/>
    <rect x="0" y="0" width="410" height="246" rx="26" fill="${paper ? '#f4ecd8' : `url(#${g})`}"/>${paper ? '' : shine(14, 12, 180, 22, 11)}
    <text x="30" y="52" font-family="Archivo" font-weight="800" font-stretch="125%" font-size="22" fill="${paper ? C.brown : '#fff'}" letter-spacing="2">${label}</text>
    ${Array.from({ length: total }, (_, i) => `<circle cx="${50 + (i % 5) * 78}" cy="${112 + Math.floor(i / 5) * 76}" r="27" fill="${i < stamps ? (paper ? C.brown2 : C.yellow) : 'none'}" stroke="${paper ? C.brown2 : 'rgba(255,255,255,.7)'}" stroke-width="4" stroke-dasharray="${i < stamps ? 0 : '6 6'}"/>${i < stamps && !paper ? `<path d="M${38 + (i % 5) * 78} ${112 + Math.floor(i / 5) * 76} l9 9 l16 -18" stroke="${C.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}`).join('')}`,
      grad(g, color, shade(color, -0.3)),
    )
  },
  cup: ({ color = '#fff', sleeve = C.brown2, steam = true } = {}) =>
    svg(
      220,
      280,
      `
    ${steam ? '<path d="M80 40 q-14 -20 0 -40 M110 46 q-14 -20 0 -40 M140 40 q-14 -20 0 -40" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".6"/>' : ''}
    <path d="M40 70 h140 l-16 190 q-2 16 -18 16 h-72 q-16 0 -18 -16z" fill="${color}"/><rect x="30" y="56" width="160" height="26" rx="10" fill="${C.ink}"/>
    <path d="M48 140 h124 l-6 70 h-112z" fill="${sleeve}"/>${shine(56, 90, 18, 160, 9)}`,
    ),
  croissant: () =>
    svg(
      260,
      160,
      `<path d="M20 120 q20 -100 110 -100 q90 0 110 100 q-30 -20 -50 -10 q-20 -40 -60 -40 q-40 0 -60 40 q-20 -10 -50 10z" fill="${C.yellow}"/><path d="M90 50 l14 50 M130 36 v60 M170 50 l-14 50" stroke="${C.orange}" stroke-width="8" stroke-linecap="round"/>`,
    ),
  scissors: () =>
    svg(
      220,
      220,
      `<g stroke="${C.gray}" stroke-width="14" fill="none" stroke-linecap="round"><circle cx="50" cy="170" r="30"/><circle cx="130" cy="190" r="30"/><path d="M70 146 l120 -130 M112 166 l-60 -150"/></g>`,
    ),
  comb: () =>
    svg(
      240,
      100,
      `<rect x="0" y="0" width="240" height="40" rx="12" fill="${C.ink}"/>${Array.from({ length: 16 }, (_, i) => `<rect x="${10 + i * 14}" y="36" width="7" height="56" rx="3" fill="${C.ink}"/>`).join('')}`,
    ),
  polish: ({ color = C.pink } = {}) =>
    svg(
      140,
      240,
      `<rect x="40" y="0" width="60" height="90" rx="10" fill="${C.ink}"/><rect x="10" y="84" width="120" height="150" rx="34" fill="${color}"/>${shine(26, 100, 22, 110, 11)}`,
    ),
  calendar: ({ day = '24', month = 'OCT' } = {}) =>
    svg(
      260,
      260,
      `<rect x="10" y="30" width="240" height="220" rx="30" fill="#fff"/><path d="M10 60 q0 -30 30 -30 h180 q30 0 30 30 v40 h-240z" fill="${C.red}"/>
    <text x="130" y="88" text-anchor="middle" font-family="Archivo" font-weight="800" font-size="30" fill="#fff" letter-spacing="3">${month}</text><text x="130" y="206" text-anchor="middle" font-family="Archivo" font-weight="800" font-stretch="125%" font-size="${String(day).length > 2 ? 64 : 100}" fill="${C.ink}">${day}</text>
    <rect x="62" y="10" width="20" height="44" rx="10" fill="${C.ink}"/><rect x="178" y="10" width="20" height="44" rx="10" fill="${C.ink}"/>`,
    ),
  bubble: ({ text = 'hola!', mine = false, w = 520 } = {}) => {
    const h = Math.ceil(text.length / 24) * 46 + 50
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h + 20}" width="${w}" height="${h + 20}" overflow="visible">
    <path d="${mine ? `M0 20 q0 -20 20 -20 h${w - 40} q20 0 20 20 v${h - 20} l14 18 h-${w - 20} q-20 0 -20 -20z` : `M20 0 h${w - 40} q20 0 20 20 v${h - 20} q0 20 -20 20 h-${w - 34} l-34 18 l14 -38 v-${h - 40} q0 -20 20 -20z`}" fill="${mine ? '#dcf8c6' : '#fff'}"/>
    <foreignObject x="26" y="16" width="${w - 52}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font:500 36px Archivo;color:#111;line-height:1.28">${text}</div></foreignObject></svg>`
  },
  notif: ({
    title = 'Nueva reserva',
    text = 'Fran · lunes 17:00',
    icon = '📅',
    w = 820,
  } = {}) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 170" width="${w}" height="170" overflow="visible">
    <rect x="0" y="6" width="${w}" height="164" rx="40" fill="#000" opacity=".25"/><rect x="0" y="0" width="${w}" height="160" rx="40" fill="#fff"/>
    <rect x="28" y="30" width="100" height="100" rx="26" fill="${C.blue}"/><text x="78" y="100" text-anchor="middle" font-size="52">${icon}</text>
    <text x="156" y="72" font-family="Archivo" font-weight="800" font-size="38" fill="${C.ink}">${title}</text><text x="156" y="118" font-family="Archivo" font-size="32" fill="#4a4e57">${text}</text></svg>`,
  coin: ({ label = '$' } = {}) =>
    svg(
      160,
      160,
      `<circle cx="80" cy="84" r="74" fill="#c99a12"/><circle cx="80" cy="76" r="74" fill="${C.yellow}"/><circle cx="80" cy="76" r="56" fill="none" stroke="#c99a12" stroke-width="6"/><text x="80" y="102" text-anchor="middle" font-family="Archivo" font-weight="900" font-size="72" fill="#a37c0a">${label}</text>`,
    ),
  bill: ({ amount = '1000' } = {}) =>
    svg(
      300,
      150,
      `<rect x="0" y="0" width="300" height="150" rx="14" fill="#7cc576"/><rect x="12" y="12" width="276" height="126" rx="10" fill="none" stroke="#3f8a3a" stroke-width="4"/><circle cx="150" cy="75" r="38" fill="#a7dca2"/><text x="150" y="90" text-anchor="middle" font-family="Archivo" font-weight="900" font-size="38" fill="#2c6b28">$</text><text x="40" y="54" font-family="Archivo" font-weight="800" font-size="26" fill="#2c6b28">${amount}</text>`,
    ),
  chart: ({ up = true } = {}) =>
    svg(
      360,
      260,
      `<rect x="0" y="0" width="360" height="260" rx="30" fill="#fff"/>${[50, 80, 70, 120, 110, 170].map((h, i) => `<rect x="${36 + i * 50}" y="${220 - (up ? h : 200 - h)}" width="30" height="${up ? h : 200 - h}" rx="8" fill="${i === 5 ? (up ? C.green2 : C.red) : C.blue3}"/>`).join('')}
    <path d="${up ? 'M40 170 L120 140 L190 150 L250 90 L320 50' : 'M40 60 L120 90 L190 80 L250 140 L320 190'}" stroke="${up ? C.green : C.red}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="320" cy="${up ? 50 : 190}" r="12" fill="${up ? C.green : C.red}"/>`,
    ),
  heart: ({ color = C.red } = {}) =>
    svg(
      200,
      180,
      `<path d="M100 170 C 20 110 0 70 0 45 C 0 18 22 0 48 0 C 70 0 88 12 100 30 C 112 12 130 0 152 0 C 178 0 200 18 200 45 C 200 70 180 110 100 170Z" fill="${color}"/>${shine(26, 22, 50, 24, 12)}`,
    ),
  star: ({ color = C.yellow } = {}) =>
    svg(
      200,
      200,
      `<path d="M100 8 L124 70 L190 74 L138 116 L156 182 L100 146 L44 182 L62 116 L10 74 L76 70Z" fill="${color}" stroke="#c99a12" stroke-width="5" stroke-linejoin="round"/>`,
    ),
  gift: ({ color = C.red, ribbon = C.yellow } = {}) =>
    svg(
      220,
      230,
      `<rect x="20" y="90" width="180" height="130" rx="14" fill="${color}"/><rect x="10" y="60" width="200" height="44" rx="12" fill="${shade(color, -0.15)}"/><rect x="96" y="60" width="28" height="160" fill="${ribbon}"/>
    <path d="M110 60 q-50 -60 -70 -20 q-10 30 70 20 q80 10 70 -20 q-20 -40 -70 20z" fill="none" stroke="${ribbon}" stroke-width="12"/>`,
    ),
  cake: () =>
    svg(
      240,
      240,
      `<rect x="30" y="120" width="180" height="100" rx="16" fill="${C.pink}"/><path d="M30 140 q30 20 45 0 q15 20 45 0 q15 20 45 0 q15 20 45 0 v-20 h-180z" fill="#fff"/><rect x="20" y="214" width="200" height="16" rx="8" fill="#fff" opacity=".7"/>
    ${[80, 120, 160].map((x) => `<rect x="${x - 6}" y="76" width="12" height="46" rx="5" fill="${C.blue3}"/><path d="M${x} 52 q12 14 0 26 q-12 -12 0 -26z" fill="${C.orange}"/>`).join('')}`,
    ),
  clock: ({ h = 10, m = 10 } = {}) =>
    svg(
      220,
      220,
      `<circle cx="110" cy="110" r="100" fill="#fff" stroke="${C.ink}" stroke-width="12"/>${Array.from({ length: 12 }, (_, i) => `<rect x="106" y="22" width="8" height="18" rx="4" fill="${C.ink}" transform="rotate(${i * 30} 110 110)"/>`).join('')}
    <rect x="104" y="58" width="12" height="56" rx="6" fill="${C.ink}" transform="rotate(${h * 30 + m / 2} 110 110)"/><rect x="106" y="34" width="8" height="80" rx="4" fill="${C.red}" transform="rotate(${m * 6} 110 110)"/><circle cx="110" cy="110" r="10" fill="${C.ink}"/>`,
    ),
  bell: () =>
    svg(
      200,
      220,
      `<path d="M100 20 q-70 0 -70 90 v40 l-20 30 h180 l-20 -30 v-40 q0 -90 -70 -90z" fill="${C.yellow}"/><circle cx="100" cy="200" r="20" fill="${C.orange}"/><circle cx="100" cy="16" r="12" fill="${C.orange}"/>${shine(50, 50, 20, 80, 10)}`,
    ),
  register: () =>
    svg(
      340,
      300,
      `<rect x="20" y="120" width="300" height="170" rx="22" fill="${C.ink2}"/><rect x="50" y="20" width="240" height="110" rx="16" fill="${C.ink}"/><rect x="66" y="36" width="208" height="62" rx="8" fill="${C.green2}"/>
    <text x="260" y="80" text-anchor="end" font-family="Archivo" font-weight="800" font-size="36" fill="${C.ink}">$ 8.000</text>${Array.from({ length: 9 }, (_, i) => `<rect x="${60 + (i % 3) * 56}" y="${150 + Math.floor(i / 3) * 40}" width="44" height="30" rx="8" fill="#3a3f4b"/>`).join('')}<rect x="250" y="150" width="50" height="110" rx="10" fill="${C.red}"/>`,
    ),
  bag: ({ color = C.blue2 } = {}) =>
    svg(
      220,
      260,
      `<path d="M70 70 q0 -60 40 -60 q40 0 40 60" stroke="${C.ink}" stroke-width="12" fill="none"/><path d="M20 70 h180 l-14 180 h-152z" fill="${color}"/>${shine(36, 84, 20, 140, 10)}<circle cx="110" cy="150" r="30" fill="#fff" opacity=".9"/><text x="110" y="162" text-anchor="middle" font-family="Archivo" font-weight="900" font-size="34" fill="${color}">N</text>`,
    ),
  receipt: ({ lines = 5 } = {}) =>
    svg(
      200,
      300,
      `<path d="M10 0 h180 v280 l-15 -12 l-15 12 l-15 -12 l-15 12 l-15 -12 l-15 12 l-15 -12 l-15 12 l-15 -12 l-15 12 l-15 -12 l-15 12z" fill="#fff"/>${Array.from({ length: lines }, (_, i) => `<rect x="30" y="${40 + i * 36}" width="${i === lines - 1 ? 140 : 90 + ((i * 23) % 50)}" height="12" rx="6" fill="#c5cad3"/>`).join('')}`,
    ),
  magnifier: () =>
    svg(
      220,
      220,
      `<circle cx="90" cy="90" r="62" fill="${C.blue3}" fill-opacity=".35" stroke="${C.ink}" stroke-width="18"/><path d="M136 136 l60 60" stroke="${C.ink}" stroke-width="26" stroke-linecap="round"/>${shine(56, 56, 26, 26, 13)}`,
    ),
  bulb: () =>
    svg(
      200,
      260,
      `<circle cx="100" cy="100" r="80" fill="${C.yellow}"/><path d="M60 160 h80 v40 h-80z" fill="${C.yellow}"/><rect x="62" y="200" width="76" height="22" rx="8" fill="${C.gray}"/><rect x="72" y="226" width="56" height="18" rx="8" fill="${C.gray}"/>${shine(50, 50, 30, 50, 15)}<path d="M80 150 v-40 l20 20 l20 -20 v40" stroke="${C.orange}" stroke-width="6" fill="none"/>`,
    ),
  check: ({ color = C.green2 } = {}) =>
    svg(
      200,
      200,
      `<circle cx="100" cy="100" r="92" fill="${color}"/><path d="M56 104 l30 30 l60 -64" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
    ),
  cross: ({ color = C.red } = {}) =>
    svg(
      200,
      200,
      `<circle cx="100" cy="100" r="92" fill="${color}"/><path d="M64 64 l72 72 M136 64 l-72 72" stroke="#fff" stroke-width="22" stroke-linecap="round"/>`,
    ),
  arrow: ({ color = '#fff', dir = 0 } = {}) =>
    svg(
      200,
      120,
      `<g transform="rotate(${dir} 100 60)"><path d="M10 60 h150 M120 20 l40 40 l-40 40" stroke="${color}" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    ),
  pin: ({ color = C.red } = {}) =>
    svg(
      160,
      220,
      `<path d="M80 210 q-74 -90 -74 -130 a74 74 0 0 1 148 0 q0 40 -74 130z" fill="${color}"/><circle cx="80" cy="80" r="30" fill="#fff"/>`,
    ),
  sparkle: ({ color = C.yellow } = {}) =>
    svg(
      120,
      120,
      `<path d="M60 0 q8 52 60 60 q-52 8 -60 60 q-8 -52 -60 -60 q52 -8 60 -60z" fill="${color}"/>`,
    ),
  qr: () =>
    svg(
      240,
      240,
      `<rect x="0" y="0" width="240" height="240" rx="24" fill="#fff"/>${qrcells(20, 20, 200)}`,
    ),
  ghost: () =>
    svg(
      320,
      300,
      `<path d="M160 10 C85 10 55 75 55 135 L55 235 Q75 220 92 235 Q110 250 127 235 Q145 220 160 235 Q177 250 195 235 Q212 220 230 235 Q247 250 265 235 L265 135 C265 75 235 10 160 10Z" fill="${C.paper}"/>${face(160, 120, 1, 'surprised')}`,
    ),
  paperTorn: () =>
    svg(
      420,
      260,
      `<path d="M0 26 q0 -26 26 -26 h170 l20 40 l-24 40 l30 50 l-20 50 l24 54 v26 h-200 q-26 0 -26 -26z" fill="#f4ecd8"/><path d="M230 0 h164 q26 0 26 26 v208 q0 26 -26 26 h-150 l-20 -40 l26 -50 l-30 -50 l24 -40 l-20 -40z" fill="#e9dcc0" transform="rotate(8 320 130) translate(30 10)"/>`,
    ),
}

// ---- FONDOS -----------------------------------------------------------------
const BG = {
  grid: (c1 = '#1a1d3a', c2 = '#0f1124') =>
    `background:radial-gradient(ellipse at 50% 40%,${c1} 0%,${c2} 70%);`,
  gridLines: () =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" style="position:absolute;inset:0;opacity:.18"><defs><pattern id="gl" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="#9DB4FF" stroke-width="1.2"/></pattern></defs><rect width="1080" height="1920" fill="url(#gl)"/></svg>`,
  particles: (n = 40, seed = 3) => {
    let s = seed
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280
    return Array.from(
      { length: n },
      () =>
        `<i style="position:absolute;left:${r() * 1080}px;top:${r() * 1920}px;width:${2 + r() * 5}px;height:${2 + r() * 5}px;border-radius:50%;background:#fff;opacity:${0.15 + r() * 0.45}" data-tw="${r() * 6}"></i>`,
    ).join('')
  },
  street: () =>
    `<div style="position:absolute;left:0;right:0;bottom:0;height:300px;background:linear-gradient(#3a3f4b,#23262e)"></div><div style="position:absolute;left:0;right:0;bottom:290px;height:20px;background:#55607a"></div>`,
  spot: (x = 540, y = 900, c = '#4A74F2') =>
    `<div style="position:absolute;left:${x - 500}px;top:${y - 500}px;width:1000px;height:1000px;border-radius:50%;background:radial-gradient(circle,${c}55 0%,transparent 65%)"></div>`,
}

// catálogo para la hoja de muestra
const CATALOG = {
  'Mascota Puntito': [
    ['feliz', mascot({ expr: 'happy' })],
    ['saluda', mascot({ expr: 'wink', arms: 'wave' })],
    ['sorpresa', mascot({ expr: 'shock', arms: 'up', stamps: 1 })],
    ['triste', mascot({ expr: 'sad', stamps: 0 })],
    ['enamorado', mascot({ expr: 'love', stamps: 5, arms: 'up' })],
    ['señala', mascot({ expr: 'smile', arms: 'point' })],
  ],
  Personas: [
    ['dueño café', person({ role: 'owner', apron: C.brown2, shirt: C.paper, expr: 'happy' })],
    [
      'barbero',
      person({ role: 'barber', shirt: C.ink2, hairStyle: 'cap', expr: 'smile', skin: C.skin2 }),
    ],
    [
      'clienta',
      person({ shirt: C.pink, hairStyle: 'long', hair: C.brown, expr: 'love', pose: 'phone' }),
    ],
    [
      'cliente',
      person({ shirt: C.green2, hairStyle: 'curly', skin: C.skin3, expr: 'wink', pose: 'wave' }),
    ],
    [
      'manicura',
      person({ shirt: C.purple, hairStyle: 'bun', hair: C.ink, expr: 'surprised', pose: 'point' }),
    ],
    ['abuela', person({ shirt: C.orange, hairStyle: 'gray', expr: 'smile', pose: 'cheer' })],
    ['preocupado', person({ shirt: C.blue2, expr: 'worried' })],
    ['enojado', person({ shirt: C.red, hairStyle: 'bald', expr: 'angry', skin: C.skin2 })],
  ],
  Locales: [
    'cafe',
    'barberia',
    'verduleria',
    'peluqueria',
    'panaderia',
    'kiosco',
    'manicura',
    'pizzeria',
  ].map((t) => [t, shop({ type: t })]),
  Celulares: [
    ['tarjeta', phone({ screen: 'card' })],
    ['whatsapp', phone({ screen: 'whatsapp', title: 'Ana' })],
    ['reservas', phone({ screen: 'booking', title: 'Barbería Sol' })],
    ['aviso', phone({ screen: 'notif' })],
    ['estadísticas', phone({ screen: 'stats' })],
    ['QR', phone({ screen: 'qr' })],
    ['chat caos', phone({ screen: 'chat', title: 'Clientes' })],
  ],
  Objetos: [
    ['tarjeta', P.card()],
    ['tarjeta cartón', P.card({ paper: true, stamps: 4, label: 'CAFÉ DON JOSÉ' })],
    ['café', P.cup()],
    ['medialuna', P.croissant()],
    ['tijera', P.scissors()],
    ['peine', P.comb()],
    ['esmalte', P.polish()],
    ['calendario', P.calendar()],
    ['burbuja', P.bubble({ text: '¿tenés turno a las 5?' })],
    ['aviso', P.notif()],
    ['moneda', P.coin()],
    ['billete', P.bill()],
    ['sube', P.chart()],
    ['baja', P.chart({ up: false })],
    ['corazón', P.heart()],
    ['estrella', P.star()],
    ['regalo', P.gift()],
    ['torta', P.cake()],
    ['reloj', P.clock()],
    ['campana', P.bell()],
    ['caja', P.register()],
    ['bolsa', P.bag()],
    ['ticket', P.receipt()],
    ['lupa', P.magnifier()],
    ['idea', P.bulb()],
    ['ok', P.check()],
    ['no', P.cross()],
    ['flecha', P.arrow()],
    ['ubicación', P.pin()],
    ['brillo', P.sparkle()],
    ['QR', P.qr()],
    ['fantasma', P.ghost()],
    ['papel roto', P.paperTorn()],
  ],
}
if (typeof module !== 'undefined')
  module.exports = { C, mascot, person, shop, phone, P, BG, CATALOG, face, shade }
