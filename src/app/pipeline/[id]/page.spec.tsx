import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Pipeline from './page';

jest.mock('@/widgets/pipelineManager/ui', () => ({
  PipelineManager: () => (
    <div data-testid="manager" />
  ),
}));

describe('Pipeline', () => {
  it('should not render PipelineManager if id is not specified', () => {
    // @ts-expect-error wrong params by intention
    render(<Pipeline params={{}} />);
    const manager = screen.queryByTestId('manager');
    expect(manager).toBeNull();
  });

  it('should render PipelineManager', () => {
    render(<Pipeline params={{id: '1'}} />);
    const manager = screen.getByTestId('manager');
    expect(manager).toBeInTheDocument();
  });
});
