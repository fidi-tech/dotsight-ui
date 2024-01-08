import {renderHook} from '@testing-library/react';
import React, {Ref} from 'react';
import {selectById, selectCanModify} from '@/entities/pipeline/model';
import {useEnhance} from '.';
import {VISIBILITY} from '@/features/pipelineSave/lib/const';
import {savePipeline} from '@/features/pipelineSave/lib/thunks/savePipeline';

jest.mock('@/entities/pipeline/model');
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
const mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('@/features/pipelineSave/lib/thunks/savePipeline', () => ({
  savePipeline: jest.fn(() => ({type: 'savePipeline'})),
}));

describe('pipelineSave useEnhance', () => {
  const ref = 42 as any as Ref<any>;
  const pipelineId = '66';
  let next: (() => any) | undefined = undefined;

  beforeEach(() => {
    (selectCanModify as any as jest.MockedFn<any>).mockImplementation(() => 'whut');
    (selectById as any as jest.MockedFn<any>).mockImplementation(() => ({id: pipelineId, name: 'N@m3', isPublic: true}));

    next = undefined;
    jest.spyOn(React, 'useImperativeHandle')
      .mockImplementation(() => {});
  });

  it('should return canModify from the pipeline', () => {
    const {result} = renderHook(() => useEnhance({pipelineId, ref}));
    expect(result.current.canModify).toEqual('whut');
  });

  it('should return name from the pipeline', () => {
    const {result} = renderHook(() => useEnhance({pipelineId, ref}));
    expect(result.current.name).toEqual('N@m3');
  });

  it('should return visibility from the pipeline', () => {
    (selectById as any as jest.MockedFn<any>).mockImplementationOnce(() => ({isPublic: true}));
    const {result} = renderHook(() => useEnhance({pipelineId, ref}));
    expect(result.current.visibility).toEqual(VISIBILITY.PUBLIC);

    (selectById as any as jest.MockedFn<any>).mockImplementationOnce(() => ({isPublic: false}));
    const {result: newResult} = renderHook(() => useEnhance({pipelineId, ref}));
    expect(newResult.current.visibility).toEqual(VISIBILITY.PRIVATE);
  });

  it('should only return isLinkVisible if the pipeline isPublic', () => {
    (selectById as any as jest.MockedFn<any>).mockImplementationOnce(() => ({isPublic: true}));
    const {result} = renderHook(() => useEnhance({pipelineId, ref}));
    expect(result.current.isLinkVisible).toEqual(true);

    (selectById as any as jest.MockedFn<any>).mockImplementationOnce(() => ({isPublic: false}));
    const {result: newResult} = renderHook(() => useEnhance({pipelineId, ref}));
    expect(newResult.current.isLinkVisible).toEqual(false);
  });

  it('dispatches savePipeline thunk on next()', () => {
    jest.spyOn(React, 'useImperativeHandle')
      .mockImplementation((ref, init: () => any) => {
        next = init().next;
      });

    renderHook(() => useEnhance({pipelineId, ref}));

    expect((React.useImperativeHandle as jest.MockedFn<any>).mock.calls[0][0]).toEqual(ref);
    expect(next).toBeDefined();

    (next as any as () => any)();
    expect(savePipeline).toHaveBeenCalledWith({pipelineId, name: 'N@m3', isPublic: true});
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({type: 'savePipeline'});
  });
});
