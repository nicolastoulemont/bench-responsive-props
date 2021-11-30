## Quick benchmark of the different implementations of responsive props

Main take aways : the less you do, the better.

For 1 000 000 RUNS:

| File                                   | average run time (ms) | total time (ms) |
| -------------------------------------- | --------------------- | --------------- |
| responsive-props-loop.js               | 0.003849              | 3849            |
| responsive-props-resp-loop.js          | 0.003164              | 3164            |
| responsive-props-no-loop-bp-loop.js    | 0.00081               | 810             |
| responsive-props-no-loop-bp-dyn-str.js | 0.000369              | 369             |
| responsive-props-no-loop.js            | 0.000322              | 322             |
