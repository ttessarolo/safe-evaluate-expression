const { OPERA_EXT, FUNC_PARAMS } = require('./factory');

function basicToComplex(rule, chain = [], logical) {
  if (rule === '*') {
    return [
      {
        operator: '*',
        values: [],
      },
    ];
  }

  const and = rule.indexOf(' AND ');
  const or = rule.indexOf(' OR ');
  const not = rule.indexOf('not ') > -1;
  const index = and > 0 ? and : 0 || or > 0 ? or : 0 || rule.length;

  const prefix = rule
    .substring(0, index)
    .trim()
    .replace(/(NOT|not) /g, '');
  const rest = rule.substring(index + 4).trim();
  let operator = prefix.match(OPERA_EXT)[0];
  operator = `${not ? '!' : ''}${operator.substring(0, operator.length - 1)}`;

  const values = prefix.match(FUNC_PARAMS).map((value) => ({ value, type: 'string' }));
  chain.push({ logical, operator, values });

  if (rest) basicToComplex(rest, chain, and > -1 ? '&&' : '||');

  return chain;
}

module.exports = basicToComplex;
