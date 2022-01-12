## Quick benchmark of the different implementations of responsive props

Main take aways : the less you do, the better.

### Objectives

Transform a object with responsive props into an object that emotion can consume to emit media queries and styles.

Props object:

```javascript
const props = {
  display: 'flex',
  borderRadius: { base: '100%', lg: '9999px' },
  margin: { base: '10px', sm: '20px', md: '30px', lg: '40px' },
  padding: { base: '10px', sm: '20px', md: '30px', lg: '40px' },
  width: { base: '100%', sm: '70%', md: '50%', lg: '30%' },
  height: 300,
}
```

Emotion compatible object:

```javascript
{
  "width": "100%",
  "height": 300,
  "borderRadius": "100%",
  "display": "flex",
  "margin": "10px",
  "padding": "10px",
  "@media (min-width: 470px)": {
    "width": "70%",
    "margin": "20px",
    "padding": "20px"
  },
  "@media (min-width: 780px)": {
    "width": "50%",
    "margin": "30px",
    "padding": "30px"
  },
  "@media (min-width: 1020px)": {
    "width": "30%",
    "borderRadius": "9999px",
    "margin": "40px",
    "padding": "40px"
  }
}
```

### Results

For 1 000 000 RUNS per implementation:

| File                                             | average run time (ms) | total time (ms) | increase  |
| ------------------------------------------------ | --------------------- | --------------- | --------- |
| responsive-props-impure-no-loop.js               | 0.000322              | 322             | 0         |
| responsive-props-impure-no-loop-bp-dyn-str.js    | 0.000369              | 369             | +14.5963% |
| responsive-props-impure-no-loop-bp-loop.js       | 0.00081               | 810             | +151.553% |
| responsive-props-impure-resp-for-in-loop.js      | 0.001159              | 1159            | +259.937% |
| responsive-props-pure-for-in-loop.js             | 0.00243               | 2438            | +657.142% |
| responsive-props-impure-resp-obj-entries-loop.js | 0.00309               | 3090            | +859.627% |
| responsive-props-pure-obj-entries-loop.js        | 0.003849              | 3849            | +1095.34% |
