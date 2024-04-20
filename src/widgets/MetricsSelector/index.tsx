import React, {useCallback, useMemo} from 'react';
import {useWizard} from 'react-use-wizard';

import WizardControls from '@/features/WizardControls';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';
import {StepTitle} from '@/shared/ui/StepTitle';
import {Module} from '@/shared/ui/Module';
import TilesSelector from '@/features/TilesSelector';
import {NameWithIcon} from '@/shared/ui/NameWithIcon';
import {getMetricIcon, getMetricName} from '@/entities/metric/model/getters';
import {Preset} from '@/entities/preset/model';
import {Metric} from '@/entities/metric/model';
import {getPresetIcon, getPresetName} from '@/entities/preset/model/getters';

import {Title} from './components/Title';
import styles from './index.module.scss';
import {useEnhance} from './hooks';

type Props = {
  id: string;
}

const MetricsSelector = ({id}: Props) => {
  const { previousStep, nextStep } = useWizard();
  const {
    metrics,
    presets,
    onSelectMetrics,
    onSelectPreset,
    query,
    setQuery,
    isCompleted,
  } = useEnhance(id);

  const renderMetric = useCallback((metric: Metric) =>
    <NameWithIcon
      Icon={getMetricIcon(metric) &&
        <img
          alt={getMetricName(metric)}
          src={getMetricIcon(metric) || undefined}
          className={styles.tileIcon}
        />
      }
    >
      {getMetricName(metric)}
    </NameWithIcon>
  , []);

  const renderPreset = useCallback((preset: Preset) =>
    <NameWithIcon
      Icon={getPresetIcon(preset) &&
        <img
          alt={getPresetName(preset)}
          src={getPresetIcon(preset) || undefined}
          className={styles.tileIcon}
        />
      }
    >
      {getPresetName(preset)}
    </NameWithIcon>
  , []);

  const sections = useMemo(() => [
    {id: 'metrics', tiles: metrics, renderTile: renderMetric, onSelect: onSelectMetrics},
    {id: 'presets', title: 'Metrics collections', tiles: presets, renderTile: renderPreset, onSelect: onSelectPreset},
  ], [metrics, presets, renderPreset, renderMetric, onSelectPreset, onSelectMetrics]);

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
            sections={sections}
            setQuery={setQuery}
          />
        </Module>
      </div>
      <div className={styles.controls}>
        <WizardControls
          left={
            <Button
              onClick={previousStep}
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
              onClick={nextStep}
              text="Next"
              icon={
                <div className={styles.nextIcon}>
                  <Icons.OutlinedArrow />
                </div>
              }
              disabled={!isCompleted}
            />
          }
          percentage={66}
        />
      </div>
    </div>
  )
}

export default MetricsSelector;
