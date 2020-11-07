# safe-evaluate-expression

Small library to dynamically create and evaluate expression with multiple parameters (even undefined).

## Installation

```
npm install safe-evaluate-expression
```

## Example

```javascript
const evaluate = require("safe-evaluate-expression");
evaluate("a > 1", { a: 3 }); // -> true
```

## Advanced Example

```javascript
const evaluate = require("safe-evaluate-expression");

const operators = {
  isUndefined: (x) => x === undefined,
  isEqual: (a, b) => a === b,
  isGreater: (a, b) => a > b,
  isLower: (a, b) => a < b,
};

const vars = { a: 1, b: 1, c: 2 };
const params = { ...vars, ...operators };

evaluate("isEqual(a,b)", params); // -> true
evaluate("isEqual(a,c)", params); // -> false
evaluate("isEqual(a,notDefined)", params); // -> false
evaluate("isUndefined(a)", params); // -> false
evaluate("isUndefined(notDefined)", params); // -> true

// It works also with infinite nested conditions
evaluate("(isUndefined(notDefined) || (isGreater(c, a) && isLower(b, c)) && isEqual(a,1)", params); // -> true
```
