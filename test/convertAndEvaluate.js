const test = require('ava');
const { factory, operators, complexToBasic, basicToComplex } = require('..');
const evaluate = factory({ operators, multipleParams: true, translateLogical: true });

const metadata = { a: 1, b: 2, c: 3 };
const basic = `not isEmpty("a") AND isEqual(a,b) OR isEqual(c,3)`;

const truly = {
  and: [
    { operator: '!isEmpty', values: [{ type: 'string', value: '"lorem"' }] },
    {
      or: [
        {
          operator: 'isEqual',
          values: [
            { type: 'string', value: '"a"' },
            { type: 'string', value: '"c"' },
          ],
        },
        {
          operator: 'isEqual',
          values: [
            { type: 'string', value: '"b"' },
            { type: 'string', value: '"b"' },
          ],
        },
      ],
    },
  ],
};

const falsy = {
  and: [
    { operator: '!isEmpty', values: [{ type: 'string', value: '"lorem"' }] },
    {
      or: [
        {
          operator: 'isEqual',
          values: [
            { type: 'string', value: '"a"' },
            { type: 'string', value: '"c"' },
          ],
        },
        {
          operator: 'isEqual',
          values: [
            { type: 'string', value: '"b"' },
            { type: 'string', value: '"d"' },
          ],
        },
      ],
    },
  ],
};

test('test truly condition', (t) => {
  const condition = complexToBasic(truly);
  t.true(evaluate(condition, metadata));
});

test('test falsy condition', (t) => {
  const condition = complexToBasic(falsy);
  t.false(evaluate(condition, metadata));
});

test('test falsy basic to complex condition', (t) => {
  const complex = basicToComplex(basic);
  const condition = complexToBasic(complex);
  t.true(evaluate(condition, metadata));
});
