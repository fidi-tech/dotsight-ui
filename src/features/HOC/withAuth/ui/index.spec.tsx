import React from 'react';
import '@testing-library/jest-dom';
import {getCookie} from 'cookies-next';
import { render, screen } from '@testing-library/react';

import {withAuth} from '.';

const redirectMock = jest.fn(action => action);
jest.mock('cookies-next');
jest.mock('next/navigation', () => ({
  redirect: jest.fn(path => redirectMock(path)),
}))

const Component = () => <div data-testid="component" />

describe('HOC withAuth', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    jest.spyOn(React, 'useState').mockImplementation(() => [1, () => 1]);
  })
  it('must return component if token exists', () => {
    (getCookie as jest.MockedFn<any>).mockImplementation(() => 'token');
    const _component = withAuth(Component)({});
    expect(_component).not.toBeNull();
    render(_component!);
    const component = screen.getByTestId('component');
    expect(component).toBeInTheDocument();
  })
  it('must redirect to login page if token not exists', () => {
    (getCookie as jest.MockedFn<any>).mockImplementation(() => undefined);
    const _component = withAuth(Component)({});
    expect(_component).toBeNull();
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith('/login');
  })
})