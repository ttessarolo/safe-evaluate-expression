# safe-evaluate-expression

![NPM](https://img.shields.io/npm/v/safe-evaluate-expression/latest)
![NPM](https://img.shields.io/npm/dw/safe-evaluate-expression)
![NPM](https://img.shields.io/npm/l/safe-evaluate-expression)
![Codecov](https://img.shields.io/codecov/c/gh/ttessarolo/safe-evaluate-expression)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/safe-evaluate-expression)
![NPM](https://img.shields.io/badge/4R3S-PR0DUCT10N-magenta)

Small library to dynamically create and evaluate expression with multiple parameters (even undefined). **To handle more sofisticate use cases is provided a [Factory](#factory) functionality to build evaluate functions with some spice 🔥**.

_It also offer an ancillary function to protect lambda function to undefined params inputs._

## Installation

```
npm install safe-evaluate-expression
```

# Evaluate

### _evaluate(expression:[String], params:[Object]) -> [expression evaluated]_

## Example

```javascript
const evaluate = require("safe-evaluate-expression");
evaluate("a > 1", { a: 3 }); // -> true
```

_NB. As constant params in expression you can use only string and integers (eg. 1, "a") no floating numbers!_

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

# Factory

### _factory(options:[Object]) -> [evaluate function]_

## Example

```javascript
const { factory, operators } = require("safe-evaluate-expression");
const evaluate = factory({ operators, multipleParams: true, translateLogical: true });

const metadata = { x: 1.1, y: 2 };
const list = { k: 3, z: 4 };
const map = new Map([["pi", 3.14]]);

const expression1 = "isLower(x,z)";
const expression2 = "isLower(k,y)";

evaluate(expression1, metadata, list); // -> true
evaluate(expression2, metadata, list); // -> false
evaluate(`${expression1} AND ${expression2}`, metadata, list); // -> false
evaluate(`${expression1} OR ${expression2}`, metadata, list); // -> true

const expression3 = "isLower(notDefined,z)"; // put a not defined value

evaluate(expression3, metadata, list);
evaluate(`${expression3} AND ${expression2}`, metadata, list); // -> false
evaluate(`(isLower(x,z) AND isLower(k,y) OR (isLower(z,P) AND NOT isLower(P,k)))`, metadata, list);

evaluate(`isLower(z,pi)`, metadata, list, map); // -> false
```

## Factory Params

<table>
<tr>
<th>Param</th><th>Description</th><th>Default</th>
</tr>
<tr>
  <td style="vertical-align:top"><b>multipleParams</b></td>
  <td>
  Define if evaluate function will take a single object as params (default - eg. eval("espression",{})) or if it takes multiple params (eg. eval("espression", param1, param2, ...))
  </td>
  <td style="vertical-align:top">false</td>
</tr>
<tr>
  <td style="vertical-align:top"><b>operatorsInScope</b></td>
  <td>
  Define if operators object is converted inline to have all the operators directly in the scope of the evaluation expression. If true the operators are putted in the expression context as: <b>const</b> [operatorName] = [operator]. Otherwise operators are passed thru as a single object while all operators logic inside expression are automatically prefixed. In general: use operatorsInScope = true if you use operators without external dependencies. If you use third party libraries to handle operators logic you must pass operators as an object. 
  </td>
  <td style="vertical-align:top">false</td>
</tr>
<tr>
  <td style="vertical-align:top"><b>translateLogical</b></td>
  <td>
  Determine if translate "AND", "OR" and "NOT" words inside expression. If true all the logical operators are converted accordingly (eg. "AND" -> &&)
  </td>
  <td style="vertical-align:top">false</td>
</tr>
<tr>
  <td  style="vertical-align:top"><b>operators</b></td>
  <td>
  Object containing all the operators function you want to use to evaluate expression (eg. { isEqual: (a,b) => a === b }). <i>For convenience the library export a small set of default operators.</i>
  </td>
  <td></td>
</tr>
<tr>
  <td  style="vertical-align:top"><b>undef</b>
  </td>
  <td>
    An optional parameter to specify the value to be returned when expression occurs in undefined params.
  </td>
  <td style="vertical-align:top">undefined</td>
</tr>
</table>

# Safe Lambda

### _safeLambda(lamdaFunc, [undefined defalut])_

Protect lambda function by assigning a default value for undefined input paramters.

```javascript
const { safeLambda } = require("safe-evaluate-expression");

const lambda = (a, b, c) => a + b + c;
const protectedLambda = safeLambda(lambda, 0);

// The unprotected lambda returns NaN because all values are undefined
// The protected one return zero (default): 0 + 0 + 0
console.log(lambda(), protectedLambda()); // -> NaN 0
```
