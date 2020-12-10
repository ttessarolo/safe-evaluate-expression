'use strict';

const putInScope = require('./putInScope');
const complexToBasic = require('./complexToBasic');

// const FUNC_PARAMS = /[\"|\']?\w+(\b(?!\())\b[\"|\']?/g;
// const FUNC_PARAMS = /[\"|\']?\w+(\b(?!\(|\.))\b[\"|\']?/g;
// const FUNC_PARAMS = /(["'])(?:(?=(\\?))\2.)*?\1|\b(\b(?!\w*\(|_\b)\w+\b)/g;
//const FUNC_PARAMS = /(["'])(?:(?=(\\?))\2.)*?\1|\b(\b(?!\w*\(|_\b)(\w|-)+\b)/g;

const FUNC_PARAMS = /(["'])(?:(?=(\\?))\2.)*?\1|\b(\b(?!\w*\(|_\b)((\w|-)|([+-]?([0-9]*[.])?[0-9]+))+\b)/g;
const OPERA_EXT = /\b\w+(\w(\())/g;
const prefixOperators = (str) => str.replace(OPERA_EXT, (o) => `_.${o}`);
const strip = (p) => p.replace(/"/g, '');

//**************************************************************
// Wrap a param in a try-catch to handle undefined params
//**************************************************************
const makeSafeParam = (param, undef) => {
  if (!param.includes('"') && param.includes('-')) {
    param = param.replace(/-/g, '_');
  }

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
const makeSafeArgs = (args) => {
  if (!args) return;
  args.forEach((argomento) => {
    if (argomento) {
      Object.entries(argomento).forEach(([key, value]) => {
        if (key.includes('-')) {
          argomento[key.replace(/-/g, '_')] = value;
          delete argomento[key];
        }
      });
    }
  });

  return args;
};
function evaluateFactory({
  multipleParams = false,
  operatorsInScope = false,
  translateLogical = false,
  operators,
  undef,
} = {}) {
  return (expression, ...args) => {
    const exp = typeof expression === 'string' ? expression : complexToBasic(expression);
    let operatorsScoped = '';
    let condition = exp;

    if (operatorsInScope) operatorsScoped = putInScope(operators);
    if (multipleParams) condition = prefixOperators(exp);

    condition = makeSafe(
      translateLogical
        ? condition
            .replace(/ (AND|and) /g, ' && ')
            .replace(/ (OR|or) /g, ' || ')
            .replace(/(NOT|not) /g, '!')
        : condition,
      undef
    );

    args = makeSafeArgs(args);
    const argomenti = multipleParams ? args : args[0] || {};
    const input = multipleParams
      ? 'args, _'
      : `{${(argomenti.keys ? argomenti.keys() : Object.keys(argomenti)).map((k) => k).join(',')}}`;

    const func = new Function(input, `${operatorsScoped} \n\n return ${condition}`);
    return func(argomenti, operators);
  };
}

module.exports = evaluateFactory;
module.exports.FUNC_PARAMS = FUNC_PARAMS;
module.exports.OPERA_EXT = OPERA_EXT;
