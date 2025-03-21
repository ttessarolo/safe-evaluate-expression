const test = require('ava');
const { factory, operators } = require('../');
const evaluate = factory({ operators, multipleParams: true, translateLogical: true });

const metadata = {
  x: 1.1,
  y: 2,
  now: '2020-11-07T23:00:00.000Zรท2020-11-14T22:59:59.000Z',
};
const list = { k: 3, z: 4 };
const map = new Map([['pi', 3.14]]);

const expression1 = 'isLower(x,z)';
const expression2 = 'isLower(k,y)';
const expression3 = 'isLower(notDefined,z)'; // put a not defined value
const expression4 = {
  and: [
    { operator: '!isEmpty', values: [{ type: 'string', value: '"lorem"' }] },
    {
      or: [
        {
          operator: 'isEqual',
          values: [
            { type: 'string', value: 'a' },
            { type: 'string', value: 'a' },
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

const expression5 = {
  and: [
    {
      operator: '*',
      values: [
        {
          type: 'metadata',
          value: '',
        },
        {
          type: '',
          value: '',
        },
      ],
      id: 'Bg8NiI52KJ',
    },
  ],
};

test('expression *', (t) => t.true(evaluate(expression5, metadata, list)));
test('expression1', (t) => t.true(evaluate(expression1, metadata, list)));
test('expression1 OR expression2', (t) =>
  t.true(evaluate(`${expression1} OR ${expression2}`, metadata, list)));

test('expression2', (t) => t.false(evaluate(expression2, metadata, list)));
test('expression1 AND expression2', (t) =>
  t.false(evaluate(`${expression1} AND ${expression2}`, metadata, list)));
test('expression3', (t) => t.false(evaluate(expression3, metadata, list)));
test('expression3 AND expression2', (t) =>
  t.false(evaluate(`${expression3} AND ${expression2}`, metadata, list)));
test('isLower(x,z) AND isLower(k,y) OR (isLower(z,P) AND NOT isLower(P,k)))', (t) =>
  t.false(
    evaluate(
      `(isLower(x,z) AND isLower(k,y) OR (isLower(z,P) AND NOT isLower(P,k)))`,
      metadata,
      list,
    ),
  ));
test(`isLower(z,pi)`, (t) => t.false(evaluate(`isLower(z,pi)`, metadata, list, map)));

test(`complex string`, (t) =>
  t.true(evaluate(`isEqual(now, "2020-11-07T23:00:00.000Zรท2020-11-14T22:59:59.000Z")`, metadata)));

test('expression complex', (t) => t.true(evaluate(expression4, metadata, list)));

test('includes with trail', (t) => {
  const condition = {
    and: [
      {
        operator: 'includes',
        values: [
          { type: 'string', value: 'social-all' },
          { type: 'string', value: '"a"' },
        ],
      },
    ],
  };

  t.true(evaluate(condition, { 'social-all': '["a"]' }, { ciao: 'mamma' }));
});

test('includes with mulit-trail', (t) => {
  const condition = {
    and: [
      {
        operator: 'includes',
        values: [
          { type: 'string', value: 'social-news-all' },
          { type: 'string', value: '"a"' },
        ],
      },
    ],
  };

  t.true(evaluate(condition, { 'social-news-all': '["a"]' }, { ciao: 'mamma' }));
});

test('dotted condition', (t) => {
  const condition = {
    and: [
      {
        operator: 'sizeGreater',
        values: [
          {
            type: 'metadata',
            value: 'k',
          },
          {
            value: '"4"',
            type: 'number',
          },
        ],
        id: '2xSC4zIAh-',
      },
    ],
  };

  t.true(evaluate(condition, { k: [1, 2, 3, 4, 5, 6] }, { ciao: 'mamma' }));
});
