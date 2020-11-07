//**************************************************************
// RegEx to find all parameters in function and sub-function
//**************************************************************
const findParams = /\b\w+(\b(?!\())/g;

//**************************************************************
// Wrap a param in a try-catch to handle undefined params
//**************************************************************
const makeSafeParam = (param) => `(() => {
      try {
        return ${param};
      } catch (e) {
        return undefined;
      }
    })()`;

//**************************************************************
// Wrap every function and sub-function param in a safe
// try-catch to handle undefined
//**************************************************************
const makeSafe = (str) => str.replace(findParams, (p) => makeSafeParam(p));

//**************************************************************
// Stringify params object and dynamically build
// function that evaluate the expression body
//**************************************************************
const evaluate = (body, params) => {
  const input = `{${Object.keys(params)
    .map((k) => k)
    .join(",")}}`;

  const func = new Function(input, `return ${makeSafe(body)}`);
  return func(params);
};

module.exports = evaluate;
