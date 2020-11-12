const putInScope = require("./putInScope");

// const FUNC_PARAMS = /[\"|\']?\w+(\b(?!\())\b[\"|\']?/g;
const FUNC_PARAMS = /[\"|\']?\w+(\b(?!\(|\.))\b[\"|\']?/g;
const OPERA_EXT = /\b\w+(\w(\())/g;
const prefixOperators = (str) => str.replace(OPERA_EXT, (o) => `_.${o}`);
const strip = (p) => p.replace(/"/g, "");

//**************************************************************
// Wrap a param in a try-catch to handle undefined params
//**************************************************************
const makeSafeParam = (param, undef) => {
  const wrap = `(() => {
      try {
        return ${param} !== undefined ? ${param} : ${undef};
      } catch (e) {
        try {
          for(const arg of args){
            if(arg.get) return arg.get("${strip(param)}")
            if(typeof arg === "object" && arg["${strip(param)}"]) return arg["${strip(param)}"];
          }
        } catch(e){
          return ${undef};
        }

        return ${undef};
      }
    })()`;

  return wrap;
};

//**************************************************************
// Wrap every function and sub-function param in a safe
// try-catch to handle undefined
//**************************************************************
const makeSafe = (str, undef) => str.replace(FUNC_PARAMS, (p) => makeSafeParam(p, undef));

function evaluateFactory({
  multipleParams = false,
  operatorsInScope = false,
  translateLogical = false,
  operators,
  undef,
} = {}) {
  return (expression, ...args) => {
    let operatorsScoped = "";
    let condition = expression;

    if (operatorsInScope) operatorsScoped = putInScope(operators);
    if (multipleParams) condition = prefixOperators(expression);

    condition = makeSafe(
      translateLogical
        ? condition
            .replace(/ (AND|and) /g, " && ")
            .replace(/ (OR|or) /g, " || ")
            .replace(/(NOT|not) /g, "!")
        : condition,
      undef
    );

    const arguments = multipleParams ? args : args[0] || {};
    const input = multipleParams
      ? "args, _"
      : `{${(arguments.keys ? arguments.keys() : Object.keys(arguments)).map((k) => k).join(",")}}`;

    const func = new Function(input, `${operatorsScoped} \n\n return ${condition}`);
    return func(arguments, operators);
  };
}

module.exports = evaluateFactory;
