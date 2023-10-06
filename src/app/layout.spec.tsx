import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import RootLayout from './layout';

jest.mock('@/infra/providers', () => ({
  Providers: ({children}: {children: React.ReactNode}) => (
    <div data-testid="providers">
      {children}
    </div>
  ),
}));
jest.mock('@/widgets/Header');
jest.mock('@/widgets/Footer');

describe('RootLayout', () => {
  it('renders children wrapped in the Providers', () => {
    render(<RootLayout><div>My test</div></RootLayout>);

    const provider = screen.getByTestId('providers');
    expect(provider).toBeInTheDocument();

    const children = within(provider).getByText(/My test/);
    expect(children).toBeInTheDocument();
  });
});
