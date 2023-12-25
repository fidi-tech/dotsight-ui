import {pipelineExecutionParamsAdapter} from './adapter';

export const {selectById} = pipelineExecutionParamsAdapter.getSelectors(
  // @ts-expect-error
  state => state.pipelineExecutionParams
);
