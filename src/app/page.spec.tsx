import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {fetchPipelines} from '@/entities/pipeline/model';
import Home from './page';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('@/entities/pipeline/model', () => ({
  fetchPipelines: () => ({fetchPipelines: true}),
}));
jest.mock('@/widgets/pipelinesList/ui', () => ({
  PipelinesList: () => (
    <div data-testid="pipelines" />
  ),
}));

describe('Home', () => {
  it('dispatches fetchPipelines on mount', () => {
    render(<Home />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(fetchPipelines());
  });

  it('renders PipelinesList', () => {
    render(<Home />);
    const pipelinesList = screen.getByTestId('pipelines');
    expect(pipelinesList).toBeInTheDocument();
  });
});
