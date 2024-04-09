import {act, renderHook} from '@testing-library/react';

import {copyToClipboard} from '@/shared/lib/clipboard';

jest.mock('@/shared/lib/clipboard', () => ({
  copyToClipboard: jest.fn(() => true),
}));

import {useEnhance} from '.';

describe('shared/ui/Copyable/hooks', () => {
  describe('provides', () => {
    it('onCopy', () => {
      const {result} = renderHook(() => useEnhance({value: 'some text'}));
      expect(result.current.onCopy).toEqual(expect.any(Function));
    });
    it('copyTooltipId', () => {
      const {result} = renderHook(() => useEnhance({value: 'some text'}));
      expect(result.current.copyTooltipId).toEqual('copy-tooltip');
    });
    it('copyTooltip', () => {
      const {result} = renderHook(() => useEnhance({value: 'some text'}));
      expect(result.current.copyTooltip).toEqual({
        ['data-tooltip-id']: 'copy-tooltip',
      });
    });
    it('tooltipContent', () => {
      const {result} = renderHook(() => useEnhance({value: 'some text'}));
      expect(result.current.tooltipContent).toEqual(expect.any(Function));
      expect(result.current.tooltipContent()).toEqual('Copy');
    })
  })
  describe('onCopy works correct', () => {
    it('by default', async () => {
      const {result} = renderHook(() => useEnhance({value: 'some text'}));
      act(() => {
        result.current.onCopy({stopPropagation: jest.fn(() => true)} as any);
      })
      await act(async () => {
        expect(result.current.tooltipContent()).toEqual('Copied');
        await new Promise((r) => setTimeout(r, 1209));
      })
      expect(result.current.tooltipContent()).toEqual('Copy');
      expect(copyToClipboard).toHaveBeenCalledTimes(1);
      expect(copyToClipboard).toHaveBeenCalledWith('some text');
    })
  })
})