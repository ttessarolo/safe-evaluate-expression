//**************************************************************
// RegEx to find  parameters, comments and arguments
//**************************************************************
const FUNC_PARAMS = /\b\w+(\b(?!\())/g;
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
// Returns labda function body
//**************************************************************
function getLambdaBody(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, "");
  return fnStr.substring(fnStr.indexOf("=>") + 3);
}

//**************************************************************
// Wrap a param in a try-catch to handle undefined params
//**************************************************************
const makeSafeParam = (param, undef) => `(() => {
      try {
        return ${param} !== undefined ? ${param} : ${undef};
      } catch (e) {
        return ${undef};
      }
    })()`;

//**************************************************************
// Wrap every function and sub-function param in a safe
// try-catch to handle undefined
//**************************************************************
const makeSafe = (str, undef) => str.replace(FUNC_PARAMS, (p) => makeSafeParam(p, undef));

//**************************************************************
// Stringify params object and dynamically build
// function that evaluate the expression body
//**************************************************************
const evaluate = (body, params, undef) => {
  const input = `{${Object.keys(params)
    .map((k) => k)
    .join(",")}}`;

  const func = new Function(input, `return ${makeSafe(body, undef)}`);
  return func(params);
};

//**************************************************************
// Get a lambda function as input and optiona parameters
// to default undefined params in returnd function
//**************************************************************
function defaultLambda(func, undef) {
  const expression = getLambdaBody(func).trim();
  const names = getParamNames(func);

  return function (...vars) {
    const params = {};
    names.forEach((name, index) => (params[name] = vars[index]));

    return evaluate(expression, params, undef);
  };
}

module.exports = evaluate;
module.exports.defaultLambda = defaultLambda;
