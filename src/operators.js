module.exports = {
  isUndefined: (x) => x === undefined,
  isNull: (x) => x === null,
  isEmpty: (x) =>
    x === undefined ||
    x === null ||
    (typeof x === "string" && x.trim().length === 0) ||
    (typeof x === "number" && isNaN(x)) ||
    (typeof x === "object" && Object.keys(x).length === 0),
  isEqual: (a, b) => a == b,
  isDeepEqual: (a, b) => a === b,
  isGreater: (a, b) => a > b,
  isLower: (a, b) => a < b,
  isGreaterEqualThan: (a, b) => Number(a) >= Number(b),
  isLessEqualThan: (a, b) => Number(a) <= Number(b),
};
