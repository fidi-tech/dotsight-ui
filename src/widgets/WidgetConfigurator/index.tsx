import * as React from 'react';
import {useWizard} from 'react-use-wizard';

import WizardControls from '@/features/WizardControls';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';
import {Module} from '@/shared/ui/Module';
import {WidgetId} from '@/entities/widget/model';

import styles from './index.module.scss';
import {Breadcrumbs} from './components/Breadcrumbs';
import {Preview} from './components/Preview';
import {Types} from './components/Types';
import {useEnhance} from './hooks';

type Props = {
  id: WidgetId;
}

const WidgetConfigurator = ({id}: Props) => {
  const { previousStep, nextStep } = useWizard();
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
        {/*<div className={styles.adjustments}><Module>adjustments</Module></div>*/}
      </div>
      <div className={styles.controls}>
        <WizardControls
          left={
            <Button
              onClick={() => previousStep()}
              text="Back"
              theme="minor"
              iconPosition="Left"
              icon={
                <div>
                  <Icons.OutlinedArrow/>
                </div>
              }
            />
          }
          right={
            <Button
              onClick={() => nextStep()}
              text="Next"
              icon={
                <div className={styles.nextIcon}>
                  <Icons.OutlinedArrow />
                </div>
              }
            />
          }
          percentage={100}
        />
      </div>
    </div>
  )
}

export default WidgetConfigurator;
