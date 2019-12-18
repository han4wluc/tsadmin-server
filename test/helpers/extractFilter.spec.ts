import { assert } from 'chai';
import 'mocha';

import extractFilter from '~/helpers/extractFilter';

describe('extractFilter', () => {
  it('should extract single condition', () => {
    const input = 'and(username:eq:han4wluc)';
    const expected = {
      operator: 'AND',
      conditions: [
        {
          fieldName: 'username',
          filter: 'eq',
          value: 'han4wluc',
        },
      ],
    };

    const actual = extractFilter(input);
    assert.deepEqual<object>(actual, expected);
  });

  it('should extract multiple conditions', () => {
    const input = 'and(username:eq:han4wluc,age:eq:10)';
    const expected = {
      operator: 'AND',
      conditions: [
        {
          fieldName: 'username',
          filter: 'eq',
          value: 'han4wluc',
        },
        {
          fieldName: 'age',
          filter: 'eq',
          value: '10',
        },
      ],
    };

    const actual = extractFilter(input);
    assert.deepEqual<object>(actual, expected);
  });

  it('should handle empty input', () => {
    const input = undefined;
    const expected = {
      operator: 'AND',
      conditions: [],
    };
    const actual = extractFilter(input);
    assert.deepEqual<object>(actual, expected);
  });
});
