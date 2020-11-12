const test = require("ava");
const { factory, operators } = require("../");
const evaluate = factory({ operators, multipleParams: true, translateLogical: true });

const metadata = { x: 1.1, y: 2 };
const list = { k: 3, z: 4 };
const map = new Map([["pi", 3.14]]);

const expression1 = "isLower(x,z)";
const expression2 = "isLower(k,y)";
const expression3 = "isLower(notDefined,z)"; // put a not defined value

test("expression1", (t) => t.true(evaluate(expression1, metadata, list)));
test("expression1 OR expression2", (t) =>
  t.true(evaluate(`${expression1} OR ${expression2}`, metadata, list)));

test("expression2", (t) => t.false(evaluate(expression2, metadata, list)));
test("expression1 AND expression2", (t) =>
  t.false(evaluate(`${expression1} AND ${expression2}`, metadata, list)));
test("expression3", (t) => t.false(evaluate(expression3, metadata, list)));
test("expression3 AND expression2", (t) =>
  t.false(evaluate(`${expression3} AND ${expression2}`, metadata, list)));
test("isLower(x,z) AND isLower(k,y) OR (isLower(z,P) AND NOT isLower(P,k)))", (t) =>
  t.false(
    evaluate(
      `(isLower(x,z) AND isLower(k,y) OR (isLower(z,P) AND NOT isLower(P,k)))`,
      metadata,
      list
    )
  ));
test(`isLower(z,pi)`, (t) => t.false(evaluate(`isLower(z,pi)`, metadata, list, map)));
