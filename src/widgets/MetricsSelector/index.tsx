import React, {useCallback} from 'react';
import {useWizard} from 'react-use-wizard';

import WizardControls from '@/features/WizardControls';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';
import {StepTitle} from '@/shared/ui/StepTitle';
import {Module} from '@/shared/ui/Module';
import TilesSelector from '@/features/TilesSelector';
import {NameWithIcon} from '@/shared/ui/NameWithIcon';

import {Title} from './components/Title';
import styles from './index.module.scss';
import {useEnhance} from './hocs';

type Props = {
  id: string;
}

const MetricsSelector = ({id}: Props) => {
  const { previousStep, nextStep } = useWizard();
  const {
    metrics,
    onSelectMetrics,
    query,
    setQuery,
  } = useEnhance(id);

  const renderMetric = useCallback((metric) =>
    <NameWithIcon
      Icon={metric.icon &&
        <img
          src={metric.icon}
          className={styles.tileIcon}
        />
      }
    >
      {metric.name}
    </NameWithIcon>
  , [])

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <StepTitle n={3}>
          <Title />
        </StepTitle>
        <Module className={styles.module}>
          <TilesSelector
            title="Available Metrics"
            placeholder="Search for metrics"
            query={query}
            setQuery={setQuery}
            tiles={metrics}
            renderTile={renderMetric}
            onSelect={onSelectMetrics}
          />
        </Module>
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
                <div className={styles.previousIcon}>
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
          percentage={66}
        />
      </div>
    </div>
  )
}

export default MetricsSelector;
