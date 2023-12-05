import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import {selectAll} from '@/entities/pipeline/model';

import {PipelinesList} from '.';

jest.mock('@/entities/pipeline/ui/pipelineListItem', () => ({
  PipelineListItem: ({id, name}: {id: string; name: string}) => (
    <div data-testid="pipeline-list-item" data-id={id} data-name={name} />
  ),
}));
jest.mock('react-redux', () => ({
  useSelector: (fn: Function) => fn(),
}));
jest.mock('@/entities/pipeline/model');
jest.mock('@/shared/ui/icons', () => ({
  Icons: {EmptyPipe: jest.fn()}
}));

describe('PipelinesList', () => {
  beforeEach(() => {
    (selectAll as jest.MockedFn<any>).mockClear();
  })
  it('should render one PipelineListItem for each pipeline', () => {
    (selectAll as jest.MockedFn<any>).mockImplementation(() => [
      {id: '1', name: 'n1'},
      {id: '2', name: 'n2'},
    ]);
    render(<PipelinesList />);

    const pipelineListItems = screen.queryAllByTestId('pipeline-list-item');
    expect(pipelineListItems.length).toEqual(2);
    expect(pipelineListItems[0]).toHaveAttribute('data-id', '1');
    expect(pipelineListItems[0]).toHaveAttribute('data-name', 'n1');
    expect(pipelineListItems[1]).toHaveAttribute('data-id', '2');
    expect(pipelineListItems[1]).toHaveAttribute('data-name', 'n2');
    const emptyState = screen.queryByTestId('empty');
    expect(emptyState).not.toBeInTheDocument();
  });
  it('should render empty state without pipelines', () => {
    (selectAll as jest.MockedFn<any>).mockImplementation(() => []);
    render(<PipelinesList />);

    const emptyState = screen.getByTestId('empty');
    expect(emptyState).toBeInTheDocument();
  })
});
