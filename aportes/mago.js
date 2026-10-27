// Mago con galera, capa y varita. X.mago({ expr, pose })
X.mago = ({ expr = 'wink', pose = 'point' } = {}) =>
  person({ shirt: '#7b5cff', pose, expr, hairStyle: 'bald' }).replace(
    /<\/svg>\s*$/,
    `<rect x="110" y="64" width="140" height="18" rx="6" fill="${C.ink}"/><rect x="132" y="-40" width="96" height="110" rx="8" fill="${C.ink}"/><rect x="132" y="40" width="96" height="16" fill="${C.red}"/>
     <path d="M118 236 q-60 120 -40 224 h70z M242 236 q60 120 40 224 h-70z" fill="#3a2a7a"/>
     <path d="M352 198 l60 -70" stroke="${C.ink}" stroke-width="12" stroke-linecap="round"/><path d="M402 140 l10 -12" stroke="#fff" stroke-width="12" stroke-linecap="round"/></svg>`,
  )
