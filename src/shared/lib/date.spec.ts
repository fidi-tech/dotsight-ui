import {timestampToStartOfTheDay} from './date';

describe('shared/lib/date', () => {
  describe('timestampToStartOfTheDay', () => {
    it('works correct', () => {
      expect(timestampToStartOfTheDay(12345678)).toEqual(12268800);
      expect(timestampToStartOfTheDay(123456789)).toEqual(123379200);
      expect(timestampToStartOfTheDay(1234567890)).toEqual(1234558800);
    })
  });
})
