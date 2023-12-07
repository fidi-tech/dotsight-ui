import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Pipeline from './page';

jest.mock('@/widgets/pipelineManager/ui', () => ({
  PipelineManager: () => (
    <div data-testid="manager" />
  ),
}));
jest.mock('@/features/HOC/withAuth/ui', () => ({
  withAuth: (component: any) => component,
}));
jest.mock('@/features/mainLayout/ui', () => function MainLayout(props: any) { return props.children })

describe('Pipeline', () => {
  it('should not render PipelineManager if id is not specified', () => {
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
