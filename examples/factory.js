const { factory, operators } = require("../");
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
