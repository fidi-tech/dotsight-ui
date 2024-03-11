import {pluralize} from './string';

describe('shared/lib/string', () => {
  describe('pluralize', () => {
    it('works correct', () => {
      expect(pluralize(2, 'car')).toEqual('cars');
      expect(pluralize(1, 'car')).toEqual('car');
      expect(pluralize(1, 'car', '-s')).toEqual('car');
      expect(pluralize(2, 'car', '-s')).toEqual('car-s');
    })
  });
})
