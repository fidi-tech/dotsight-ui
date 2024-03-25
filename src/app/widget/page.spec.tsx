import '@testing-library/jest-dom';
import React from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';

import {selectAll} from '@/entities/category/model/selectors';
import {getCategoriesList} from '@/entities/category/model/providers/getCategoriesList';
import {createWidget} from '@/shared/api/dotsight';

import Widget from './page';

let mockDispatch = jest.fn(action => action);
let pushMock = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: pushMock,
    };
  },
}));
jest.mock('@/features/HOC/withAuth/ui', () => ({
  withAuth: (component: any) => component,
}));
jest.mock('@/features/mainLayout/ui', () => function MainLayout(props: any) { return props.children })
jest.mock('@/entities/category/model/selectors');
jest.mock('@/entities/category/model/providers/getCategoriesList', () => ({
  getCategoriesList: jest.fn(() => ({type: 'getCategoriesList'})),
}));
jest.mock('@/shared/api/dotsight', () => ({
  createWidget: jest.fn(() => ({id: 'widgetId'})),
}));

describe('Widget creation categories selector', () => {
  it('fires getCategoriesList', () => {
    (selectAll as jest.MockedFn<any>).mockImplementation(() => []);
    render(<Widget />);
    expect(mockDispatch).toHaveBeenCalledWith(getCategoriesList());
  })
  it('renders loader without categories', () => {
    (selectAll as jest.MockedFn<any>).mockImplementation(() => []);
    render(<Widget />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
  it('renders tiles with categories', () => {
    const CATEGORIES = [
      {id: '1', name: 'category1'},
      {id: '11', name: 'category11'},
      {id: '111', name: 'category111'},
    ];
    (selectAll as jest.MockedFn<any>).mockImplementation(() => CATEGORIES);
    render(<Widget />);
    CATEGORIES.forEach(category => {
      const tile = screen.getByTestId(`tile-${category.id}`);
      expect(tile).toBeInTheDocument();
    })
  });
  it('redirects on next step when tile selected', async () => {
    const CATEGORIES = [
      {id: '1', name: 'category1'},
      {id: '11', name: 'category11'},
      {id: '111', name: 'category111'},
    ];
    (selectAll as jest.MockedFn<any>).mockImplementation(() => CATEGORIES);
    render(<Widget />);
    const tile = screen.getByTestId('tile-1');
    act(() => {
      fireEvent.click(tile);
    });
    expect(createWidget).toHaveBeenCalledTimes(1);
    expect(createWidget).toHaveBeenCalledWith({category: '1', name: 'Untitled widget'});
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('/widget/widgetId');
    });
  })
});
