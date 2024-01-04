import {renderHook} from '@testing-library/react';
import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import useEnhance from './widget';

jest.mock('@/features/widget/lib/useWidgetData', () => ({
  useWidgetData: jest.fn(),
}));

jest.mock('@/shared/ui/styles/palettes', () => ({
  getColorsFromPaletteByVariant: jest.fn(() => ['red', 'green', 'blue']),
}));

jest.mock('./utils', () => ({
  convertToLabel: (date: Date) => `${date.getTime()}`,
}))

describe('LineChart useEnhance', () => {
  it('should return error if error happened', () => {
    const error = new Error('42');
    const pipelineId = '42';
    const widgetId = '66';
    const parameters = {some: 'param'};
    const customization = {any: 'config', unit: 'usd'} as any;

    (useWidgetData as jest.MockedFn<any>).mockImplementation(() => ({data: null, isLoading: false, error}));

    const {result} = renderHook(() => useEnhance({pipelineId, widgetId, parameters, customization}));

    expect(result.current).toEqual({
      data: {
        datasets: [],
        labels: [],
      },
      error,
      isLoading: false,
    });
  });

  it('should return isLoading if the data is loading', () => {
    const pipelineId = '42';
    const widgetId = '66';
    const parameters = {some: 'param'};
    const customization = {any: 'config', unit: 'usd'} as any;

    (useWidgetData as jest.MockedFn<any>).mockImplementation(() => ({data: null, isLoading: true, error: null}));

    const {result} = renderHook(() => useEnhance({pipelineId, widgetId, parameters, customization}));

    expect(result.current).toEqual({
      data: {
        datasets: [],
        labels: [],
      },
      error: null,
      isLoading: true,
    });
  });

  it('should return the correct data', () => {
    const pipelineId = '42';
    const widgetId = '66';
    const parameters = {some: 'param'};
    const customization = {any: 'config', unit: 'usd'} as any;

    const data = {
      items: [{
        name: 'first',
        value: [{timestamp: 1, value: {usd: 1, eur: 2}}, {timestamp: 10, value: {usd: 1.5, eur: 3}}]
      }, {
        name: 'second',
        value: [{timestamp: 2, value: {usd: 10, eur: 20}}, {timestamp: 10, value: {usd: 15, eur: 30}}]
      }],
    };

    (useWidgetData as jest.MockedFn<any>).mockImplementation(() => ({data, isLoading: false, error: null}));

    const {result} = renderHook(() => useEnhance({pipelineId, widgetId, parameters, customization}));

    expect(result.current).toEqual({
      data: {
        datasets: [
          {
            backgroundColor: 'red',
            borderColor: 'red',
            data: [
              {x: "1000", y: 1},
              {x: "10000", y: 1.5},
            ],
            label: 'first',
          },
          {
            backgroundColor: 'green',
            borderColor: 'green',
            data: [
              {x: "2000", y: 10},
              {x: "10000", y: 15},
            ],
            label: 'second',
          },
        ],
        labels: [
          "1000",
          "10000",
          "2000",
        ],
      },
      error: null,
      isLoading: false,
    });
  });
});
