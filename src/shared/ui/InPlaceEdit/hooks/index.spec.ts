import {act, renderHook} from '@testing-library/react';

import {useEnhance} from '.';

let mockOnSave = jest.fn(f => f);

describe('shared/ui/InPlaceEdit/hooks/index', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('provides spanRef', () => {
    const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
    expect(result.current.spanRef).toBeDefined();
  });
  it('provides inputRef', () => {
    const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
    expect(result.current.inputRef).toBeDefined();
  })
  it('provides content', () => {
    const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
    expect(result.current.content).toEqual('v1');
  })
  describe('handles content changing successfully', () => {
    it('provides startEditing function', () => {
      const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
      expect(result.current.startEditing).toEqual(expect.any(Function));
    });
    it('provides isEditing', () => {
      const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
      expect(result.current.isEditing).toBeFalsy();
    });
    it('handles start editing correctly', () => {
      const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
      act(() => {
        result.current.startEditing();
      })
      expect(result.current.isEditing).toBeTruthy();
    })
    it('handles value changing correctly', () => {
      const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
      act(() => {
        result.current.startEditing();
        // @ts-ignore
        result.current.onChange({target: {value: 'v2'}});
      })
      expect(result.current.content).toEqual('v2');
    })
    it('handles saving correctly', () => {
      const {result} = renderHook(() => useEnhance({value: 'v1', onSave: mockOnSave}));
      act(() => {
        result.current.startEditing();
        // @ts-ignore
        result.current.onChange({target: {value: 'v2'}});
      })
      act(() => {
        result.current.onConfirm();
      })
      expect(result.current.content).toEqual('v2');
      expect(result.current.isEditing).toBeFalsy();
      expect(mockOnSave).toHaveBeenCalledTimes(1);
      expect(mockOnSave).toHaveBeenCalledWith('v2');
    })
  })
});