import '@testing-library/jest-dom';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import {fetchPipelines} from '@/entities/pipeline/model';

import Home from './page';

let mockDispatch = jest.fn(action => action);
let createPipelineMock = jest.fn();

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
jest.mock('@/features/HOC/withAuth/ui', () => ({
  withAuth: (component: any) => component,
}));
jest.mock('@/features/mainLayout/ui', () => function MainLayout(props: any) { return props.children })
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));
jest.mock('@/shared/ui/icons', () => ({
  Icons: {Database: jest.fn()}
}));
jest.mock('@/shared/api/dotsight', () => ({
  createPipeline: jest.fn(() => createPipelineMock()),
}))

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

  it('call create api on click create button', () => {
    render(<Home />);
    const createButton = screen.getByTestId('create');
    fireEvent.click(createButton);
    expect(createPipelineMock).toHaveBeenCalledTimes(1);
  })
});
