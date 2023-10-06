import {useMemo} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {DistributionDatashape} from '@/entities/datashape/model/distribution';
import {formatValue} from '@/entities/value/lib/format';

import {Parameters, Customization} from '../params';
import {getAbsoluteMetricValue} from '@/shared/lib/unit';

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
      name: item.name,
      value: getAbsoluteMetricValue(item.value, customization.unit),
    }));
  }, [data, customization.unit]);

  const state = useMemo(() => {
    if (!items) {
      return null;
    }
    const {order = 'ASC', count = 10} = customization;
    const sorted = items.slice()
      .sort((itemA, itemB) => {
        if (!itemA.value) {
          return 1;
        }
        if (!itemB.value) {
          return -1;
        }
        return (itemA.value - itemB.value)*(order === 'ASC' ? -1 : 1);
      })
      .slice(0, count);
    return {
      rows: sorted.map(item => [
        item.name,
        typeof item.value !== 'undefined' ? formatValue(item.value) : item.value,
      ]),
    };
  }, [items, customization]);

  return {
    data: state,
    isLoading,
    error,
  };
}

export default useEnhance;
