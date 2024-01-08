import {updatePipeline} from '@/shared/api/dotsight';
import {savePipeline} from './savePipeline';

jest.mock('@/shared/api/dotsight');

describe('savePipeline', () => {
  const assign = jest.fn();
  const realLocation = window.location;

  beforeEach(() => {
    // @ts-ignore
    delete window.location;
    window.location = { ...realLocation, assign };
  });

  afterEach(() => {
    window.location = realLocation;
  });

  it('should update pipeline & redirect', async () => {
    const innerThunk = savePipeline({pipelineId: '42', name: 'meaning', isPublic: true});
    await innerThunk({} as any);

    expect(updatePipeline).toHaveBeenCalledTimes(1);
    expect(updatePipeline).toHaveBeenCalledWith({id: '42', name: 'meaning', isPublic: true});
    expect(assign).toHaveBeenCalledTimes(1);
    expect(assign).toHaveBeenCalledWith('/');
  });
});
