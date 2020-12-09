const test = require('ava');
const { putInScope, operators } = require('../');

//console.log(putInScope(operators));

const expected = `const isUndefined = (x) => x === undefined;
const isNull = (x) => x === null;
const isEmpty = (x) =>
    x === undefined ||
    x === null ||
    (typeof x === 'string' && x.trim().length === 0) ||
    (typeof x === 'number' && isNaN(x)) ||
    (typeof x === 'object' && Object.keys(x).length === 0);
const isEqual = (a, b) => a == b;
const isDeepEqual = (a, b) => a === b;
const isGreater = (a, b) => a > b;
const isLower = (a, b) => a < b;
const isGreaterEqualThan = (a, b) => Number(a) >= Number(b);
const isLessEqualThan = (a, b) => Number(a) <= Number(b);
const includes = (a, b) => (a ? a.includes(b) : false);`;

test('operators are in scope', (t) => t.is(putInScope(operators), expected));
