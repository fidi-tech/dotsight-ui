import '@testing-library/jest-dom';
import React from 'react';
import {render, screen} from '@testing-library/react';
import useEnhance from '../hooks/widget';
import Placeholder from '../placeholder';
import {LineChart as LineChartComponent} from '@/shared/ui/LineChart';
import LineChart from '.';

jest.mock('../hooks/widget', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../placeholder', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="placeholder" />),
}));

jest.mock('@/shared/ui/LineChart', () => ({
  LineChart: jest.fn(() => <div data-testid="line-chart" />),
}));

describe('LineChart widget', () => {
  it('should render default placeholder if there is no data', () => {
    (useEnhance as jest.MockedFn<any>).mockImplementation(() => ({data: null, isLoading: false, error: null}));

    const props = {prop1: '1', prop2: 2} as any;
    render(<LineChart {...props} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();

    expect(useEnhance).toHaveBeenCalledWith(props);
    expect(Placeholder).toHaveBeenCalledWith(expect.objectContaining({isLoading: false, isError: false}), expect.anything());
  });

  it('should render error placeholder if there is an error', () => {
    (useEnhance as jest.MockedFn<any>).mockImplementation(() => ({data: null, isLoading: false, error: new Error()}));

    const props = {prop1: '1', prop2: 2} as any;
    render(<LineChart {...props} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();

    expect(useEnhance).toHaveBeenCalledWith(props);
    expect(Placeholder).toHaveBeenCalledWith(expect.objectContaining({isLoading: false, isError: true}), expect.anything());
  });

  it('should render loading placeholder if data is loading', () => {
    (useEnhance as jest.MockedFn<any>).mockImplementation(() => ({data: null, isLoading: true, error: null}));

    const props = {prop1: '1', prop2: 2} as any;
    render(<LineChart {...props} />);

    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();

    expect(useEnhance).toHaveBeenCalledWith(props);
    expect(Placeholder).toHaveBeenCalledWith(expect.objectContaining({isLoading: true, isError: false}), expect.anything());
  });

  it('should render LineChart if there is data', () => {
    const data = {labels: 'labels', datasets: 'datasets'};
    (useEnhance as jest.MockedFn<any>).mockImplementation(() => ({data, isLoading: false, error: null}));

    const props = {prop1: '1', prop2: 2} as any;
    render(<LineChart {...props} />);

    const chart = screen.getByTestId('line-chart');
    expect(chart).toBeInTheDocument();

    expect(useEnhance).toHaveBeenCalledWith(props);
    expect(LineChartComponent).toHaveBeenCalledWith(expect.objectContaining(data), expect.anything());
  });
});
