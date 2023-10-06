import {updatePipelineName} from './updateName';
import {updatePipelineName as _updatePipelineName} from '@/shared/api/dotsight';

jest.mock('@/shared/api/dotsight', () => ({
  updatePipelineName: jest.fn(),
}));
jest.mock('../actions', () => ({
  updatePipelines: jest.fn(({pipelines}) => ({pipelines})),
}));

describe('updatePipelineName', () => {
  it('should dispatch updatePipelines with the results from the backend', async () => {
    const dispatch = jest.fn(a => a);
    (_updatePipelineName as jest.MockedFn<any>).mockResolvedValue({
      data: '42'
    });

    await expect(updatePipelineName({pipelineId: '100', name: 'new name'})(dispatch));

    expect(_updatePipelineName).toHaveBeenCalledTimes(1);
    expect(_updatePipelineName).toHaveBeenCalledWith({id: '100', name: 'new name'});
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      pipelines: ['42'],
    });
  });
});
