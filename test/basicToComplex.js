const test = require('ava');
const { basicToComplex } = require('../');

const basic0 = `*`;
const basic1 = `not isEmpty("a","b")`;
const basic2 = `not isEmpty("a","b") AND isEqual("c","d")`;
const basic3 = `not isEmpty("a","b") OR isEqual("c","d") OR isEqual("e","f") AND isEqual("k","z")`;
const basic4 = `not isEmpty("a","b") OR isEqual("c","d") OR isEqual("e","f") OR isEqual("k","z")`;
const basic5 = `not isEmpty("a","b") AND isEqual("c","d") AND isEqual("e","f") AND isEqual("k","z")`;
const basic6 = `not isEmpty("a","b") AND isEqual("c","d") OR isEqual("e","f") AND isEqual("k","z")`;
const basic7 =
  'equals(context_device, "desktop") OR equals(context_device, "tablet") AND equals(when_day_of_the_week, "Tuesday") AND greaterThan(now, "21") AND lessThan(now, "23")';

const c3 = {
  and: [
    {
      operator: 'isEqual',
      values: [
        {
          value: 'k',
          type: 'string',
        },
        {
          value: 'z',
          type: 'string',
        },
      ],
    },
    {
      or: [
        {
          operator: '!isEmpty',
          values: [
            {
              value: 'a',
              type: 'string',
            },
            {
              value: 'b',
              type: 'string',
            },
          ],
        },
        {
          operator: 'isEqual',
          values: [
            {
              value: 'c',
              type: 'string',
            },
            {
              value: 'd',
              type: 'string',
            },
          ],
        },
        {
          operator: 'isEqual',
          values: [
            {
              value: 'e',
              type: 'string',
            },
            {
              value: 'f',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};

const c6 = {
  and: [
    {
      operator: '!isEmpty',
      values: [
        {
          value: 'a',
          type: 'string',
        },
        {
          value: 'b',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'k',
          type: 'string',
        },
        {
          value: 'z',
          type: 'string',
        },
      ],
    },
    {
      or: [
        {
          operator: 'isEqual',
          values: [
            {
              value: 'c',
              type: 'string',
            },
            {
              value: 'd',
              type: 'string',
            },
          ],
        },
        {
          operator: 'isEqual',
          values: [
            {
              value: 'e',
              type: 'string',
            },
            {
              value: 'f',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};

const c4 = {
  or: [
    {
      operator: '!isEmpty',
      values: [
        {
          value: 'a',
          type: 'string',
        },
        {
          value: 'b',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'c',
          type: 'string',
        },
        {
          value: 'd',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'e',
          type: 'string',
        },
        {
          value: 'f',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'k',
          type: 'string',
        },
        {
          value: 'z',
          type: 'string',
        },
      ],
    },
  ],
};

const c5 = {
  and: [
    {
      operator: '!isEmpty',
      values: [
        {
          value: 'a',
          type: 'string',
        },
        {
          value: 'b',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'c',
          type: 'string',
        },
        {
          value: 'd',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'e',
          type: 'string',
        },
        {
          value: 'f',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'k',
          type: 'string',
        },
        {
          value: 'z',
          type: 'string',
        },
      ],
    },
  ],
};
const c0 = { and: [{ operator: '*', values: [] }] };

const c1 = {
  and: [
    {
      operator: '!isEmpty',
      values: [
        {
          value: 'a',
          type: 'string',
        },
        {
          value: 'b',
          type: 'string',
        },
      ],
    },
  ],
};

const c2 = {
  and: [
    {
      operator: '!isEmpty',
      values: [
        {
          value: 'a',
          type: 'string',
        },
        {
          value: 'b',
          type: 'string',
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        {
          value: 'c',
          type: 'string',
        },
        {
          value: 'd',
          type: 'string',
        },
      ],
    },
  ],
};

const c7 = {
  and: [
    {
      operator: 'equals',
      values: [
        {
          value: 'when_day_of_the_week',
          type: 'metadata',
        },
        {
          value: 'Tuesday',
          type: 'string',
        },
      ],
    },
    {
      operator: 'greaterThan',
      values: [
        {
          value: 'now',
          type: 'metadata',
        },
        {
          value: '21',
          type: 'string',
        },
      ],
    },
    {
      operator: 'lessThan',
      values: [
        {
          value: 'now',
          type: 'metadata',
        },
        {
          value: '23',
          type: 'string',
        },
      ],
    },
    {
      or: [
        {
          operator: 'equals',
          values: [
            {
              value: 'context_device',
              type: 'metadata',
            },
            {
              value: 'desktop',
              type: 'string',
            },
          ],
        },
        {
          operator: 'equals',
          values: [
            {
              value: 'context_device',
              type: 'metadata',
            },
            {
              value: 'tablet',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};

test('test and or condition', (t) => {
  const result = basicToComplex(basic3);
  t.deepEqual(result, c3);
});

test('test and or alternate condition', (t) => {
  const result = basicToComplex(basic6);
  t.deepEqual(result, c6);
});

test('test or condition', (t) => {
  const result = basicToComplex(basic4);
  t.deepEqual(result, c4);
});

test('test and condition', (t) => {
  const result = basicToComplex(basic5);
  t.deepEqual(result, c5);
});

test('test always condition', (t) => {
  const result = basicToComplex(basic0);
  t.deepEqual(result, c0);
});

test('test basic condition', (t) => {
  const result = basicToComplex(basic1);
  t.deepEqual(result, c1);
});

test('test basic and condition', (t) => {
  const result = basicToComplex(basic2);
  t.deepEqual(result, c2);
});

test('test basic7', (t) => {
  const result = basicToComplex(basic7);
  t.deepEqual(result, c7);
});
