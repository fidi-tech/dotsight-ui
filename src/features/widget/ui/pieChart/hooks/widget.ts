import {useMemo} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {DistributionDatashape} from '@/entities/datashape/model/distribution';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {getAbsoluteMetricValue} from '@/shared/lib/unit';

import {Parameters, Customization} from '../params';

const useEnhance = (
  {pipelineId, widgetId, parameters, customization}: CommonWidgetProps<Parameters, Customization>
) => {
  const {
    data,
    isLoading,
    error,
  } = useWidgetData<DistributionDatashape>({
    pipelineId,
    widgetId,
    params: parameters,
  });

  const items = useMemo(() => {
    return data?.items?.map(item => ({
      name: item.name,
      value: getAbsoluteMetricValue(item.value, customization.unit),
    })).filter(item => typeof item.value !== 'undefined');
  }, [data, customization.unit]);

  const pie = useMemo(() => {
    if (!items) {
      return null;
    }
    const {order = 'ASC', count} = customization;
    const sorted = items.slice()
      .filter(item => item.value && item.value > 0)
      .sort((itemA, itemB) => (itemA.value! - itemB.value!)*(order === 'DESC' ? -1 : 1))
      .slice(0, count);
    return sorted.reduce((acc, item, i) => {
      acc.push({
        name: item.name,
        value: item.value!,
        color: customization.palette![i],
      })
      return acc;
    }, [] as Array<{name: string, value: number, color: string}>);
  }, [items, customization]);

  return {
    isLoading,
    data: pie,
    error,
  };
}

export default useEnhance;
