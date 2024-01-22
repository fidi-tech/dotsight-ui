import {useMemo, useState} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {StatisticsDatashape} from '@/entities/datashape/model/statistics';
import {getAbsoluteMetricValue, isMetricMultiValue} from '@/shared/lib/unit';
import {CURRENCY_FORMATTER} from '@/shared/lib/currency';
import {formatNumber} from '@/shared/lib/number';

import {Customization} from '../params';

const useEnhance = (
  {pipelineId, widgetId, parameters, customization}: CommonWidgetProps<any, Customization>,
  {ranges}: {ranges: string[]}
) => {
  const [range, setRange] = useState(ranges[0]);
  const params = useMemo(() => ({
    ...parameters,
    range,
  }), [parameters, range]);
  const {
    data,
    isLoading,
    error,
  } = useWidgetData<StatisticsDatashape>({
    pipelineId,
    widgetId,
    params,
  });

  const stats = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.stats.map(stat => {
      const _value = getAbsoluteMetricValue(stat.value, customization.unit);
      let value;
      if (_value) {
        if (isMetricMultiValue(stat.value)) {
          value = CURRENCY_FORMATTER[customization.unit].format(_value);
        } else {
          value = formatNumber(_value);
        }
      }
      return {
        stat: stat.stat,
        value,
        change: stat.change,
      }
    })
  }, [data, customization.unit]);

  return {
    data: data && {
      name: data.name,
      logoUrl: data.logoUrl,
      stats,
    },
    isLoading,
    error,
    range,
    setRange,
  };
}

export default useEnhance;
