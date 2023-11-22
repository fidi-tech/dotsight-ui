import {useMemo} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {DistributionDatashape} from '@/entities/datashape/model/distribution';
import {getAbsoluteMetricValue} from '@/shared/lib/unit';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';

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
      .sort((itemA, itemB) => {
        if (!itemA.value) {
          return 1;
        }
        if (!itemB.value) {
          return -1;
        }
        return (
          (getAbsoluteMetricValue(itemA.value, customization.unit) || 0) - (getAbsoluteMetricValue(itemB.value, customization.unit) || 0)
        )*(order === 'ASC' ? 1 : -1);
      })
      .slice(0, count);
    return {
      rows: sorted.map(item => {
        if (typeof item.value !== 'undefined') {
          if (getAbsoluteMetricValue(item.value) !== item.value) {
            // @ts-expect-error here is Record according to condition above
            if (item.value[customization.unit] && CURRENCY_FORMATTER[customization.unit]) {
              const value = item.value as Record<string, number>;
              return [
                item.name,
                CURRENCY_FORMATTER[customization.unit].format(value[customization.unit]),
              ]
            }
            return [
              item.name,
              '',
            ];
          }
          return [
            item.name,
            Intl.NumberFormat('en-US', {
              maximumFractionDigits: 6,
            }).format(item.value)
          ];
        }
        return [
          item.name,
          '',
        ]
      }),
    };
  }, [items, customization]);

  return {
    data: state,
    isLoading,
    error,
  };
}

export default useEnhance;
