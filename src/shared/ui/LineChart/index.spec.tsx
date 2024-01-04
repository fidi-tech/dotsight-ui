import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Line } from 'react-chartjs-2';
import {LineChart} from '.';

jest.mock('react-chartjs-2', () => ({
  Line: jest.fn(() => (
    <div data-testid="line" />
  )),
}));

describe('LineChart', () => {
  it('should render Line and pass the props', () => {
    const labels = 'labels' as any;
    const datasets = 'datasets' as any;
    render(<LineChart labels={labels} datasets={datasets} />);

    const line = screen.getByTestId('line');
    expect(line).toBeInTheDocument();

    expect(Line).toHaveBeenCalledWith(expect.objectContaining({data: {labels, datasets}}), expect.anything());
  });
});
