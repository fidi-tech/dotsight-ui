import React, {Ref} from 'react';
import {useOnNextStep} from './useOnNextStep';
import {renderHook} from '@testing-library/react';
import {setWidgetWrapper} from '@/entities/pipeline/model/setWidgetWrapper';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}));
jest.mock('@/entities/pipeline/model', () => ({
  selectById: jest.fn((s, id) => ({id})),
}));
jest.mock('@/entities/pipeline/model/getters', () => ({
  getPipelineWidgets: jest.fn(() => [{id: '101'}]),
}));
jest.mock('@/entities/pipeline/model/setWidgetWrapper');

describe('features/mapperSelector useOnNextStep', () => {
  let mockFormRef = {current: {validateForm: () => true}};

  beforeEach(() => {
    jest.spyOn(React, 'createRef')
      .mockImplementation(() => mockFormRef as any);
  });

  it('returns formRef', () => {
    const {result} = renderHook(() => useOnNextStep({
      ref: {some: 'ref'} as any as Ref<any>,
      pipelineId: 'pid',
      selectedType: 'st',
      config: {some: 'config'},
    }));

    expect(result.current.formRef).toEqual(mockFormRef);
  });

  it('uses useImperativeHandle to add correct next handle', () => {
    let next: (() => any) | undefined = undefined;
    jest.spyOn(React, 'useImperativeHandle')
      .mockImplementation((ref, init: () => any) => {
        next = init().next;
      });
    (setWidgetWrapper as jest.MockedFn<any>).mockImplementation(params => params);

    const ref = {} as React.Ref<any>;
    const pipelineId = '42';
    const selectedType = 'distribution';
    const config = {some: 'config'};

    renderHook(() => useOnNextStep({ref, pipelineId, selectedType, config}));

    expect(React.useImperativeHandle).toHaveBeenCalledTimes(1);
    expect((React.useImperativeHandle as jest.MockedFn<any>).mock.calls[0][0]).toEqual(ref);
    expect(next).toBeDefined();

    (next as any as () => any)();
    expect(mockDispatch).toHaveBeenCalledWith({
      pipelineId,
      widgetId: '101',
      type: selectedType,
      code: selectedType,
      config,
    });
  });
});
