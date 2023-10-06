import widgetList from '@/features/widget/ui';
import {PipelineId, selectDefaultWidgetType} from '@/entities/pipeline/model';
import {useSelector} from 'react-redux';
import {useCallback, useState} from 'react';
import {Option} from '@/shared/ui/Selector';

const OPTIONS = Object.values(widgetList).map(widget => ({
  value: widget.type,
  label: widget.title,
}));

export const useWidgetTypesForPipeline = ({pipelineId}: {pipelineId: PipelineId}) => {
  const pipelineWidgetType = useSelector(state => selectDefaultWidgetType(state, pipelineId));
  const [selectedType, setType] = useState(pipelineWidgetType || undefined);

  const onOptionSelect = useCallback((option: Option) => {
    setType(option.value);
  }, []);

  return {
    selectedType,
    onOptionSelect,
    typeOptions: OPTIONS,
    isDisabled: Boolean(pipelineWidgetType),
  };
};
