import {useMemo} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {DistributionDatashape} from '@/entities/datashape/model/distribution';
import {getAbsoluteMetricValue, isMetricMultiValue} from '@/shared/lib/unit';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';
import {formatNumber} from '@/shared/lib/number';

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
      id: item.id,
      name: item.name,
      value: item.value,
    }));
  }, [data]);

  const state = useMemo(() => {
    if (!items) {
      return null;
    }
    const {order = 'ASC', count = 10} = customization;
    const sorted = items.slice()
      .map(item => {
        const value = getAbsoluteMetricValue(item.value, customization.unit);
        let text;
        if (value) {
          if (isMetricMultiValue(item.value)) {
            text = CURRENCY_FORMATTER[customization.unit].format(value);
          } else {
            text = formatNumber(value);
          }
        }
        return {
          name: item.name,
          value,
          text,
        }
      })
      .filter(item => item.value && (item.value > 0))
      .sort((itemA, itemB) => {
        if (!itemA.value) {
          return 1;
        }
        if (!itemB.value) {
          return -1;
        }
        return (itemA.value - itemB.value) * (order === 'ASC' ? 1 : -1);
      });
    return {
      rows: sorted.slice(0, Math.min(count, sorted.length)).map(item => ([item.name, item.text]))
    }
  }, [items, customization]);

  return {
    data: state,
    isLoading,
    error,
  };
}

export default useEnhance;
