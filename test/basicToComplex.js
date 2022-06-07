const test = require('ava');
const cleaner = require('deep-cleaner');
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
const basic8 = 'condition (equals(, ))';
const basic9 =
  'dateRange(when_now, "2021-01-31T23:00:00.000Z÷2021-02-02T22:59:59.000Z") AND not equals(id_series_se, "SE000000000025") AND not equals(id_series_se, "SE000000000926") AND greaterEqualThan(when_current_hour, "9") AND lessEqualThan(when_current_hour, "11") OR dateRange(when_now, "2021-01-31T23:00:00.000Z÷2021-02-03T22:59:59.000Z") AND not equals(id_series_se, "SE000000000025") AND not equals(id_series_se, "SE000000000926") AND greaterEqualThan(when_current_hour, "20") AND lessEqualThan(when_current_hour, "21")';

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

const c8 = {
  and: [
    {
      operator: 'condition',
      values: [
        { value: '', type: 'string' },
        { value: '', type: 'string' },
      ],
    },
  ],
};

const c9 = {
  and: [
    {
      operator: 'dateRange',
      values: [
        { value: 'when_now', type: 'metadata' },
        { value: '2021-01-31T23:00:00.000Z÷2021-02-02T22:59:59.000Z', type: 'string' },
      ],
    },
    {
      operator: '!equals',
      values: [
        { value: 'id_series_se', type: 'metadata' },
        { value: 'SE000000000025', type: 'string' },
      ],
    },
    {
      operator: '!equals',
      values: [
        { value: 'id_series_se', type: 'metadata' },
        { value: 'SE000000000926', type: 'string' },
      ],
    },
    {
      operator: 'greaterEqualThan',
      values: [
        { value: 'when_current_hour', type: 'metadata' },
        { value: '9', type: 'date' },
      ],
    },
    {
      operator: '!equals',
      values: [
        { value: 'id_series_se', type: 'metadata' },
        { value: 'SE000000000025', type: 'string' },
      ],
    },
    {
      operator: '!equals',
      values: [
        { value: 'id_series_se', type: 'metadata' },
        { value: 'SE000000000926', type: 'string' },
      ],
    },
    {
      operator: 'greaterEqualThan',
      values: [
        { value: 'when_current_hour', type: 'metadata' },
        { value: '20', type: 'string' },
      ],
    },
    {
      operator: 'lessEqualThan',
      values: [
        { value: 'when_current_hour', type: 'metadata' },
        { value: '21', type: 'string' },
      ],
    },
    {
      or: [
        {
          operator: 'lessEqualThan',
          values: [
            { value: 'when_current_hour', type: 'metadata' },
            { value: '11', type: 'date' },
          ],
        },
        {
          operator: 'dateRange',
          values: [
            { value: 'when_now', type: 'metadata' },
            { value: '2021-01-31T23:00:00.000Z÷2021-02-03T22:59:59.000Z', type: 'string' },
          ],
        },
      ],
    },
  ],
};

test('test and or condition', (t) => {
  const result = cleaner(basicToComplex(basic3), ['id']);
  t.deepEqual(result, c3);
});

test('test and or alternate condition', (t) => {
  const result = cleaner(basicToComplex(basic6), ['id']);
  t.deepEqual(result, c6);
});

test('test or condition', (t) => {
  const result = cleaner(basicToComplex(basic4), ['id']);
  t.deepEqual(result, c4);
});

test('test and condition', (t) => {
  const result = cleaner(basicToComplex(basic5), ['id']);
  t.deepEqual(result, c5);
});

test('test always condition', (t) => {
  const result = cleaner(basicToComplex(basic0), ['id']);
  t.deepEqual(result, c0);
});

test('test basic condition', (t) => {
  const result = cleaner(basicToComplex(basic1), ['id']);
  t.deepEqual(result, c1);
});

test('test basic and condition', (t) => {
  const result = cleaner(basicToComplex(basic2), ['id']);
  t.deepEqual(result, c2);
});

test('test basic7', (t) => {
  const result = cleaner(basicToComplex(basic7), ['id']);
  t.deepEqual(result, c7);
});

test('test basic8', (t) => {
  const result = cleaner(basicToComplex(basic8), ['id']);
  t.deepEqual(result, c8);
});

test('test basic9', (t) => {
  const result = cleaner(basicToComplex(basic9), ['id']);
  t.deepEqual(result, c9);
});
