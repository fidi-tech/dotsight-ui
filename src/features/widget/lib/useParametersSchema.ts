import {useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';

import {useDispatch} from '@/infra/providers/redux';
import {PipelineId, selectById} from '@/entities/pipeline/model';
import {selectById as selectPipelineExecutionParamsById} from '@/entities/pipelineExecutionParams/model';
import {getPipelineMappers} from '@/entities/pipeline/model/getters';
import {getPipelineExecutionParams} from '@/entities/pipelineExecutionParams/model/providers/getPipelineExecutionParams';

const useParametersSchema = ({pipelineId}: {pipelineId: PipelineId}) => {
  const dispatch = useDispatch();
  const pipeline = useSelector((state) => selectById(state, pipelineId))!;
  const parametersSchema = useSelector((state) => selectPipelineExecutionParamsById(state, pipelineId));
  const mapperCode = useMemo(() => {
    const mappers = getPipelineMappers(pipeline);
    const mapper = Object.values(mappers)[0];
    return mapper.code;
  }, [pipeline]);

  useEffect(
    () => {
      dispatch(getPipelineExecutionParams({pipelineId, mapperCode}));
    },
    [dispatch, pipelineId, mapperCode],
  );

  return {
    parametersSchema,
  };
}

export default useParametersSchema;