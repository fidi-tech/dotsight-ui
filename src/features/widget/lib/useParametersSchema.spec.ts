import {renderHook} from '@testing-library/react';

import {
  getPipelineExecutionParams,
} from '@/entities/pipelineExecutionParams/model/providers/getPipelineExecutionParams';
import {selectById} from '@/entities/pipeline/model';
import {selectSafeRJSFPipelineExecutionParams} from '@/entities/pipelineExecutionParams/model';

import useParametersSchema from './useParametersSchema';

let mockDispatch = jest.fn(action => action);
jest.mock('@/entities/pipelineExecutionParams/model/providers/getPipelineExecutionParams');
jest.mock('@/entities/pipelineExecutionParams/model');
jest.mock('@/entities/pipeline/model');
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));

describe('features/widget useParametersSchema', () => {
  beforeEach(() => {
    (getPipelineExecutionParams as jest.MockedFn<any>).mockClear();
    (selectById as jest.MockedFn<any>).mockReturnValue({mappers: [{code: 'mcode'}]});
  })

  it('should start loading immediately', () => {
    (getPipelineExecutionParams as jest.MockedFn<any>).mockImplementation(async () => {
      return {
        data: {
          wid: {some: 'data'},
        },
      };
    });

    const {result} = renderHook(() => useParametersSchema({
      pipelineId: 'pid',
    }));
    expect(result.current.parametersSchema).toEqual(undefined);
    expect(getPipelineExecutionParams).toHaveBeenCalledTimes(1);
    expect(getPipelineExecutionParams).toHaveBeenCalledWith({
      pipelineId: 'pid',
      mapperCode: 'mcode',
    });
  });

  it('should return the data if params exists', () => {
    (selectSafeRJSFPipelineExecutionParams as jest.MockedFn<any>).mockReturnValue({pId: 'pId'});
    (getPipelineExecutionParams as jest.MockedFn<any>).mockResolvedValue({
      data: {
        wid: {some: 'data'},
      },
    });

    const {result} = renderHook(() => useParametersSchema({
      pipelineId: 'pid',
    }));

    expect(result.current.parametersSchema).toEqual({
      pId: 'pId',
    });
  });
});
