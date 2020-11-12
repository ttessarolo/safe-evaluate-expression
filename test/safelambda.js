const test = require("ava");
const { safeLambda } = require("../");

const lambda = (a, b, c) => a + b + c;
const protectedLambda = safeLambda(lambda, 0);

test("lambda is NaN", (t) => t.is(lambda(), NaN));
test("safeLambda is 0", (t) => t.is(protectedLambda(), 0));
