import {setPipelineDataSource as _setPipelineDataSource} from '@/shared/api/dotsight';
import {setPipelineDataSource} from './setPipelineDataSource';

jest.mock('@/shared/api/dotsight', () => ({
  setPipelineDataSource: jest.fn(),
}));
jest.mock('./actions', () => ({
  updatePipelines: jest.fn(({pipelines}) => ({pipelines})),
}));

describe('setPipelineDataSource', () => {
  it('should dispatch updatePipelines with the results from the backend', async () => {
    const dispatch = jest.fn(a => a);
    (_setPipelineDataSource as jest.MockedFn<any>).mockResolvedValue('42');

    await expect(setPipelineDataSource({pipelineId: '100', type: 't', config: {some: 'config'}})(dispatch));

    expect(_setPipelineDataSource).toHaveBeenCalledTimes(1);
    expect(_setPipelineDataSource).toHaveBeenCalledWith({
      pipelineId: '100',
      type: 't',
      config: {some: 'config'},
    });
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      pipelines: ['42'],
    });
  });
});
