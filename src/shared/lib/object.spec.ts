import {pick, omit} from './object';

describe('shared/lib/object', () => {
  describe('pick', () => {
    it('works correct', () => {
      expect(pick({a: 1, b: 2}, ['a'])).toEqual({a: 1});
      expect(pick({a: 1, b: 2, c: 3}, ['a', 'c'])).toEqual({a: 1, c: 3});
      expect(pick({a: 1, b: 2}, [])).toEqual({});
    })
  });
  describe('omit', () => {
    it('works correct', () => {
      expect(omit({a: 1, b: 2, c: 3}, ['a'])).toEqual({b: 2, c: 3});
      expect(omit({a: 1, b: 2, c: 3}, ['a', 'c'])).toEqual({b: 2});
      expect(omit({a: 1, b: 2}, [])).toEqual({a: 1, b: 2});
    });
  })
})
