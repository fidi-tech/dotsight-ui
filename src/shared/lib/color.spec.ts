import {isHexColor} from './color';

describe('shared/lib/color', () => {
  it('isHexColor', () => {
    expect(isHexColor('#aabbcc')).toEqual(true);
    expect(isHexColor('#AABBCC')).toEqual(true);
    expect(isHexColor('#AABBC')).toEqual(false);
    expect(isHexColor('#AABBCCD')).toEqual(false);
    expect(isHexColor('#AABBGG')).toEqual(false);
  })
})
