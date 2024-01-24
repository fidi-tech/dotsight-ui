import React, {useCallback, useState, useRef} from 'react';
import {useSelector} from 'react-redux';

import {PipelineId} from '@/entities/pipeline/model/types';
import {selectById} from '@/entities/pipeline/model/selectors';
import {getPipelineWidgets} from '@/entities/pipeline/model/getters';
import {isPipelineCompleted} from '@/entities/pipeline/model/steps';
import {Configuration, ConfiguratorHandle} from '@/entities/widget/lib/widget';
import WidgetsLibrary from '@/features/widget/ui';
import {Module} from '@/shared/ui/Module';
import {Button} from '@/shared/ui/Button';

import styles from './index.module.scss';

type Props = {
  id: PipelineId,
}

export const PipelineExecution = ({id}: Props) => {
  const pipeline = useSelector((state) => selectById(state, id))!;

  const settingsRef = useRef<ConfiguratorHandle<any, any> | null>(null);
  const [settings, updateSettings] = useState<Configuration<any, any>>();
  const onUpdateConfiguration = useCallback(() => {
    let newConfiguration;
    try {
      newConfiguration = settingsRef.current?.getConfiguration();
    } catch (e) {
      return;
    }

    updateSettings(newConfiguration);
  }, []);

  if (!isPipelineCompleted(pipeline)) {
    return (<div>Please specify your preferred settings to personalize the dashboard.</div>)
  }

  const widget = getPipelineWidgets(pipeline)[0];
  const widgetType = widget.type;
  const widgetId = widget.id;
  const Widget = WidgetsLibrary[widgetType].Widget;
  const Configurator = WidgetsLibrary[widgetType].Configurator;
  const Placeholder = WidgetsLibrary[widgetType].Placeholder || null;

  return (
    <div className={styles.root}>
      <div className={styles.result}>
        {settings && (
          <Widget
            pipelineId={id}
            widgetId={widgetId}
            parameters={settings.parameters}
            customization={settings.customization}
          />
        )}
        {!settings && (Placeholder ? <Placeholder isLoading={false} isError={false} /> : <div>Default placeholder</div>)}
      </div>
      <Module className={styles.config}>
        <Configurator ref={settingsRef} pipelineId={id} />
        <Button onClick={onUpdateConfiguration} text="Update" className={styles.update} />
      </Module>
    </div>
  )
}
