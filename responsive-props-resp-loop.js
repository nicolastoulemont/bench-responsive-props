const breakpoints = {
  sm: 470,
  md: 780,
  lg: 1020,
}

const raw = {
  display: 'flex',
  borderRadius: { base: '100%', lg: '9999px' },
  margin: { base: '10px', sm: '20px', md: '30px', lg: '40px' },
  padding: { base: '10px', sm: '20px', md: '30px', lg: '40px' },
  width: { base: '100%', sm: '70%', md: '50%', lg: '30%' },
  height: 300,
}

function isResponsive(value) {
  return typeof value === 'object'
}

function handleResponsive(responsiveObject, styles, media, key) {
  for (const [bp, value] of Object.entries(responsiveObject)) {
    if (bp === 'base') {
      styles[key] = value
    } else if (breakpoints[bp]) {
      const query = `@media (min-width: ${breakpoints[bp]}px)`
      if (media[query]) {
        media[query][key] = value
      } else {
        media[query] = { [key]: value }
      }
    }
  }
}

function mapRadius({ borderRadius }, styles, media) {
  if (isResponsive(borderRadius)) {
    handleResponsive(borderRadius, styles, media, 'borderRadius')
  } else {
    styles.borderRadius = borderRadius
  }
}
function mapDisplay({ display }, styles, media) {
  if (isResponsive(display)) {
    handleResponsive(display, styles, media, 'display')
  } else {
    styles.display = display
  }
}
function mapDimension({ width, height }, styles, media) {
  if (isResponsive(width)) {
    handleResponsive(width, styles, media, 'width')
  } else {
    styles.width = width
  }

  if (isResponsive(height)) {
    handleResponsive(height, styles, media, 'height')
  } else {
    styles.height = height
  }
}

function mapSpacing({ margin, padding }, styles, media) {
  if (isResponsive(margin)) {
    handleResponsive(margin, styles, media, 'margin')
  } else {
    styles.margin = margin
  }

  if (isResponsive(padding)) {
    handleResponsive(padding, styles, media, 'padding')
  } else {
    styles.padding = padding
  }
}

function processed(props) {
  let media = {}
  let styles = {}
  Object.assign(styles, mapDimension(props, styles, media))
  Object.assign(styles, mapRadius(props, styles, media))
  Object.assign(styles, mapDisplay(props, styles, media))
  Object.assign(styles, mapSpacing(props, styles, media))
  Object.assign(styles, media)
  return styles
}

console.log(JSON.stringify(processed(raw), null, 2))

const RUNS = 1000000
let deltas = []
for (let i = 0; i < RUNS; i++) {
  const start = Date.now()
  processed(raw)
  const end = Date.now()
  deltas.push(end - start)
}
console.log('-----------')
console.log(`stats for ${RUNS} runs`)
console.log(`total: ${deltas.reduce((acc, num) => acc + num, 0)}ms`)
console.log(
  `average run: ${deltas.reduce((acc, num) => acc + num, 0) / deltas.length}ms`
)
