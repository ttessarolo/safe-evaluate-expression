const test = require('ava');
const { complexToBasic } = require('../');

const basic0 = '*';
const basic1 = `(!isEmpty("a"))`;
const basic2 = `(!isEmpty("a") && isEqual("c","d"))`;
const basic3 = `(!isEmpty("a") && (isEqual("c","d") || isEqual("e","f")))`;
const basic4 = `(!isEmpty("a") && (isEqual("c","d") || (isEqual("e","f") && isEqual("g","h"))) || isEqual("k","x"))`;

const c0 = [
  {
    operator: '*',
    values: [],
  },
];
const c1 = [
  {
    operator: '!isEmpty',
    values: [{ type: 'string', value: '"a"' }],
  },
];

const c2 = [
  {
    operator: '!isEmpty',
    values: [{ type: 'string', value: '"a"' }],
  },
  {
    logical: '&&',
    operator: 'isEqual',
    values: [
      { type: 'string', value: '"c"' },
      { type: 'string', value: '"d"' },
    ],
  },
];

const c3 = [
  {
    operator: '!isEmpty',
    values: [{ type: 'string', value: '"a"' }],
    and: [
      {
        operator: 'isEqual',
        values: [
          { type: 'string', value: '"c"' },
          { type: 'string', value: '"d"' },
        ],
      },
      {
        logical: '||',
        operator: 'isEqual',
        values: [
          { type: 'string', value: '"e"' },
          { type: 'string', value: '"f"' },
        ],
      },
    ],
  },
];

const c4 = [
  {
    operator: '!isEmpty',
    values: [{ type: 'string', value: '"a"' }],
    and: [
      {
        operator: 'isEqual',
        values: [
          { type: 'string', value: '"c"' },
          { type: 'string', value: '"d"' },
        ],
        or: [
          {
            operator: 'isEqual',
            values: [
              { type: 'string', value: '"e"' },
              { type: 'string', value: '"f"' },
            ],
          },
          {
            logical: '&&',
            operator: 'isEqual',
            values: [
              { type: 'string', value: '"g"' },
              { type: 'string', value: '"h"' },
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
      { type: 'string', value: '"k"' },
      { type: 'string', value: '"x"' },
    ],
  },
];

test('test always condition', (t) => {
  const result = complexToBasic(c0);
  t.deepEqual(result, basic0);
});

test('test basic condition', (t) => {
  const result = complexToBasic(c1);
  t.deepEqual(result, basic1);
});

test('test double basic condition', (t) => {
  const result = complexToBasic(c2);
  t.deepEqual(result, basic2);
});

test('test nested condition', (t) => {
  const result = complexToBasic(c3);
  t.deepEqual(result, basic3);
});

test('test deep nested condition', (t) => {
  const result = complexToBasic(c4);
  t.deepEqual(result, basic4);
});
