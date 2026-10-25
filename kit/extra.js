// Dibujos extra para los reels "absurdos" de Neriva Carta (mismo estilo del kit).
const TXT = (x, y, s, size, color = C.ink, w = 700, anchor = 'start') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Archivo" font-weight="${w}" font-size="${size}" fill="${color}">${s}</text>`

// agrega algo arriba de un svg del kit (antes de </svg>)
const over = (s, extra) => s.replace(/<\/svg>\s*$/, extra + '</svg>')

const X = {
  // pirata: persona del kit + sombrero + parche + barba
  pirate: ({ expr = 'smile', pose = 'idle', shirt = C.red } = {}) =>
    over(
      person({ expr, pose, shirt, skin: C.skin2, hairStyle: 'bald' }),
      `<path d="M120 182 q60 70 120 0 q-10 50 -60 52 q-50 -2 -60 -52z" fill="${C.brown}"/>
       <path d="M86 92 q94 -40 188 0 q-20 -70 -94 -74 q-74 4 -94 74z" fill="${C.ink}"/>
       <path d="M70 96 q110 -40 220 0 q-110 -10 -220 0z" fill="${C.ink}" stroke="${C.ink}" stroke-width="16" stroke-linejoin="round"/>
       <path d="M100 80 q80 -24 160 0" stroke="${C.yellow}" stroke-width="7" fill="none"/>
       <circle cx="180" cy="52" r="15" fill="#fff"/><path d="M172 62 l-6 8 M188 62 l6 8" stroke="#fff" stroke-width="5"/>
       <path d="M104 120 L250 170" stroke="${C.ink}" stroke-width="6"/>
       <ellipse cx="158" cy="146" rx="20" ry="17" fill="${C.ink}"/>`,
    ),
  map: () =>
    svg(
      520,
      380,
      `<rect x="10" y="16" width="510" height="364" rx="18" fill="#000" opacity=".25"/>
       <path d="M0 20 q130 -24 260 0 q130 24 260 0 v330 q-130 24 -260 0 q-130 -24 -260 0z" fill="#f4ecd8"/>
       <path d="M60 300 q60 -120 160 -60 q100 60 140 -60 q20 -60 70 -70" stroke="${C.brown2}" stroke-width="8" stroke-dasharray="4 22" stroke-linecap="round" fill="none"/>
       <path d="M60 110 q40 -50 90 -10 q30 30 -20 50 q-60 10 -70 -40z" fill="${C.green2}" opacity=".5"/>
       <path d="M410 70 l60 60 M470 70 l-60 60" stroke="${C.red}" stroke-width="18" stroke-linecap="round"/>
       <circle cx="60" cy="300" r="14" fill="${C.brown}"/>`,
    ),
  island: () =>
    svg(
      1080,
      560,
      `<path d="M0 420 q270 -40 540 0 q270 40 540 0 v140 h-1080z" fill="#2a6fd6" opacity=".55"/>
       <path d="M120 430 q420 -260 840 0z" fill="#f2c879"/><path d="M120 430 q420 -200 840 0" fill="#e5b45f" opacity=".5"/>
       <path d="M640 330 q-10 -140 40 -260" stroke="${C.brown}" stroke-width="30" fill="none" stroke-linecap="round"/>
       <path d="M680 70 q-110 -40 -180 40 q80 -20 180 -40z M680 70 q100 -50 190 10 q-90 -10 -190 -10z M680 70 q-40 -70 -130 -70 q70 30 130 70z M680 70 q60 20 110 110 q-50 -60 -110 -110z" fill="${C.green2}" stroke="${C.green}" stroke-width="6" stroke-linejoin="round"/>
       <path d="M0 470 q270 -40 540 0 q270 40 540 0 v90 h-1080z" fill="#4A74F2" opacity=".75"/>`,
    ),
  shovel: () =>
    svg(
      200,
      460,
      `<rect x="88" y="0" width="24" height="300" rx="12" fill="${C.brown2}"/><rect x="60" y="0" width="80" height="26" rx="13" fill="${C.brown}"/>
       <path d="M40 290 h120 v80 q0 80 -60 90 q-60 -10 -60 -90z" fill="${C.gray}"/>${shine(52, 300, 30, 100, 12)}`,
    ),
  sand: () =>
    svg(
      300,
      200,
      [0, 1, 2, 3, 4, 5, 6]
        .map(
          (i) =>
            `<circle cx="${40 + i * 38}" cy="${40 + ((i * 53) % 120)}" r="${10 + (i % 3) * 7}" fill="#e5b45f"/>`,
        )
        .join(''),
    ),
  chest: ({ open = false } = {}) => {
    const g = uid('ch')
    const lid = open
      ? `<path d="M40 150 q160 -170 320 0 v-30 q-160 -150 -320 0z" fill="${C.brown}"/><path d="M50 160 l20 -150 h260 l20 150z" fill="${shade(C.brown, -0.3)}" transform="translate(0 -90) scale(1 .7)"/>`
      : `<path d="M40 170 q160 -150 320 0z" fill="url(#${g})"/><rect x="40" y="160" width="320" height="22" fill="${C.yellow}"/>`
    const glow = open
      ? `<ellipse cx="200" cy="160" rx="220" ry="160" fill="${C.yellow}" opacity=".35"/><ellipse cx="200" cy="170" rx="150" ry="40" fill="#fff4c4"/>`
      : ''
    return svg(
      400,
      380,
      `<ellipse cx="200" cy="368" rx="190" ry="14" fill="#000" opacity=".3"/>${glow}
       <rect x="40" y="170" width="320" height="190" rx="18" fill="url(#${g})"/>
       <rect x="40" y="200" width="320" height="18" fill="${C.yellow}"/><rect x="40" y="320" width="320" height="18" fill="${C.yellow}"/>
       <rect x="70" y="170" width="20" height="190" fill="${C.yellow}"/><rect x="310" y="170" width="20" height="190" fill="${C.yellow}"/>
       <rect x="172" y="226" width="56" height="66" rx="10" fill="${C.yellow}"/><circle cx="200" cy="252" r="9" fill="${C.ink}"/>
       ${lid}${shine(60, 230, 90, 20, 10)}`,
      grad(g, C.brown2, C.brown),
    )
  },
  // cartelito de mesa con QR
  qrStand: () =>
    svg(
      360,
      440,
      `<ellipse cx="180" cy="430" rx="160" ry="12" fill="#000" opacity=".3"/>
       <path d="M40 420 l40 -400 h200 l40 400z" fill="${C.ink}"/>
       <rect x="80" y="40" width="200" height="40" rx="10" fill="${C.blue}"/>${TXT(180, 70, 'MESA 4', 24, '#fff', 800, 'middle')}
       <rect x="88" y="100" width="184" height="184" rx="14" fill="#fff"/>${qrcells(100, 112, 160)}
       ${TXT(180, 330, 'Escaneá', 28, '#fff', 800, 'middle')}${TXT(180, 366, 'la carta', 28, C.yellow, 800, 'middle')}`,
    ),
  // celular con pantallas de Carta: menu | dish | order | split
  cphone: ({ screen = 'menu' } = {}) => {
    const dish = (y, name, price, col, sel) =>
      `<rect x="30" y="${y}" width="240" height="84" rx="16" fill="#fff" stroke="${sel ? C.blue : '#e2e4ea'}" stroke-width="${sel ? 4 : 2}"/>
       <circle cx="72" cy="${y + 42}" r="30" fill="${col}"/><circle cx="64" cy="${y + 34}" r="6" fill="${C.red}"/><circle cx="82" cy="${y + 48}" r="6" fill="${C.red}"/>
       ${TXT(114, y + 36, name, 17, C.ink, 800)}${TXT(114, y + 62, price, 15, C.gray, 600)}
       ${sel ? `<rect x="206" y="${y + 46}" width="54" height="26" rx="13" fill="${C.purple}"/>${TXT(233, y + 64, '3D', 15, '#fff', 800, 'middle')}` : ''}`
    const S = {
      menu: `${TXT(34, 98, 'La Cofradía', 24, C.ink, 800)}${TXT(34, 124, 'Mesa 4 · Carta', 15, C.gray, 600)}
        <rect x="30" y="140" width="76" height="32" rx="16" fill="${C.ink}"/>${TXT(68, 162, 'Pizzas', 14, '#fff', 700, 'middle')}
        <rect x="114" y="140" width="76" height="32" rx="16" fill="#e2e4ea"/>${TXT(152, 162, 'Pastas', 14, C.ink, 700, 'middle')}
        ${dish(186, 'Muzzarella', '$ 12.900', C.yellow, true)}${dish(282, 'Napolitana', '$ 14.500', C.orange, false)}${dish(378, 'Fugazzeta', '$ 13.800', '#f4ecd8', false)}
        <rect x="30" y="482" width="240" height="56" rx="28" fill="${C.blue}"/>${TXT(150, 517, 'Pedir · $ 12.900', 18, '#fff', 800, 'middle')}`,
      order: `<circle cx="150" cy="210" r="70" fill="${C.green2}"/><path d="M118 210 l22 22 l44 -46" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        ${TXT(150, 330, '¡Pedido enviado!', 24, C.ink, 800, 'middle')}${TXT(150, 362, 'Ya está en la cocina', 16, C.gray, 600, 'middle')}
        <rect x="40" y="400" width="220" height="90" rx="16" fill="#fff"/>${TXT(58, 434, '1 × Muzzarella', 16, C.ink, 700)}${TXT(58, 466, 'Mesa 4 · 21:42', 14, C.gray, 600)}`,
      split: `${TXT(34, 104, 'Cuenta · Mesa 4', 22, C.ink, 800)}${TXT(34, 150, 'Total', 16, C.gray, 600)}${TXT(266, 150, '$ 38.700', 18, C.ink, 800, 'end')}
        ${TXT(34, 186, 'Propina 10%', 16, C.gray, 600)}${TXT(266, 186, '$ 3.870', 18, C.green, 800, 'end')}
        <rect x="30" y="210" width="240" height="2" fill="#e2e4ea"/>${TXT(34, 250, 'Dividir entre', 16, C.ink, 700)}
        ${[2, 3, 4].map((n, i) => `<rect x="${34 + i * 80}" y="266" width="66" height="54" rx="14" fill="${n === 3 ? C.blue : '#fff'}" stroke="${C.blue}" stroke-width="3"/>${TXT(67 + i * 80, 302, n, 24, n === 3 ? '#fff' : C.blue, 800, 'middle')}`).join('')}
        ${TXT(150, 380, 'Cada uno paga', 16, C.gray, 600, 'middle')}${TXT(150, 430, '$ 14.190', 44, C.ink, 900, 'middle')}
        <rect x="30" y="482" width="240" height="56" rx="28" fill="${C.green}"/>${TXT(150, 517, 'Pagar', 18, '#fff', 800, 'middle')}`,
    }
    return over(phone({ screen: 'blank' }), S[screen])
  },
  // pizza "en 3D" con marco de realidad aumentada
  pizzaAR: () =>
    svg(
      560,
      520,
      `<ellipse cx="280" cy="380" rx="250" ry="60" fill="#000" opacity=".3"/>
       <ellipse cx="280" cy="340" rx="240" ry="110" fill="#c98a3a"/><ellipse cx="280" cy="320" rx="240" ry="110" fill="#e8a64a"/>
       <ellipse cx="280" cy="316" rx="210" ry="92" fill="${C.yellow}"/>
       ${[[200, 290], [300, 270], [380, 320], [240, 350], [330, 360], [170, 330]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="14" fill="${C.red}"/>`).join('')}
       ${[[260, 300], [350, 300], [210, 320]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="6" fill="${C.green}"/>`).join('')}
       <path d="M20 160 v-60 h60 M480 100 h60 v60 M540 440 v60 h-60 M80 500 h-60 v-60" stroke="${C.green2}" stroke-width="10" fill="none" stroke-linecap="round"/>
       <path d="M40 470 h480" stroke="#fff" stroke-width="4" stroke-dasharray="10 10"/><path d="M40 455 v30 M520 455 v30" stroke="#fff" stroke-width="4"/>
       <rect x="200" y="452" width="160" height="40" rx="20" fill="${C.ink}"/>${TXT(280, 480, '35 cm', 24, '#fff', 800, 'middle')}`,
    ),
  // loro mozo dormido
  parrot: () =>
    svg(
      320,
      420,
      `<ellipse cx="160" cy="410" rx="110" ry="10" fill="#000" opacity=".25"/>
       <rect x="40" y="380" width="240" height="16" rx="8" fill="${C.brown}"/>
       <path d="M110 380 q-40 -120 20 -230 q60 -60 110 0 q40 90 -10 230z" fill="${C.green2}"/>
       <path d="M180 250 q40 40 30 130 q-50 -40 -60 -110z" fill="${C.green}"/>
       <path d="M120 150 q20 -110 120 -60 q-30 -10 -50 40z" fill="${C.green2}"/>
       <path d="M232 160 q50 0 40 50 q-20 -20 -40 -16z" fill="${C.yellow}"/>
       <path d="M196 156 q12 8 24 0" stroke="${C.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>
       <path d="M110 250 h90 v26 h-90z" fill="#fff"/><path d="M140 250 l15 14 l15 -14" fill="${C.ink}"/>
       ${TXT(250, 60, 'z', 54, '#fff', 900)}${TXT(285, 20, 'Z', 40, '#fff', 900)}`,
    ),
  // ticket de comanda
  comanda: () =>
    svg(
      300,
      380,
      `<path d="M10 0 h280 v360 l-20 -14 l-20 14 l-20 -14 l-20 14 l-20 -14 l-20 14 l-20 -14 l-20 14 l-20 -14 l-20 14 l-20 -14 l-20 14 l-20 -14 l-20 14z" fill="#fff"/>
       ${TXT(150, 60, 'COMANDA', 30, C.ink, 900, 'middle')}<rect x="30" y="80" width="240" height="4" fill="${C.ink}"/>
       ${TXT(30, 140, 'Mesa 4', 30, C.ink, 800)}${TXT(30, 200, '1 × Muzza', 30, C.ink, 700)}${TXT(30, 250, 'sin aceitunas', 22, C.gray, 600)}
       <rect x="30" y="280" width="140" height="40" rx="20" fill="${C.red}"/>${TXT(100, 308, 'NUEVA', 20, '#fff', 800, 'middle')}`,
    ),
  chefHat: () =>
    svg(
      240,
      200,
      `<circle cx="70" cy="80" r="56" fill="#fff"/><circle cx="170" cy="80" r="56" fill="#fff"/><circle cx="120" cy="56" r="60" fill="#fff"/><rect x="50" y="110" width="140" height="70" rx="10" fill="#fff"/><rect x="50" y="150" width="140" height="10" fill="#e2e4ea"/>`,
    ),
  // panel del dueño (tablet): salón, caja, reservas, métricas
  panel: () => {
    const mesas = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      .map(
        (i) =>
          `<rect x="${60 + (i % 3) * 82}" y="${150 + Math.floor(i / 3) * 74}" width="64" height="56" rx="12" fill="${[C.green2, C.red, C.yellow, C.green2, '#e2e4ea', C.red, C.yellow, C.green2, '#e2e4ea'][i]}"/>${TXT(92 + (i % 3) * 82, 186 + Math.floor(i / 3) * 74, i + 1, 22, C.ink, 800, 'middle')}`,
      )
      .join('')
    return svg(
      760,
      560,
      `<rect x="10" y="14" width="750" height="546" rx="40" fill="#000" opacity=".3"/>
       <rect x="0" y="0" width="750" height="540" rx="40" fill="${C.ink}"/><rect x="22" y="22" width="706" height="496" rx="26" fill="${C.paper}"/>
       ${TXT(60, 84, 'Panel · La Cofradía', 28, C.ink, 800)}
       <g id="pSal"><rect x="40" y="110" width="290" height="380" rx="20" fill="#fff"/></g>${TXT(60, 140, 'Salón en vivo', 18, C.gray, 700)}${mesas}
       <g id="pCaja"><rect x="350" y="110" width="358" height="116" rx="20" fill="#fff"/>${TXT(372, 144, 'Caja de hoy', 18, C.gray, 700)}${TXT(372, 200, '$ 486.300', 44, C.green, 900)}</g>
       <g id="pRes"><rect x="350" y="242" width="358" height="116" rx="20" fill="#fff"/>${TXT(372, 276, 'Reservas', 18, C.gray, 700)}${TXT(372, 330, '12 hoy · 21:00 Juan (4)', 24, C.ink, 800)}</g>
       <g id="pMet"><rect x="350" y="374" width="358" height="116" rx="20" fill="#fff"/>${TXT(372, 408, 'Más pedido', 18, C.gray, 700)}
       ${[30, 50, 40, 70, 60, 86].map((h, i) => `<rect x="${560 + i * 22}" y="${470 - h}" width="14" height="${h}" rx="4" fill="${i === 5 ? C.blue : C.blue3}"/>`).join('')}${TXT(372, 460, 'Muzzarella', 26, C.ink, 800)}</g>`,
    )
  },
  // pantalla de escaneo estilo cámara
  hud: () =>
    `<div style="width:1080px;height:1920px;position:relative;font-family:monospace;color:${C.green2}">
      <div style="position:absolute;left:60px;top:200px;font-size:34px;letter-spacing:4px">● CÁMARA · PIRATA</div>
      <svg viewBox="0 0 1080 1920" style="position:absolute;inset:0"><path d="M240 600 v-90 h90 M750 510 h90 v90 M840 1220 v90 h-90 M330 1310 h-90 v-90" stroke="${C.green2}" stroke-width="12" fill="none"/>
      <rect id="scanline" x="250" y="600" width="580" height="8" fill="${C.green2}" opacity=".8"/></svg>
      <div style="position:absolute;left:0;right:0;top:1360px;text-align:center;font-size:40px;letter-spacing:4px">QR DETECTADO ✓</div></div>`,
  link: () =>
    `<div style="width:860px;padding:44px 50px;border-radius:36px;background:rgba(22,24,29,.92);border:4px solid ${C.green2};font-family:monospace">
      <div style="color:${C.green2};font-size:34px">Abriendo link…</div>
      <div style="color:#fff;font-size:50px;margin:26px 0;font-weight:700">carta.neriva.net</div>
      <div style="height:16px;border-radius:8px;background:#333"><div id="linkbar" style="height:100%;width:0;border-radius:8px;background:${C.green2}"></div></div></div>`,
}

