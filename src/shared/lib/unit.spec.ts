import {getAbsoluteMetricValue} from '@/shared/lib/unit';

describe('getAbsoluteMetricValue', () => {
  it('should return the number if value is number', () => {
    expect(getAbsoluteMetricValue(45)).toEqual(45);
  });
  it('should return number by unit', () => {
    expect(getAbsoluteMetricValue({otherUnit: 10, someUnit: 11}, 'someUnit')).toEqual(11);
  });
  it('should return first value if unit is omitted', () => {
    expect(getAbsoluteMetricValue({otherUnit: 10, someUnit: 11})).toEqual(10);
  });
});
