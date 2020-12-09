const test = require('ava');
const { operators } = require('../');

test('isUndefined', (t) => t.true(operators.isUndefined(undefined)));
test('isNull', (t) => t.true(operators.isNull(null)));
test('isEmpty', (t) => t.true(operators.isEmpty('')));
test('isEqual', (t) => t.true(operators.isEqual('a', 'a')));
test('isDeepEqual', (t) => t.false(operators.isDeepEqual({}, {})));
test('isGreater', (t) => t.true(operators.isGreater(2, 1)));
test('isLower', (t) => t.true(operators.isLower(1, 2)));
test('isGreaterEqualThan', (t) => t.true(operators.isGreaterEqualThan(1, 1)));
test('isLessEqualThan', (t) => t.true(operators.isGreaterEqualThan(1, 1)));
test('includes', (t) => t.true(operators.includes(['a'], 'a')));
