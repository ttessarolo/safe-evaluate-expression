const test = require('ava');
const { factory, operators, complexToBasic, basicToComplex } = require('..');
const evaluate = factory({ operators, multipleParams: true, translateLogical: true });

const metadata = { a: 1, b: 2, c: 3 };
const basic = `not isEmpty("a") AND isEqual(a,b) OR isEqual(c,3)`;

const truly = [
  {
    operator: '!isEmpty',
    values: [{ type: 'string', value: '"lorem"' }],
    and: [
      {
        operator: 'isEqual',
        values: [
          { type: 'metadata', value: 'a' },
          { type: 'metadata', value: 'a' },
        ],
        or: [
          {
            operator: 'isEqual',
            values: [
              { type: 'string', value: '"e"' },
              { type: 'string', value: '"e"' },
            ],
          },
          {
            logical: '&&',
            operator: 'isEqual',
            values: [
              { type: 'metadata', value: 'b' },
              { type: 'metadata', value: 'b' },
            ],
          },
        ],
      },
    ],
  },
  {
    logical: '||',
    operator: 'isEqual',
    values: [
      { type: 'number', value: 3 },
      { type: 'metadata', value: 'c' },
    ],
  },
];

const falsy = [
  {
    operator: '!isEmpty',
    values: [{ type: 'string', value: '"lorem"' }],
    and: [
      {
        operator: 'isEqual',
        values: [
          { type: 'metadata', value: 'a' },
          { type: 'metadata', value: 'b' },
        ],
        or: [
          {
            operator: 'isEqual',
            values: [
              { type: 'string', value: '"e"' },
              { type: 'string', value: '"d"' },
            ],
          },
          {
            logical: '&&',
            operator: 'isEqual',
            values: [
              { type: 'metadata', value: 'b' },
              { type: 'metadata', value: 'e' },
            ],
          },
        ],
      },
    ],
  },
  {
    logical: '||',
    operator: 'isEqual',
    values: [
      { type: 'number', value: 5 },
      { type: 'metadata', value: 'c' },
    ],
  },
];

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
