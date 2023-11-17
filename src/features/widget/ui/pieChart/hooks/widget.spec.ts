import {useWidgetData} from '@/features/widget/lib/useWidgetData';

import useEnhance from './widget';

jest.mock('react', () => ({
  useMemo: jest.fn((fn: any) => fn()),
}));
jest.mock('@/features/widget/lib/useWidgetData');

describe('features/widget/ui/pieChart/hooks/widget useEnhance', () => {
  it('calling useWidgetData with correct props', () => {
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({}));
    useEnhance({
      pipelineId: '42',
      widgetId: '2',
      parameters: {walletId: '0x123'},
      customization: {order: 'ASC', palette: ['a', 'b'], count: 2, unit: 'x'},
    });
    expect(useWidgetData).toHaveBeenCalledTimes(1);
    expect(useWidgetData).toHaveBeenCalledWith({
      pipelineId: '42',
      widgetId: '2',
      params: {
        walletIds: ['0x123'],
      },
    });
  });
  it('should return correct isLoading prop', () => {
    const props = {
      pipelineId: '42',
      widgetId: '2',
      parameters: {walletId: '0x123'},
      customization: {order: 'ASC' as const, palette: ['a', 'b'], count: 2, unit: 'x'},
    };
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
      isLoading: true,
    }));
    expect(useEnhance(props).isLoading).toEqual(true);
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
      isLoading: false,
    }));
    expect(useEnhance(props).isLoading).toEqual(false);
  });

  it('should return correct error prop', () => {
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
      error: {code: '404'},
    }));
    expect(useEnhance({
      pipelineId: '42',
      widgetId: '2',
      parameters: {walletId: '0x123'},
      customization: {order: 'ASC', palette: ['a', 'b'], count: 2, unit: 'x'},
    }).error).toEqual({code: '404'});
  });

  describe('should omit items', () => {
    it('with zero and negative value', () => {
      (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
        data: {
          items: [
            {name: 'n1', value: 1},
            {name: 'n3', value: -2},
            {name: 'n2', value: 0},
            {name: 'n4', value: 4},
            {name: 'n5', value: 5},
          ],
        },
      }));
      expect(useEnhance({
        pipelineId: '42',
        widgetId: '2',
        parameters: {walletId: '0x123'},
        customization: {order: 'ASC', palette: ['a', 'b'], count: 2, unit: 'x'},
      }).data).toEqual([
        {name: 'n1', value: 1, color: 'a'},
        {name: 'n4', value: 4, color: 'b'},
      ]);
    });
    it('with undefined value', () => {
      (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
        data: {
          items: [
            {name: 'n1', value: 1},
            {name: 'n3'},
            {name: 'n2', value: 2},
            {name: 'n4', value: 4},
            {name: 'n5', value: 5},
          ],
        },
      }));
      expect(useEnhance({
        pipelineId: '42',
        widgetId: '2',
        parameters: {walletId: '0x123'},
        customization: {order: 'ASC', palette: ['a', 'b', 'c'], count: 3, unit: 'x'},
      }).data).toEqual([
        {name: 'n1', value: 1, color: 'a'},
        {name: 'n2', value: 2, color: 'b'},
        {name: 'n4', value: 4, color: 'c'},
      ]);
    });
  });

  describe('should correctly handle', () => {
    beforeEach(() => {
      (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
        data: {
          items: [
            {name: 'n1', value: 1},
            {name: 'n3', value: 3},
            {name: 'n2', value: 2},
          ],
        },
      }));
    });
    it('customization order', () => {
      expect(useEnhance({
        pipelineId: '42',
        widgetId: '2',
        parameters: {walletId: '0x123'},
        customization: {order: 'ASC', palette: ['a', 'b', 'c'], count: 3, unit: 'x'},
      }).data).toEqual([
        {name: 'n1', value: 1, color: 'a'},
        {name: 'n2', value: 2, color: 'b'},
        {name: 'n3', value: 3, color: 'c'},
      ]);
      expect(useEnhance({
        pipelineId: '42',
        widgetId: '2',
        parameters: {walletId: '0x123'},
        customization: {order: 'DESC', palette: ['a', 'b', 'c'], count: 3, unit: 'x'},
      }).data).toEqual([
        {name: 'n3', value: 3, color: 'a'},
        {name: 'n2', value: 2, color: 'b'},
        {name: 'n1', value: 1, color: 'c'},
      ]);
    });
    it('customization count', () => {
      expect(useEnhance({
        pipelineId: '42',
        widgetId: '2',
        parameters: {walletId: '0x123'},
        customization: {order: 'ASC', palette: ['a', 'b'], count: 2, unit: 'x'},
      }).data?.length).toEqual(2);
      expect(useEnhance({
        pipelineId: '42',
        widgetId: '2',
        parameters: {walletId: '0x123'},
        customization: {order: 'DESC', palette: ['a'], count: 1, unit: 'x'},
      }).data?.length).toEqual(1);
    });
  });
});
