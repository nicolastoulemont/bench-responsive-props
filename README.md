## Quick benchmark of the different implementations of responsive props

Main take away : the less you do, the better.

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

| File                              | average run time (ms) | total time (ms) | increase  |
| --------------------------------- | --------------------- | --------------- | --------- |
| impure-no-loop.js                 | 0.000322              | 322             | 0         |
| impure-no-loop-bp-dyn-str.js      | 0.000369              | 369             | +14.596%  |
| impure-no-loop-bp-for-of-loop.js  | 0.00081               | 810             | +151.553% |
| impure-no-loop-bp-foreach-loop.js | 0.000846              | 846             | +162.732% |
| impure-resp-for-in-loop.js        | 0.001159              | 1159            | +259.937% |
| pure-for-in-loop.js               | 0.00243               | 2438            | +657.142% |
| impure-resp-obj-entries-loop.js   | 0.00309               | 3090            | +859.627% |
| pure-obj-entries-loop.js          | 0.003849              | 3849            | +1095.34% |
