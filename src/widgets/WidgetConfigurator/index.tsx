import * as React from 'react';

import {Module} from '@/shared/ui/Module';

import styles from './index.module.scss';
import {Breadcrumbs} from './components/Breadcrumbs';
import {Preview} from './components/Preview';
import {Types} from './components/Types';
import {useEnhance} from './hooks';
import {Props} from './types';

const WidgetConfigurator = ({id, WizardControls}: Props) => {
  const { viewType } = useEnhance(id);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs id={id} />
        </div>
        <div className={styles.preview}>
          {viewType && <Preview id={id} viewType={viewType} />}
        </div>
        <div className={styles.types}>
          <Module>
            <Types widgetId={id} />
          </Module>
        </div>
      </div>
      {WizardControls && (
        <div className={styles.controls}>
          {WizardControls}
        </div>
      )}
    </div>
  )
}

export default WidgetConfigurator;
