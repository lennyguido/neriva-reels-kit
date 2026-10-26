// Espía de traje con anteojos negros. X.espia({ expr, pose })
X.espia = ({ expr = 'smile', pose = 'idle' } = {}) =>
  person({ shirt: C.ink, pose, expr, hairStyle: 'short' }).replace(
    /<\/svg>\s*$/,
    `<rect x="120" y="122" width="60" height="34" rx="10" fill="${C.ink}"/><rect x="186" y="122" width="60" height="34" rx="10" fill="${C.ink}"/><rect x="176" y="130" width="14" height="6" fill="${C.ink}"/>
     <rect x="128" y="128" width="20" height="8" rx="4" fill="#fff" opacity=".35"/><rect x="194" y="128" width="20" height="8" rx="4" fill="#fff" opacity=".35"/>
     <path d="M168 232 l12 18 l12 -18z" fill="${C.red}"/><path d="M160 230 l20 10 l20 -10" stroke="#fff" stroke-width="6" fill="none"/></svg>`,
  )
// Pasillo con láseres rojos (fondo a pantalla completa)
X.lasers = () =>
  svg(
    1080,
    1920,
    `<rect width="1080" height="1920" fill="#0d0f1a"/><rect y="1350" width="1080" height="570" fill="#161a2b"/>
     ${[[0, 500, 1080, 760], [0, 900, 1080, 640], [0, 1000, 1080, 1250], [0, 640, 1080, 1100], [0, 1220, 1080, 980]].map(([a, b, c, d]) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#ff2d3d" stroke-width="16" opacity=".35"/><line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="#ff6b75" stroke-width="5"/>`).join('')}`,
  )
