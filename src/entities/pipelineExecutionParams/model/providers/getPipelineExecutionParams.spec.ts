import {getPipelineExecutionParams} from './getPipelineExecutionParams';
import {getPipelineParams} from '@/shared/api/dotsight';

jest.mock('@/shared/api/dotsight', () => ({
  getPipelineParams: jest.fn(),
}));
jest.mock('../actions', () => ({
  setPipelineExecutionParams: jest.fn(({pipelineExecutionParams}) => ({pipelineExecutionParams})),
}));

describe('getPipelineExecutionParams', () => {
  it('should dispatch setPipelineExecutionParams with the results from the backend', async () => {
    const dispatch = jest.fn(a => a);
    (getPipelineParams as jest.MockedFn<any>).mockResolvedValue({
      id: '100',
    });

    await expect(getPipelineExecutionParams({pipelineId: '100', mapperCode: 'code'})(dispatch));

    expect(getPipelineParams).toHaveBeenCalledTimes(1);
    expect(getPipelineParams).toHaveBeenCalledWith({id: '100', mapperCode: 'code'});
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      pipelineExecutionParams: {id: '100'},
    });
  });
});
