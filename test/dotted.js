const test = require('ava');
const { factory, operators } = require('../');
const evaluate = factory({ operators, multipleParams: true, translateLogical: true });

test('dotted condition', (t) => {
  const condition = {
    and: [
      {
        operator: 'sizeGreater',
        values: [
          {
            type: 'metadata',
            value: 'k.id',
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

  t.true(evaluate(condition, { 'k.id': [1, 2, 3, 4, 5, 6] }, { ciao: 'mamma' }));
});
