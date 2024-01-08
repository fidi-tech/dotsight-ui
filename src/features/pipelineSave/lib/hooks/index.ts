import {useDispatch} from '@/infra/providers/redux';
import {useSelector} from 'react-redux';
import {selectById, selectCanModify} from '@/entities/pipeline/model';
import {ChangeEvent, Ref, useCallback, useImperativeHandle, useMemo, useState} from 'react';
import {getPipelineName} from '@/entities/pipeline/model/getters';
import {savePipeline} from '@/features/pipelineSave/lib/thunks/savePipeline';
import {VISIBILITY, Visibility} from '@/features/pipelineSave/lib/const';

export const useEnhance = ({pipelineId, ref}: {pipelineId: string, ref: Ref<any>}) => {
  const dispatch = useDispatch();
  const pipeline = useSelector((state) => selectById(state, pipelineId))!;
  const canModify = useSelector((state) => selectCanModify(state, pipelineId));

  const [name, setName] = useState(getPipelineName(pipeline));
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), [setName]);

  const [visibility, setVisibility] = useState<Visibility>(pipeline.isPublic ? VISIBILITY.PUBLIC : VISIBILITY.PRIVATE);
  const onChangeVisibility = useCallback(({value}: {value: string}) => setVisibility(value as Visibility), [setVisibility]);
  const visibilityOptions = useMemo(() => Object.values(VISIBILITY).map(visibility => ({value: visibility, label: visibility})), []);

  const next = useCallback(
    () => {
      dispatch(savePipeline({pipelineId, name, isPublic: visibility === VISIBILITY.PUBLIC}));
    },
    [dispatch, pipelineId, name, visibility]
  );

  useImperativeHandle(ref, () => ({next}));

  return {
    canModify,
    name,
    onChangeName,
    visibility,
    onChangeVisibility,
    visibilityOptions,
    isLinkVisible: visibility === VISIBILITY.PUBLIC,
  }
};
