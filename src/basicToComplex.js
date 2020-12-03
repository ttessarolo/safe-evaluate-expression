const { FUNC_PARAMS } = require('./factory');

const matchOR = /([^\s]+)OR([^\s]+)/g;

function getType(value) {
  if (!isNaN(value)) return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (new Date(value).toString() !== 'Invalid Date') return 'date';
  if (value.includes("'") || value.includes('"')) return 'string';
  return 'metadata';
}

function getValue(value) {
  return value.replace(/"/g, '').replace(/'/g, '');
}

const emptyValues = [
  { value: '', type: 'string' },
  { value: '', type: 'string' },
];

function compose(rule) {
  rule = rule.replace(/not /g, '!').trim();
  const operator = rule.substring(0, rule.indexOf('('));
  const params = rule.match(FUNC_PARAMS);
  const values = params
    ? params.map((value) => ({ value: getValue(value), type: getType(value) }))
    : emptyValues;

  return { operator, values };
}

function extract(rule) {
  rule = rule.replace(/not /g, '!').trim();
  const ors = new Set();
  const newRule = rule.replace(/ OR /g, 'OR');
  const orRule = newRule.replace(/\s/g, '').replace(/AND/g, ' ');
  const matched = orRule.match(matchOR);
  if (matched) {
    matched.forEach((m) => {
      m.split('OR').forEach((or) => ors.add(or));
    });
  }

  const ands = orRule
    .replace(matchOR, '')
    .trim()
    .split(' ')
    .filter((a) => a);

  return [[...ors].map((or) => compose(or)), ands.map((and) => compose(and))];
}

function basicToComplex(rule) {
  if (rule === '*') {
    return { and: [{ operator: '*', values: [] }] };
  }

  const [ors, ands] = extract(rule);

  if (ors.length > 0 && ands.length > 0) {
    return { and: [...ands, { or: ors }] };
  }

  if (ands.length > 0) return { and: ands };
  if (ors.length > 0) return { or: ors };
}

module.exports = basicToComplex;
