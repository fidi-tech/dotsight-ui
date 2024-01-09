import {fetchPipelineById} from './fetchPipelineById';
import {getPipelineById} from '@/shared/api/dotsight';

jest.mock('@/shared/api/dotsight', () => ({
  getPipelineById: jest.fn(),
}));
jest.mock('@/entities/pipeline/model/actions', () => ({
  updatePipelines: jest.fn(({pipelines}) => ({pipelines})),
}));

describe('fetchPipelineById', () => {
  it('should dispatch updatePipelines with the results from the backend', async () => {
    const dispatch = jest.fn(a => a);
    (getPipelineById as jest.MockedFn<any>).mockResolvedValue('42');

    await expect(fetchPipelineById({id: '100'})(dispatch));

    expect(getPipelineById).toHaveBeenCalledTimes(1);
    expect(getPipelineById).toHaveBeenCalledWith({id: '100'});
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      pipelines: ['42'],
    });
  });
});
