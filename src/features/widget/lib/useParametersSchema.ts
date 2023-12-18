import {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {PipelineId, selectById} from '@/entities/pipeline/model';
import {getPipelineMappers} from '@/entities/pipeline/model/getters';
import {getPipelineExecutionParams} from '@/entities/pipelineExecutionParams/model/providers/getPipelineExecutionParams';
import {PipelineExecutionParams} from '@/entities/pipelineExecutionParams/model/types';

const useParametersSchema = ({pipelineId}: {pipelineId: PipelineId}) => {
  const [parametersSchema, setParametersSchema] = useState<PipelineExecutionParams | null>(null);
  const pipeline = useSelector((state) => selectById(state, pipelineId))!;
  const mapperCode = useMemo(() => {
    const mappers = getPipelineMappers(pipeline);
    const mapper = Object.values(mappers)[0];
    return mapper.code;
  }, [pipeline]);

  useEffect(() => {
    getPipelineExecutionParams({pipelineId, mapperCode})
      .then(setParametersSchema);
  }, [pipelineId, mapperCode, setParametersSchema]);

  return {
    parametersSchema,
  };
}

export default useParametersSchema;