import {createRef, Ref, useCallback, useImperativeHandle} from 'react';
import {PipelineId, selectById} from '@/entities/pipeline/model';
import {setWidgetWrapper} from '@/entities/pipeline/model/setWidgetWrapper';
import {useSelector} from 'react-redux';
import {getPipelineWidgets} from '@/entities/pipeline/model/getters';
import {useDispatch} from '@/infra/providers/redux';
import Form from '@rjsf/core';

export const useOnNextStep = ({
  ref,
  pipelineId,
  selectedType,
  config,
}: {
  ref: Ref<any>;
  pipelineId: PipelineId;
  selectedType?: string;
  config?: object;
}) => {
  const formRef = createRef<Form<any, any, any>>();

  const pipeline = useSelector((state) => selectById(state, pipelineId));
  const widget = pipeline && getPipelineWidgets(pipeline)[0];

  const dispatch = useDispatch();
  const next = useCallback(
    () => {
      if (!widget || !selectedType || !config) {
        return;
      }

      dispatch(setWidgetWrapper({
        pipelineId,
        widgetId: widget.id,
        type: selectedType,
        code: selectedType,
        config,
      }));
    },
    [dispatch, pipelineId, selectedType, widget, config],
  );
  useImperativeHandle(ref, () => ({
    next: () => {
      if (formRef?.current?.validateForm()) {
        next();
      }
    }
  }));

  return {
    formRef,
  };
};
