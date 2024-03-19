import {timestampToStartOfTheDay} from './date';

describe('shared/lib/date', () => {
  describe('timestampToStartOfTheDay', () => {
    it('works correct', () => {
      expect(timestampToStartOfTheDay(12345678)).toEqual(12344400);
      expect(timestampToStartOfTheDay(123456789)).toEqual(123454800);
      expect(timestampToStartOfTheDay(1234567890)).toEqual(1234558800);
    })
  });
})
