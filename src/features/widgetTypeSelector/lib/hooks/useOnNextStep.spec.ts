import React from 'react';
import {renderHook} from '@testing-library/react';
import {useOnNextStep} from './useOnNextStep';
import {addWidget} from '@/entities/pipeline/model/addWidget';

let mockDispatch = jest.fn(action => action);
jest.mock('@/infra/providers/redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('@/entities/pipeline/model/addWidget');
jest.mock('@/features/widget/ui', () => ({
  __esModule: true,
  default: {
    pieChart: {
      dataShape: 'datashape',
    },
  },
}));

describe('features/widgetTypeSelector useOnNextStep', () => {
  it('uses useImperativeHandle to add correct next handle', () => {
    let next: (() => any) | undefined = undefined;
    jest.spyOn(React, 'useImperativeHandle')
      .mockImplementation((ref, init: () => any) => {
        next = init().next;
      });
    (addWidget as jest.MockedFn<any>).mockImplementation(params => params);

    const ref = {} as React.Ref<any>;
    const pipelineId = '42';
    const selectedType = 'pieChart';

    renderHook(() => useOnNextStep({ref, pipelineId, selectedType}));

    expect(React.useImperativeHandle).toHaveBeenCalledTimes(1);
    expect((React.useImperativeHandle as jest.MockedFn<any>).mock.calls[0][0]).toEqual(ref);
    expect(next).toBeDefined();

    (next as any as () => any)();
    expect(mockDispatch).toHaveBeenCalledWith({
      id: pipelineId,
      type: selectedType,
      config: {},
      datashape: 'datashape',
    });
  });
});
