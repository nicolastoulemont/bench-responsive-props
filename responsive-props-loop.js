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

function processed(props) {
  let styles = {}

  for (const [key, value] of Object.entries(props)) {
    if (typeof value !== 'object') {
      styles[key] = value
    } else {
      for (const [bp, mVal] of Object.entries(value)) {
        if (bp === 'base') {
          styles[key] = mVal
        } else if (breakpoints[bp]) {
          const query = `@media (min-width: ${breakpoints[bp]}px)`
          if (styles[query]) {
            styles[query][key] = mVal
          } else {
            styles[query] = { [key]: mVal }
          }
        }
      }
    }
  }
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
