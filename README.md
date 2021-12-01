## Quick benchmark of the different implementations of responsive props

Main take aways : the less you do, the better.

For 1 000 000 RUNS per implementation:

| File                                   | average run time (ms) | total time (ms) | increase  |
| -------------------------------------- | --------------------- | --------------- | --------- |
| responsive-props-no-loop.js            | 0.000322              | 322             | 0         |
| responsive-props-no-loop-bp-dyn-str.js | 0.000369              | 369             | +14.5963% |
| responsive-props-no-loop-bp-loop.js    | 0.00081               | 810             | +151.553% |
| responsive-props-resp-loop.js          | 0.00309               | 3090            | +859.627% |
| responsive-props-loop.js               | 0.003849              | 3849            | +1095.34% |
