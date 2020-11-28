function complexToBasic(rule, logical) {
  if (rule[0].operator === '*') return '*';

  const result = `${logical ? `${logical} ` : ''}(${rule
    .map((r) => {
      const and = r.and && r.and.length > 0 ? complexToBasic(r.and, ' &&') : '';
      const or = r.or && r.or.length > 0 ? complexToBasic(r.or, ' ||') : '';

      return `${r.logical ? `${r.logical} ` : ''}${r.operator}(${r.values
        .map((v) => v.value)
        .join(',')})${and}${or}`;
    })
    .join(' ')})`;

  return result;
}

module.exports = complexToBasic;
