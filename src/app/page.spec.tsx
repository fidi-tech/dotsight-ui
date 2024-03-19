import '@testing-library/jest-dom';
import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';

import Home from './page';

let pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));
jest.mock('@/shared/ui/icons', () => ({
  Icons: {Database: jest.fn()}
}));
jest.mock('@/features/HOC/withAuth/ui', () => ({
  withAuth: (component: any) => component,
}));
jest.mock('@/widgets/WidgetsList', () => ({
  WidgetsList: () => (
    <div data-testid="widgetsList" />
  ),
}));
jest.mock('@/features/mainLayout/ui', () => function MainLayout(props: any) { return props.children })
jest.mock('@/shared/ui/icons', () => ({
  Icons: {
    Tiles: jest.fn(),
    Database: jest.fn(),
    ChevronUp: jest.fn(),
  }
}));

describe('Home', () => {
  it('renders WidgetsList', () => {
    render(<Home />);
    const widgetsList = screen.getByTestId('widgetsList');
    expect(widgetsList).toBeInTheDocument();
  });

  it('redirects on click create button', () => {
    render(<Home />);
    const createButton = screen.getByTestId('create');
    act(() => {
      fireEvent.click(createButton);
    })
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/widget');
  })
});