// ---- escena del tanque -------------------------------------------------------
Object.assign(X, {
  desert: () =>
    svg(
      1080,
      1920,
      `<rect width="1080" height="1100" fill="url(#sky)"/>
       <path d="M-40 1100 l120 -480 h220 l120 480z" fill="#e3a46b"/><path d="M380 1100 l90 -360 h220 l100 360z" fill="#c4683f"/>
       <path d="M760 1100 l130 -560 h260 v560z" fill="#e3a46b"/>
       <rect y="1080" width="1080" height="840" fill="#d9874a"/>
       <ellipse cx="300" cy="1300" rx="380" ry="26" fill="#c9783e" opacity=".7"/><ellipse cx="800" cy="1560" rx="420" ry="30" fill="#c9783e" opacity=".7"/>
       ${[[150, 1460], [640, 1200], [900, 1700], [320, 1760], [980, 1360]].map(([x, y]) => `<path d="M${x} ${y} l-24 -40 M${x} ${y} l-8 -46 M${x} ${y} l8 -46 M${x} ${y} l24 -40" stroke="#4f7a3a" stroke-width="8" stroke-linecap="round"/>`).join('')}
       <ellipse cx="200" cy="300" rx="150" ry="60" fill="#fff" opacity=".85"/><ellipse cx="880" cy="200" rx="170" ry="66" fill="#fff" opacity=".85"/>`,
      grad('sky', '#6f9be0', '#b5d0f2'),
    ),
  tank: () =>
    svg(
      960,
      440,
      `<ellipse cx="470" cy="420" rx="460" ry="24" fill="#000" opacity=".22"/>
       <rect x="300" y="60" width="90" height="40" rx="6" fill="#a99c74"/><rect x="420" y="50" width="70" height="50" rx="6" fill="#a99c74"/>
       <rect x="560" y="140" width="400" height="34" rx="10" fill="#b3a67c"/>
       <path d="M260 210 l40 -110 h300 l40 110z" fill="#c9bb8f"/>
       <path d="M60 300 l90 -100 h620 l120 100z" fill="#c9bb8f"/><rect x="60" y="292" width="830" height="16" fill="#9f9370"/>
       <rect x="70" y="300" width="800" height="110" rx="55" fill="#6e6150"/>
       ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${140 + i * 110}" cy="355" r="42" fill="#8f8470"/><circle cx="${140 + i * 110}" cy="355" r="16" fill="#5a4f40"/>`).join('')}`,
    ),
  soldier: ({ pose = 'point' } = {}) =>
    over(
      person({ pose, shirt: '#56693c', skin: C.skin2, hairStyle: 'bald', expr: 'smile' }),
      `<ellipse cx="180" cy="92" rx="120" ry="22" fill="#4a5c34"/><path d="M110 90 q0 -70 70 -72 q70 2 70 72z" fill="#56693c"/><rect x="110" y="78" width="140" height="14" fill="#3d4c2b"/>`,
    ),
  drone: () =>
    svg(
      460,
      260,
      `<rect x="40" y="40" width="380" height="16" rx="8" fill="#9aa1ad"/>
       <ellipse cx="80" cy="24" rx="80" ry="10" fill="#7c8492" opacity=".8" class="rot"/><ellipse cx="380" cy="24" rx="80" ry="10" fill="#7c8492" opacity=".8"/>
       <rect x="66" y="26" width="28" height="34" rx="6" fill="#555c68"/><rect x="366" y="26" width="28" height="34" rx="6" fill="#555c68"/>
       <rect x="140" y="50" width="180" height="100" rx="22" fill="#eef0f3"/>${shine(156, 60, 70, 18, 9)}
       ${[0, 1].map((s) => [0, 1].map((r) => `<rect x="${s ? 330 : 96}" y="${70 + r * 38}" width="34" height="32" rx="10" fill="#c0503f"/>`).join('')).join('')}
       <circle cx="230" cy="168" r="30" fill="${C.ink}"/><circle cx="230" cy="168" r="12" fill="${C.blue2}"/>`,
    ),
  beam: () =>
    `<svg viewBox="0 0 600 700"><defs><linearGradient id="bm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3ccf7a" stop-opacity=".55"/><stop offset="1" stop-color="#3ccf7a" stop-opacity=".1"/></linearGradient></defs><path d="M260 0 h80 l260 700 h-600z" fill="url(#bm)"/></svg>`,
  qrwall: () => {
    let s = '',
      k = 3
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 3; c++) {
        k = (k * 37 + 11) % 13
        s += `<g transform="translate(${40 + c * 340} ${80 + r * 320}) rotate(${(k % 5) - 2} 140 140)"><rect width="290" height="290" rx="12" fill="#f4f1e8"/>${qrcells(25, 25, 240).replace(/#16181D/g, '#6b6b6b')}</g>`
      }
    return `<svg viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="#cfc6ae"/>${s}</svg>`
  },
  pizzaBox: () =>
    svg(
      300,
      200,
      `<path d="M10 70 h280 v110 h-280z" fill="#e8c48f"/><path d="M10 70 l30 -50 h220 l30 50z" fill="#f2d3a3"/>${TXT(150, 140, 'MUZZA', 34, C.red, 900, 'middle')}`,
    ),
})

