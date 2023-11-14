import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {PipelinesList} from '.';

jest.mock('@/entities/pipeline/ui/pipelineListItem', () => ({
  PipelineListItem: ({id, name}: {id: string; name: string}) => (
    <div data-testid="pipeline-list-item" data-id={id} data-name={name} />
  ),
}));
jest.mock('react-redux', () => ({
  useSelector: (fn: Function) => fn(),
}));
jest.mock('@/entities/pipeline/model', () => ({
  selectAll: () => [
    {id: '1', name: 'n1'},
    {id: '2', name: 'n2'},
  ],
}));

describe('PipelinesList', () => {
  it('should render one PipelineListItem for each pipeline', () => {
    render(<PipelinesList />);

    const pipelineListItems = screen.queryAllByTestId('pipeline-list-item');
    expect(pipelineListItems.length).toEqual(2);
    expect(pipelineListItems[0]).toHaveAttribute('data-id', '1');
    expect(pipelineListItems[0]).toHaveAttribute('data-name', 'n1');
    expect(pipelineListItems[1]).toHaveAttribute('data-id', '2');
    expect(pipelineListItems[1]).toHaveAttribute('data-name', 'n2');
  });
});
