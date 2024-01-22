import {useWidgetData} from '@/features/widget/lib/useWidgetData';

import useEnhance from './widget';

jest.mock('@/features/widget/lib/useWidgetData');

describe('features/widget/ui/nftGrid/hooks/widget useEnhance', () => {
  it('calling useWidgetData with correct props', () => {
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({}));
    useEnhance({
      pipelineId: '42',
      widgetId: '2',
      parameters: {walletIds: ['0x123']},
      customization: {unit: 'x'},
    });
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
      parameters: {walletIds: ['0x123']},
      customization: {unit: 'x'},
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
      parameters: {walletIds: ['0x123']},
      customization: {unit: 'x'},
    }).error).toEqual({code: '404'});
  });

  describe('should return data', () => {
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
      data: {
        items: [
          {any: 'value'},
        ],
      },
    }));
    expect(useEnhance({
      pipelineId: '42',
      widgetId: '2',
      parameters: {walletIds: ['0x123']},
      customization: {unit: 'x'},
    }).data).toEqual({
      items: [
        {any: 'value'},
      ],
    });
  });
});
