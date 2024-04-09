import {act, renderHook} from '@testing-library/react';

import {useEnhance} from '.';

const onChange = jest.fn(a => a);

describe('shared/ui/Switch/hooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('provides', () => {
    it('onChange', () => {
      const {result} = renderHook(() => useEnhance({
        initial: true,
      }));
      expect(result.current.onChange).toEqual(expect.any(Function));
    });
    describe('isChecked', () => {
      it('with initial true', () => {
        const {result} = renderHook(() => useEnhance({
          initial: true
        }));
        expect(result.current.isChecked).toBeTruthy();
      })
      it('with initial false', () => {
        const {result} = renderHook(() => useEnhance({
          initial: false
        }));
        expect(result.current.isChecked).toBeFalsy();
      })
    });
  })
  describe('onChange works correct', () => {
    it('by default', () => {
      const {result} = renderHook(() => useEnhance({
        initial: false,
        onChange,
      }));
      act(() => {
        result.current.onChange();
      });
      expect(result.current.isChecked).toBeTruthy();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    })
    it('if controllable', () => {
      const {result} = renderHook(() => useEnhance({
        initial: false,
        controllable: true,
        onChange,
      }));
      act(() => {
        result.current.onChange();
      });
      expect(result.current.isChecked).toBeFalsy();
      expect(onChange).toHaveBeenCalledTimes(0);
    })
  })
})