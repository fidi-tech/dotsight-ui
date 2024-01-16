import React from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';

import useEnhance from './widget';

jest.mock('react', () => ({
  useMemo: jest.fn((fn: any) => fn()),
}));
jest.mock('@/features/widget/lib/useWidgetData');

describe('features/widget/ui/statistics/hooks/widget useEnhance', () => {
  beforeEach(() => {
    React.useState = jest.fn().mockImplementation((a) => [a, () => a]);
  })
  it('calling useWidgetData with correct props', () => {
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({}));
    useEnhance({
      pipelineId: '42',
      widgetId: '2',
      parameters: {dAppId: '123'},
      customization: {unit: 'x'},
    }, {ranges: ['1r', '2r']});
    expect(useWidgetData).toHaveBeenCalledTimes(1);
    expect(useWidgetData).toHaveBeenCalledWith({
      pipelineId: '42',
      widgetId: '2',
      params: {
        dAppId: '123',
        range: '1r',
      },
    });
  });
  it('should return correct isLoading prop', () => {
    const props = {
      pipelineId: '42',
      widgetId: '2',
      parameters: {dAppId: '123'},
      customization: {unit: 'x'},
    };
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
      isLoading: true,
    }));
    expect(useEnhance(props, {ranges: ['1r', '2r']}).isLoading).toEqual(true);
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
      isLoading: false,
    }));
    expect(useEnhance(props, {ranges: ['1r', '2r']}).isLoading).toEqual(false);
  });

  it('should return correct error prop', () => {
    (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
      error: {code: '404'},
    }));
    expect(useEnhance(
      {
        pipelineId: '42',
        widgetId: '2',
        parameters: {dAppId: '123'},
        customization: {unit: 'x'},
      },
      {ranges: ['1r', '2r']}
    ).error).toEqual({code: '404'});
  });

  describe('should correctly handle', () => {
    beforeEach(() => {
      (useWidgetData as any as jest.MockedFn<any>).mockImplementation(() => ({
        data: {
          stats: [
            {stat: 'stat1', value: 11, change: 1},
            {stat: 'stat2', value: {usd: 22}, change: 2},
          ],
          name: 'Name',
          logoUrl: 'LogoUrl',
        },
      }));
    });
    it('stats', () => {
      expect(useEnhance(
        {
          pipelineId: '42',
          widgetId: '2',
          parameters: {dAppId: '123'},
          customization: {unit: 'usd'},
        },
        {ranges: ['1r', '2r']}
      ).data).toEqual({
        name: 'Name',
        logoUrl: 'LogoUrl',
        stats: [
          {
            stat: 'stat1',
            value: '11',
            change: 1,
          },
          {
            stat: 'stat2',
            value: CURRENCY_FORMATTER['usd'].format(22),
            change: 2,
          },
        ]
      });
    });
  });
});
