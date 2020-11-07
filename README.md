# safe-evaluate-expression

Small library to dynamically create and evaluate expression with multiple parameters (even undefined). _It also offer an ancillary function to protect lambda function to undefined params inputs._

## Installation

```
npm install safe-evaluate-expression
```

## Usage

### _evaluate(expression:[String], params:[Object])_

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
evaluate("(isUndefined(notDefined) || (isGreater(c, a) && isLower(b, c))) && isEqual(a,1)", params); // -> true
```

## Default lambda undefined params

### _protectedLambda(lamdaFunc, [undefined dafalut])_

Protect lambda function by assigning a default value for undefined input paramters.

```javascript
const { defaultLambda } = require("safe-evaluate-expression");

const lambda = (a, b, c) => a + b + c;
const protectedLambda = defaultLambda(lambda, 0);

// The unprotected lambda returns NaN because all values are undefined
// The protected one return zero (default): 0 + 0 + 0
console.log(lambda(), protectedLambda()); // -> NaN 0
```
