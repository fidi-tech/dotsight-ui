import {useMemo} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {SingleMetricDatashape} from '@/entities/datashape/model/singleMetric';
import {getAbsoluteMetricValue} from '@/shared/lib/unit';

import {Parameters, Customization} from '../params';

const useEnhance = (
  {pipelineId, widgetId, parameters, customization}: CommonWidgetProps<Parameters, Customization>
) => {
  const {
    data,
    isLoading,
    error,
  } = useWidgetData<SingleMetricDatashape>({
    pipelineId,
    widgetId,
    params: parameters,
  });

  const state = useMemo(() => {
    if (!data || !data.value) {
      return null;
    }
    return getAbsoluteMetricValue(data.value, customization.unit);
  }, [data, customization]);

  return {
    data: state,
    isLoading,
    error,
  };
}

export default useEnhance;
