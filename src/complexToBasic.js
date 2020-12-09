function getValue(data) {
  return data.value;
  // let value = data.value;
  // if (['string', 'freeText'].includes(data.type)) {
  //   if (value.toString().match(/"/)) {
  //     value = `"${value}"`;
  //   }
  // }

  // return value;
}
function complexToBasic(rule) {
  const result = (rule.and || rule.or)
    .map((sub) => {
      if (sub.operator === '*') return '*';
      if (sub.and || sub.or) return complexToBasic(sub);
      return `${sub.operator}(${sub.values.map((v) => getValue(v)).join(', ')})`;
    })
    .join(rule.and ? ' && ' : ' || ');

  return result === '*' ? '*' : `(${result})`;
}

module.exports = complexToBasic;
