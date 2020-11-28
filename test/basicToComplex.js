const test = require('ava');
const { basicToComplex } = require('../');

const basic0 = `*`;
const basic1 = `not isEmpty("a","b")`;
const basic2 = `not isEmpty("a","b") AND isEqual("c","d")`;
const basic3 = `not isEmpty("a","b") AND isEqual("c","d") OR isEqual("e","f")`;

const c0 = [
  {
    operator: '*',
    values: [],
  },
];

const c1 = [
  {
    logical: undefined,
    operator: '!isEmpty',
    values: [
      { type: 'string', value: '"a"' },
      { type: 'string', value: '"b"' },
    ],
  },
];

const c2 = [
  {
    logical: undefined,
    operator: '!isEmpty',
    values: [
      { type: 'string', value: '"a"' },
      { type: 'string', value: '"b"' },
    ],
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
    logical: undefined,
    operator: '!isEmpty',
    values: [
      { type: 'string', value: '"a"' },
      { type: 'string', value: '"b"' },
    ],
  },
  {
    logical: '&&',
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
];

test('test always condition', (t) => {
  const result = basicToComplex(basic0);
  t.deepEqual(result, c0);
});

test('test basic condition', (t) => {
  const result = basicToComplex(basic1);
  t.deepEqual(result, c1);
});

test('test and condition', (t) => {
  const result = basicToComplex(basic2);
  t.deepEqual(result, c2);
});

test('test and or condition', (t) => {
  const result = basicToComplex(basic3);
  t.deepEqual(result, c3);
});
