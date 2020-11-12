const { safeLambda } = require("../");

const lambda = (a, b, c) => a + b + c;
const protectedLambda = safeLambda(lambda, 0);

console.log(lambda(), protectedLambda()); // -> NaN 0
