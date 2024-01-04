import {useMemo} from 'react';

import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {HistoricalLinesDatashape} from '@/entities/datashape/model/historicalLines';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {getAbsoluteMetricValue} from '@/shared/lib/unit';
import {getColorsFromPaletteByVariant} from '@/shared/ui/styles/palettes';
import {convertToLabel} from './utils';

import {Customization} from '../params';

const useEnhance = (
  {pipelineId, widgetId, parameters, customization}: CommonWidgetProps<any, Customization>
) => {
  const {
    data,
    isLoading,
    error,
  } = useWidgetData<HistoricalLinesDatashape>({
    pipelineId,
    widgetId,
    params: parameters,
  });

  const dates = useMemo(() => {
    if (!data) {
      return [];
    }

    const result = [];
    for (const line of data.items) {
      for (const point of line.value) {
        result.push(point.timestamp);
      }
    }
    return [...new Set(result)].map(timestamp => new Date(timestamp * 1000));
  }, [data]);



  const labels = useMemo(() => dates.map(convertToLabel), [dates]);

  const datasets = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.items.map((line, i) => ({
      data: line.value
        .map(point => ({
          x: convertToLabel(new Date(point.timestamp * 1000)),
          y: getAbsoluteMetricValue(point.value, customization.unit),
        }))
        .filter(({y}) => y) as Array<{x: string; y: number}>,
      label: line.name,
      borderColor: getColorsFromPaletteByVariant(customization.palette)[i],
      backgroundColor: getColorsFromPaletteByVariant(customization.palette)[i],
    }));
  }, [data, customization.palette, customization.unit]);

  return {
    isLoading,
    data: {
      labels,
      datasets,
    },
    error,
  };
}

export default useEnhance;
