import '@testing-library/jest-dom';
import React from 'react';
import {createPipeline} from '@/shared/api/dotsight';
import {CreatePipeline} from '.';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');
jest.mock('@/shared/api/dotsight', () => ({
  createPipeline: jest.fn(),
}));
jest.mock('@/shared/ui/icons', () => ({
  Icons: {
    Database: () => <div />,
  },
}));

describe('CreatePipeline', () => {
  it('should create pipeline on button click', () => {
    const pushMock = jest.fn();
    (useRouter as jest.MockedFn<any>).mockReturnValue({
      push: pushMock,
    });
    (createPipeline as jest.MockedFn<any>).mockResolvedValue({
      data: {id: '42'},
    });

    render(<CreatePipeline />);

    fireEvent.click(screen.getByRole('button'));

    waitFor(() => {
      expect(createPipeline).toHaveBeenCalledTimes(1)
      expect(createPipeline).toHaveBeenCalledWith({});
      expect(pushMock).toHaveBeenCalledTimes(1);
      expect(pushMock).toHaveBeenCalledWith('/pipeline/42');
    });
  });
});
