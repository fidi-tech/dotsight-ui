import {Ref, useCallback, useImperativeHandle} from 'react';
import {useDispatch} from '@/infra/providers/redux';
import {addWidget} from '@/entities/pipeline/model/addWidget';
import widgetList from '@/features/widget/ui';

export const useOnNextStep = ({ref, pipelineId, selectedType}: {ref: Ref<any>; pipelineId: string; selectedType?: string;}) => {
  const dispatch = useDispatch();

  const next = useCallback(
    () => {
      if (!selectedType) {
        return;
      }

      dispatch(addWidget({
        id: pipelineId,
        type: selectedType,
        config: {},
        datashape: widgetList[selectedType].dataShape,
      }));
    },
    [dispatch, pipelineId, selectedType],
  );

  useImperativeHandle(ref, () => ({next}));
};