// ---- Luna y dinosaurios -------------------------------------------------------
Object.assign(X, {
  moonScene: () => {
    let st = '', s = 5
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280
    for (let i = 0; i < 90; i++) st += `<circle cx="${r() * 1080}" cy="${r() * 1150}" r="${1 + r() * 3}" fill="#fff" opacity="${0.4 + r() * 0.6}"/>`
    return svg(1080, 1920, `<rect width="1080" height="1920" fill="url(#sp)"/>${st}
      <circle cx="820" cy="330" r="120" fill="#3f7be0"/><path d="M740 280 q40 -40 80 -10 q30 30 -10 60 q-40 10 -70 -50z M840 360 q40 -20 60 20 q-20 40 -60 20z" fill="#3ccf7a"/>
      <path d="M0 1150 q540 -120 1080 0 v770 h-1080z" fill="#a9adb6"/><path d="M0 1260 q540 -90 1080 0 v660 h-1080z" fill="#9499a3"/>
      ${[[200, 1330, 90], [760, 1420, 120], [420, 1650, 70], [920, 1750, 80], [120, 1800, 60]].map(([x, y, w]) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * 0.3}" fill="#7d828c"/><ellipse cx="${x}" cy="${y - 4}" rx="${w * 0.8}" ry="${w * 0.22}" fill="#6c717b"/>`).join('')}`,
      grad('sp', '#0b0d1d', '#23284a'))
  },
  rocket: ({ fire = false } = {}) =>
    svg(
      260,
      560,
      `${fire ? `<path d="M90 420 q40 160 40 140 q0 20 40 -140z" fill="${C.orange}"/><path d="M105 420 q25 100 25 90 q0 10 25 -90z" fill="${C.yellow}"/>` : ''}
       <path d="M130 0 q90 90 90 260 v170 h-180 v-170 q0 -170 90 -260z" fill="#eef0f3"/>${shine(70, 120, 30, 200, 15)}
       <path d="M130 0 q50 50 70 110 h-140 q20 -60 70 -110z" fill="${C.red}"/>
       <circle cx="130" cy="200" r="40" fill="${C.blue}" stroke="#9aa1ad" stroke-width="12"/>
       <path d="M40 300 l-40 120 v30 h40z M220 300 l40 120 v30 h-40z" fill="${C.red}"/>
       <rect x="80" y="430" width="100" height="24" rx="6" fill="#555c68"/>
       ${TXT(130, 380, 'NASA', 30, C.ink, 900, 'middle')}`,
    ),
  astronaut: ({ pose = 'idle', expr = 'surprised' } = {}) =>
    over(
      person({ pose, shirt: '#eef0f3', skin: C.skin1, hairStyle: 'short', hair: C.brown, expr }),
      `<circle cx="180" cy="140" r="104" fill="${C.blue3}" opacity=".25" stroke="#eef0f3" stroke-width="16"/>
       <path d="M110 70 q30 -30 70 -32" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>
       <rect x="150" y="290" width="60" height="44" rx="8" fill="${C.blue}"/><circle cx="166" cy="312" r="7" fill="${C.red}"/><circle cx="192" cy="312" r="7" fill="${C.yellow}"/>`,
    ),
  flag: () =>
    svg(
      300,
      420,
      `<rect x="20" y="0" width="14" height="420" rx="7" fill="#c5cad3"/><path d="M34 20 h240 v150 h-240z" fill="${C.blue}"/>
       ${TXT(154, 112, 'NERIVA', 40, '#fff', 900, 'middle')}`,
    ),
  rock: () =>
    svg(
      440,
      260,
      `<ellipse cx="220" cy="248" rx="210" ry="12" fill="#000" opacity=".3"/><path d="M20 240 q-10 -120 80 -170 q80 -60 180 -30 q120 30 140 200z" fill="#7d828c"/>
       <path d="M60 230 q0 -90 70 -130 q60 -40 120 -20" stroke="#9499a3" stroke-width="16" fill="none" stroke-linecap="round"/>`,
    ),
  jungle: () =>
    svg(
      1080,
      1920,
      `<rect width="1080" height="1200" fill="url(#jg)"/>
       <path d="M560 1200 l160 -520 h80 l180 520z" fill="#7a4a2a"/><path d="M720 680 h80 l-20 -40 h-40z" fill="${C.orange}"/>
       <ellipse cx="770" cy="560" rx="90" ry="60" fill="#c5cad3" opacity=".8"/><ellipse cx="820" cy="470" rx="70" ry="46" fill="#c5cad3" opacity=".6"/>
       <path d="M0 1200 q260 -260 560 -60 q240 -180 520 -40 v120z" fill="#3d8f4e"/>
       <rect y="1180" width="1080" height="740" fill="#5fa64a"/>
       <ellipse cx="300" cy="1450" rx="380" ry="26" fill="#4f9440"/><ellipse cx="800" cy="1700" rx="420" ry="30" fill="#4f9440"/>
       ${[[80, 1180], [990, 1200]].map(([x, y]) => `<path d="M${x} ${y} q-10 -200 30 -360" stroke="${C.brown}" stroke-width="26" fill="none"/><path d="M${x + 30} ${y - 360} q-110 -40 -170 40 q80 -20 170 -40z M${x + 30} ${y - 360} q100 -50 180 10 q-90 -10 -180 -10z M${x + 30} ${y - 360} q60 20 100 100 q-50 -60 -100 -100z" fill="${C.green2}" stroke="${C.green}" stroke-width="6"/>`).join('')}`,
      grad('jg', '#f6b46b', '#ffe0a8'),
    ),
  trex: ({ color = '#4caf50', expr = 'smile', hat = false } = {}) =>
    svg(
      520,
      520,
      `<ellipse cx="260" cy="505" rx="200" ry="14" fill="#000" opacity=".25"/>
       <path d="M180 330 q-160 40 -180 150 q90 -60 200 -70z" fill="${shade(color, -0.15)}"/>
       <rect x="180" y="380" width="50" height="120" rx="22" fill="${shade(color, -0.2)}"/><rect x="290" y="380" width="50" height="120" rx="22" fill="${shade(color, -0.2)}"/>
       <ellipse cx="260" cy="320" rx="120" ry="130" fill="${color}"/><ellipse cx="270" cy="350" rx="70" ry="90" fill="#e8f5c8"/>
       <path d="M330 300 q40 10 50 40" stroke="${color}" stroke-width="22" fill="none" stroke-linecap="round"/>
       <rect x="200" y="60" width="290" height="190" rx="80" fill="${color}"/>${shine(230, 74, 120, 24, 12)}
       <path d="M330 210 h150 q10 40 -20 40 h-130z" fill="${shade(color, -0.25)}"/>
       ${[0, 1, 2, 3, 4].map((i) => `<path d="M${350 + i * 24} 210 l10 18 l10 -18z" fill="#fff"/>`).join('')}
       ${face(310, 130, 1.1, expr)}
       ${hat ? `<g transform="translate(250 -70) scale(.8)"><circle cx="70" cy="80" r="56" fill="#fff"/><circle cx="170" cy="80" r="56" fill="#fff"/><circle cx="120" cy="56" r="60" fill="#fff"/><rect x="50" y="110" width="140" height="60" rx="10" fill="#fff"/></g>` : ''}`,
    ),
  meteor: () =>
    svg(
      460,
      460,
      `<path d="M300 160 l-300 -160 l100 260z" fill="${C.orange}" opacity=".8"/><path d="M290 190 l-220 -150 l70 200z" fill="${C.yellow}" opacity=".9"/>
       <circle cx="320" cy="320" r="130" fill="#7a4a2a"/><circle cx="280" cy="280" r="26" fill="#5a3520"/><circle cx="360" cy="360" r="34" fill="#5a3520"/><circle cx="370" cy="270" r="16" fill="#5a3520"/>`,
    ),
  paperMenu: () =>
    svg(
      380,
      500,
      `<rect x="10" y="14" width="370" height="486" rx="14" fill="#000" opacity=".25"/><rect width="370" height="486" rx="14" fill="#f4ecd8"/>
       ${TXT(185, 64, 'MENÚ', 42, C.brown, 900, 'middle')}
       ${['Mila', 'Ñoquis', 'Flan'].map((n, i) => `${TXT(40, 140 + i * 90, n, 30, C.ink, 700)}${TXT(330, 140 + i * 90, '$' + (8 + i) + '00', 28, C.gray, 700, 'end')}<path d="M250 ${130 + i * 90} l90 -14" stroke="${C.red}" stroke-width="6"/>${TXT(320, 172 + i * 90, '$' + (12 + i * 3) + '.000', 26, '#1d3fb8', 700, 'end')}`).join('')}
       <circle cx="90" cy="420" r="40" fill="${C.red}" opacity=".45"/><circle cx="130" cy="440" r="18" fill="${C.red}" opacity=".45"/><circle cx="290" cy="400" r="26" fill="${C.brown2}" opacity=".4"/>`,
    ),
})
// pantalla para cambiar un precio
X.cphoneEdit = () =>
  over(
    phone({ screen: 'blank' }),
    `${TXT(34, 104, 'Mi carta', 24, C.ink, 800)}${TXT(34, 130, 'Editar plato', 15, C.gray, 600)}
     <rect x="30" y="150" width="240" height="150" rx="18" fill="${C.yellow}"/><circle cx="150" cy="225" r="54" fill="#e8a64a"/><circle cx="150" cy="225" r="44" fill="${C.yellow}"/><circle cx="135" cy="212" r="9" fill="${C.red}"/><circle cx="165" cy="236" r="9" fill="${C.red}"/>
     ${TXT(34, 340, 'Muzzarella', 22, C.ink, 800)}${TXT(34, 380, 'Precio', 15, C.gray, 600)}
     <rect x="30" y="392" width="240" height="56" rx="14" fill="#fff" stroke="${C.blue}" stroke-width="3"/>
     <text id="price" x="50" y="430" font-family="Archivo" font-weight="800" font-size="26" fill="${C.ink}">$ 12.900</text>
     <rect x="30" y="472" width="240" height="56" rx="28" fill="${C.blue}" id="savebtn"/>${TXT(150, 507, 'Guardar', 18, '#fff', 800, 'middle')}`,
  )

// ---- futbol y restaurante -------------------------------------------------------
Object.assign(X, {
  footballer: ({ pose = 'idle', expr = 'smile', shirt = '#e8463c', num = '9', skin = C.skin2 } = {}) =>
    over(
      person({ pose, expr, shirt, skin, hairStyle: 'short', hair: '#5a3520' }),
      `<path d="M130 252 v200 M180 238 v214 M230 252 v200" stroke="#fff" stroke-width="16" opacity=".85"/>
       <circle cx="180" cy="330" r="34" fill="#fff"/>${TXT(180, 346, num, 44, shirt, 900, 'middle')}`,
    ),
  ball: () =>
    svg(
      200,
      200,
      `<ellipse cx="100" cy="192" rx="70" ry="8" fill="#000" opacity=".25"/><circle cx="100" cy="96" r="88" fill="#fff" stroke="${C.ink}" stroke-width="6"/>
       <path d="M100 60 l34 24 l-13 40 h-42 l-13 -40z" fill="${C.ink}"/>
       <path d="M100 8 v52 M134 84 l60 -14 M121 124 l30 50 M79 124 l-30 50 M66 84 l-60 -14" stroke="${C.ink}" stroke-width="6"/>`,
    ),
  stadium: () =>
    svg(
      1080,
      1920,
      `<rect width="1080" height="1920" fill="#1b2a4a"/>
       ${[0, 1, 2, 3, 4].map((r) => `<rect y="${420 + r * 110}" width="1080" height="100" fill="${r % 2 ? '#2b3d66' : '#34497a'}"/>`).join('')}
       ${Array.from({ length: 140 }, (_, i) => `<circle cx="${(i * 73) % 1080}" cy="${440 + ((i * 37) % 520)}" r="14" fill="${[C.red, C.yellow, '#fff', C.blue3, C.green2][i % 5]}" opacity=".7"/>`).join('')}
       ${[180, 900].map((x) => `<rect x="${x - 6}" y="120" width="12" height="300" fill="#9aa1ad"/><rect x="${x - 70}" y="80" width="140" height="70" rx="10" fill="#fff8d0"/>`).join('')}
       <rect y="980" width="1080" height="940" fill="#3f9a45"/>${[0, 1, 2, 3, 4].map((i) => `<rect y="${980 + i * 190}" width="1080" height="95" fill="#47a84d"/>`).join('')}
       <path d="M0 1300 h1080" stroke="#fff" stroke-width="10" opacity=".8"/><ellipse cx="540" cy="1300" rx="260" ry="90" fill="none" stroke="#fff" stroke-width="10" opacity=".8"/>`,
    ),
  goal: () =>
    svg(
      700,
      380,
      `<rect x="20" y="20" width="660" height="340" fill="none" stroke="#fff" stroke-width="20"/>
       ${Array.from({ length: 16 }, (_, i) => `<path d="M${40 + i * 40} 30 v320" stroke="#fff" stroke-width="3" opacity=".6"/>`).join('')}
       ${Array.from({ length: 8 }, (_, i) => `<path d="M30 ${50 + i * 40} h640" stroke="#fff" stroke-width="3" opacity=".6"/>`).join('')}`,
    ),
  resto: () =>
    svg(
      1080,
      1920,
      `<rect width="1080" height="1920" fill="#8a4a2f"/><rect width="1080" height="1100" fill="#c9774a"/>
       ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${i * 190 + 20}" y="0" width="90" height="1100" fill="#bf6d41"/>`).join('')}
       <rect x="120" y="200" width="300" height="220" rx="16" fill="#3a2418"/><rect x="140" y="220" width="260" height="180" rx="10" fill="#ffd27a"/>
       <circle cx="800" cy="300" r="90" fill="#ffe7a8" opacity=".7"/><rect x="796" y="0" width="8" height="210" fill="#3a2418"/>
       <rect y="1100" width="1080" height="20" fill="#5a2f1d"/>
       <ellipse cx="540" cy="1480" rx="420" ry="70" fill="#5a2f1d"/><ellipse cx="540" cy="1460" rx="420" ry="70" fill="#a9653f"/>`,
    ),
  trend: () =>
    `<div style="width:620px;padding:30px 36px;border-radius:30px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.4);font-family:Archivo">
      <div style="color:#8b93a3;font-size:28px;font-weight:700">Tendencias · Argentina</div>
      <div style="color:#16181d;font-size:46px;font-weight:900;margin-top:10px">#CartaAnticuada</div>
      <div style="color:#8b93a3;font-size:28px;margin-top:6px">2,4 M publicaciones</div></div>`,
})
