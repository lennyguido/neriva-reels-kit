// Pulpo mozo: 8 tentáculos, moñito. X.pulpo({ expr, color })
X.pulpo = ({ expr = 'smile', color = '#ff7a59' } = {}) => {
  const dark = '#e0573a'
  const arms = [
    [-150, -40], [-190, 60], [-160, 170], [-80, 230], [80, 230], [160, 170], [190, 60], [150, -40],
  ]
  const tent = arms
    .map(([dx, dy], i) => {
      const x0 = 300 + (i - 3.5) * 22, y0 = 330
      const x1 = 300 + dx * 1.15, y1 = 360 + dy
      const cx = 300 + dx * 0.4, cy = 420 + dy * 0.2
      return `<path d="M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}" stroke="${color}" stroke-width="44" fill="none" stroke-linecap="round"/>
        <circle cx="${(x0 + x1) / 2 + dx * 0.05}" cy="${(y0 + y1) / 2 + 30}" r="7" fill="#ffd2c4"/><circle cx="${x1}" cy="${y1}" r="24" fill="${color}"/>`
    })
    .join('')
  return svg(
    600,
    640,
    `<ellipse cx="300" cy="620" rx="230" ry="18" fill="#000" opacity=".18"/>
     ${tent}
     <ellipse cx="300" cy="220" rx="170" ry="190" fill="${color}"/>
     <ellipse cx="245" cy="120" rx="50" ry="30" fill="#fff" opacity=".25"/>
     <circle cx="190" cy="160" r="20" fill="${dark}"/><circle cx="400" cy="140" r="14" fill="${dark}"/>
     ${face(300, 250, 1.5, expr)}
     <path d="M300 360 l-58 -30 v60z M300 360 l58 -30 v60z" fill="${C.ink}"/><circle cx="300" cy="360" r="14" fill="${C.ink}"/>`,
  )
}
