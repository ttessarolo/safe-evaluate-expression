const test = require('ava');
const { complexToBasic } = require('../');

const c10 = {
  and: [
    {
      or: [
        {
          and: [
            {
              operator: 'isEqual',
              values: [
                { type: 'string', value: 'dayOfTheWeek' },
                { type: 'string', value: '"Lun"' },
              ],
            },
            {
              and: [
                {
                  operator: 'isGreater',
                  values: [
                    { type: 'string', value: 'hourOfDay' },
                    { type: 'string', value: 10 },
                  ],
                },
                {
                  operator: 'isLess',
                  values: [
                    { type: 'string', value: 'hourOfDay' },
                    { type: 'string', value: 12 },
                  ],
                },
              ],
            },
          ],
        },
        {
          and: [
            {
              operator: 'isEqual',
              values: [
                { type: 'string', value: 'dayOfTheWeek' },
                { type: 'string', value: '"Ven"' },
              ],
            },
            {
              and: [
                {
                  operator: 'isGreater',
                  values: [
                    { type: 'string', value: 'hourOfDay' },
                    { type: 'string', value: 20 },
                  ],
                },
                {
                  operator: 'isLess',
                  values: [
                    { type: 'string', value: 'hourOfDay' },
                    { type: 'string', value: 23 },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      operator: 'isEqual',
      values: [
        { type: 'string', value: 'recommendable' },
        { type: 'string', value: true },
      ],
    },
  ],
};

const c12 = {
  and: [
    {
      operator: 'isEqual',
      values: [
        {
          value: '"k"',
          type: 'string',
        },
        {
          value: '"z"',
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
              value: '"a"',
              type: 'string',
            },
            {
              value: '"b"',
              type: 'string',
            },
          ],
        },
        {
          operator: 'isEqual',
          values: [
            {
              value: '"c"',
              type: 'string',
            },
            {
              value: '"d"',
              type: 'string',
            },
          ],
        },
        {
          operator: 'isEqual',
          values: [
            {
              value: '"e"',
              type: 'string',
            },
            {
              value: '"f"',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};

const b10 = `(((isEqual(dayOfTheWeek, "Lun") && (isGreater(hourOfDay, 10) && isLess(hourOfDay, 12))) || (isEqual(dayOfTheWeek, "Ven") && (isGreater(hourOfDay, 20) && isLess(hourOfDay, 23)))) && isEqual(recommendable, true))`;
const c11 = { and: [{ operator: '*' }] };
const b11 = `*`;
const b12 = `(isEqual("k", "z") && (!isEmpty("a", "b") || isEqual("c", "d") || isEqual("e", "f")))`;

test('test deep nested condition', (t) => {
  const result = complexToBasic(c10);
  console.log(JSON.stringify(result, null, 1));
  t.deepEqual(result, b10);
});

test('test always condition', (t) => {
  const result = complexToBasic(c11);
  t.deepEqual(result, b11);
});

test('test and or condition', (t) => {
  const result = complexToBasic(c12);
  t.deepEqual(result, b12);
});
