const breakpoints = {
  sm: 470,
  md: 780,
  lg: 1020,
}

const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
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
  if (responsiveObject.base) {
    styles[key] = responsiveObject.base
  }
  if (responsiveObject.sm) {
    if (media[mediaQueries.sm]) {
      media[mediaQueries.sm][key] = responsiveObject.sm
    } else {
      media[mediaQueries.sm] = { [key]: responsiveObject.sm }
    }
  }
  if (responsiveObject.md) {
    if (media[mediaQueries.md]) {
      media[mediaQueries.md][key] = responsiveObject.md
    } else {
      media[mediaQueries.md] = { [key]: responsiveObject.md }
    }
  }
  if (responsiveObject.lg) {
    if (media[mediaQueries.lg]) {
      media[mediaQueries.lg][key] = responsiveObject.lg
    } else {
      media[mediaQueries.lg] = { [key]: responsiveObject.lg }
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
  mapDimension(props, styles, media)
  mapRadius(props, styles, media)
  mapDisplay(props, styles, media)
  mapSpacing(props, styles, media)
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
