import {useWidgetData} from '@/features/widget/lib/useWidgetData';
import {CommonWidgetProps} from '@/entities/widget/lib/widget';
import {NFTListDatashape} from '@/entities/datashape/model/nftList';

import {Customization} from '../params';

const useEnhance = (
  {pipelineId, widgetId, parameters}: CommonWidgetProps<any, Customization>
) => {
  const {
    data,
    isLoading,
    error,
  } = useWidgetData<NFTListDatashape>({
    pipelineId,
    widgetId,
    params: parameters,
  });

  return {
    isLoading,
    data,
    error,
  };
}

export default useEnhance;
