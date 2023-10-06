import {useMemo} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {DistributionDatashape} from '@/entities/datashape/model/distribution';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {getAbsoluteMetricValue} from '@/shared/lib/unit';

import {Parameters, Customization} from '../params';

const useEnhance = (
  {pipelineId, widgetId, parameters, customization}: CommonWidgetProps<Parameters, Customization>
) => {
  const _parameters = useMemo(() => ({
    ...parameters,
    walletIds: [parameters.walletId],
  }), [parameters])

  const {
    data,
    isLoading,
    error,
  } = useWidgetData<DistributionDatashape>({
    pipelineId,
    widgetId,
    params: _parameters,
  });

  const items = useMemo(() => {
    return data?.items?.map(item => ({
      id: item.id,
      value: getAbsoluteMetricValue(item.value, customization.unit),
    })).filter(item => typeof item.value !== 'undefined');
  }, [data, customization.unit]);

  const pie = useMemo(() => {
    if (!items) {
      return null;
    }
    const {order = 'ASC', count = 10} = customization;
    const sorted = items.slice()
      .filter(item => item.value && item.value > 0)
      .sort((itemA, itemB) => (itemA.value! - itemB.value!)*(order === 'ASC' ? -1 : 1))
      .slice(0, count);
    const sum = sorted.reduce((acc, item) => { return acc + item.value!; }, 0);
    return sorted.reduce((acc, item, i) => {
      acc.push({
        id: item.id,
        percent: item.value! / sum,
        color: customization.palette![i],
      })
      return acc;
    }, [] as Array<{id: string, percent: number, color: string}>);
  }, [items, customization]);

  return {
    isLoading,
    data: pie,
    error,
  };
}

export default useEnhance;
