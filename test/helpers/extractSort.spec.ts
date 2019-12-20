import { assert } from 'chai';
import 'mocha';

import extractSort from '~/helpers/extractSort';

describe('extractSort', () => {
  it('should extract single condition', () => {
    const input = 'id:desc,username:asc';
    const expected = [
      {
        column: 'id',
        order: 'desc',
      },
      {
        column: 'username',
        order: 'asc',
      },
    ];

    const actual = extractSort(input);
    assert.deepEqual<object>(actual, expected);
  });
});
