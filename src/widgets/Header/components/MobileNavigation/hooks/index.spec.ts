import {act, renderHook} from '@testing-library/react';

import {useEnhance} from '.';

describe('widgets/Header/components/MobileNavigation/hooks', () => {
  describe('returns', () => {
    it('isOpened', () => {
      const {result} = renderHook(() => useEnhance());
      expect(result.current.isOpened).toBeFalsy();
    });
    it('toggleIsOpened', () => {
      const {result} = renderHook(() => useEnhance());
      expect(result.current.toggleIsOpened).toEqual(expect.any(Function));
    });
    it('close', () => {
      const {result} = renderHook(() => useEnhance());
      expect(result.current.close).toEqual(expect.any(Function));
    });
  });
  describe('handles correctly', () => {
    it('toggleIsOpened', () => {
      const {result} = renderHook(() => useEnhance());
      act(() => {
        result.current.toggleIsOpened();
      })
      expect(result.current.isOpened).toBeTruthy();
    })
    it('close', () => {
      const {result} = renderHook(() => useEnhance());
      act(() => {
        result.current.toggleIsOpened();
      })
      expect(result.current.isOpened).toBeTruthy();
      act(() => {
        result.current.close();
      })
      expect(result.current.isOpened).toBeFalsy();
    })
  })
});
