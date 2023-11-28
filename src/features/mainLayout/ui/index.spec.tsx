import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import MainLayout from '.';

jest.mock('@/widgets/Header', () => function Header() {return <div data-testid="header"/>});
jest.mock('@/widgets/Footer', () => function Footer() {return <div data-testid="footer"/>});

describe('RootLayout', () => {
  it('renders children wrapped in the Providers', () => {
    render(<MainLayout><div>My test</div></MainLayout>);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();

    const children = screen.getByText(/My test/);
    expect(children).toBeInTheDocument();
  });
});
