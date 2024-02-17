import * as React from 'react';
import {useWizard} from 'react-use-wizard';

import WizardControls from '@/features/WizardControls';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';
import {Module} from '@/shared/ui/Module';

import styles from './index.module.scss';
import {Types} from './components/Types';
import {Preview} from './components/Preview';
import {useEnhance} from './hocs';

type Props = {
  id: string;
}

const WidgetConfigurator = ({id}: Props) => {
  const { previousStep, nextStep } = useWizard();
  const {
    viewType,
    onSelectViewType,
  } = useEnhance();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.preview}>
          <Preview id={id} viewType={viewType} />
        </div>
        <div className={styles.types}>
          <Module>
            <Types onSelect={onSelectViewType} />
          </Module>
        </div>
        <div className={styles.adjustments}><Module>adjustments</Module></div>
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
