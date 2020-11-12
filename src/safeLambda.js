const factory = require("./factory");

//**************************************************************
// RegEx to find  parameters, comments and arguments
//**************************************************************
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;

//**************************************************************
// Returns regular function parameters names
//**************************************************************
function getParamNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, "");
  const result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);

  return result || [];
}

//**************************************************************
// Returns lambda function body
//**************************************************************
function getLambdaBody(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, "");
  return fnStr.substring(fnStr.indexOf("=>") + 3);
}

//**************************************************************
// Get a lambda function as input and optional parameters
// to default undefined params in returned function
//**************************************************************
function defaultLambda(func, undef) {
  const evaluate = factory({ undef });
  const expression = getLambdaBody(func).trim();
  const names = getParamNames(func);

  return function (...vars) {
    const params = {};
    names.forEach((name, index) => (params[name] = vars[index]));

    return evaluate(expression, params, undef);
  };
}

module.exports = defaultLambda;
