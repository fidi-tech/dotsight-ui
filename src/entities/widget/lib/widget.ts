import {PipelineId} from '@/entities/pipeline/model/types';
import {WidgetId} from '@/entities/widget/model/types';

export type CommonWidgetProps<P, C> = {
  pipelineId: PipelineId;
  widgetId: WidgetId;
  parameters: P;
  customization: C;
};

export type Configuration<P, C> = {
  parameters: P,
  customization: C,
};

export type ConfiguratorHandle<P, C> = {
  getConfiguration: () => Configuration<P, C>;
};

export type Widget<P, C> = (props: CommonWidgetProps<P, C>) => JSX.Element | null;
