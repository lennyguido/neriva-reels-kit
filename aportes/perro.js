// Perro sentado (opcional servilleta). X.perro({ expr, napkin })
X.perro = ({ expr = 'happy', napkin = false } = {}) =>
  svg(
    420,
    460,
    `<ellipse cx="210" cy="448" rx="150" ry="12" fill="#000" opacity=".2"/>
     <path d="M300 380 q70 -10 80 -80" stroke="#c98a4b" stroke-width="26" fill="none" stroke-linecap="round"/>
     <ellipse cx="210" cy="350" rx="120" ry="100" fill="#d9a066"/><ellipse cx="210" cy="370" rx="70" ry="70" fill="#f1d3a8"/>
     <ellipse cx="150" cy="440" rx="40" ry="20" fill="#c98a4b"/><ellipse cx="270" cy="440" rx="40" ry="20" fill="#c98a4b"/>
     <circle cx="210" cy="170" r="105" fill="#d9a066"/>
     <path d="M115 120 q-60 30 -40 140 q40 -20 60 -70z" fill="#8a5a2f"/><path d="M305 120 q60 30 40 140 q-40 -20 -60 -70z" fill="#8a5a2f"/>
     <ellipse cx="210" cy="215" rx="60" ry="46" fill="#f1d3a8"/><ellipse cx="210" cy="190" rx="20" ry="14" fill="${C.ink}"/>
     ${face(210, 160, 1.1, expr)}
     ${napkin ? `<path d="M140 262 h140 l-70 90z" fill="#fff"/><path d="M140 262 h140" stroke="#e2e4ea" stroke-width="8"/>` : `<rect x="140" y="262" width="140" height="18" rx="9" fill="${C.red}"/><circle cx="210" cy="292" r="14" fill="${C.yellow}"/>`}`,
  )
