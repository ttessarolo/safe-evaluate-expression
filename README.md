# safe-evaluate-expression

Small library to dynamically create and evaluate expression with multiple parameters (even undefined).

## Installation

```
npm install safe-evaluate-expression
```

## Example

```javascript
const evaluate = require("safe-evaluate-expression");

const isUndefined = (x) => (x === undefined ? true : false);
const isEqual = (a, b) => a === b;

const params = { a: 1, b: 1, c: 2 };

evaluate("isEqual(a,b)", params); // -> true
evaluate("isEqual(a,c)", params); // -> false
evaluate("isEqual(a,notExisting)", params); // -> false
evaluate("isUndefined(a)", params); // -> false
evaluate("isUndefined(notExisting)", params); // -> true
```
