const test = require("ava");
const evaluate = require("..");
const { operators } = require("..");

const vars = { a: 1, b: 1, c: 2, when_current_hour: 12 };
const params = { ...vars, ...operators };

test("isEqual(a,b)", (t) => t.true(evaluate("isEqual(a,b)", params)));
test("isEqual(a,c)", (t) => t.false(evaluate("isEqual(a,c)", params)));
test("isEqual(a,notDefined)", (t) => t.false(evaluate("isEqual(a,notDefined)", params)));
test("isUndefined(a)", (t) => t.false(evaluate("isUndefined(a)", params)));
test("isUndefined(notDefined)", (t) => t.true(evaluate("isUndefined(notDefined)", params)));
test("(isUndefined(notDefined) || (isGreater(c, a) && isLower(b, c))) && isEqual(a,1)", (t) =>
  t.true(
    evaluate(
      "(isUndefined(notDefined) || (isGreater(c, a) && isLower(b, c))) && isEqual(a,1)",
      params
    )
  ));
