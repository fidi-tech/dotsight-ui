import React, {useCallback, useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';

import {useDispatch} from '@/infra/providers/redux';
import {PipelineId} from '@/entities/pipeline/model/types';
import {selectById, selectCanModify} from '@/entities/pipeline/model/selectors';
import {fetchPipelineById} from '@/widgets/pipelineManager/lib/fetchPipelineById';
import {Icons} from '@/shared/ui/icons';
import {Module} from '@/shared/ui/Module';
import {Button} from '@/shared/ui/Button';
import {getInitialStep, STEP_WIDGETS, STEPS_ORDER, STEP_BUTTONS, STEPS} from '@/entities/pipeline/model/steps';
import {PipelineExecution} from '@/features/PipelineExecution/ui';

import styles from './index.module.scss';

type Props = {
  id: PipelineId
}

export const PipelineManager = ({id}: Props) => {
  const dispatch = useDispatch();
  const activeStepRef = useRef<{next: () => any}>(null);
  useEffect(() => {
    dispatch(fetchPipelineById({id}));
  }, [dispatch, id]);
  const pipeline = useSelector((state) =>
    selectById(state, id)
  );
  const canModify = useSelector(state => selectCanModify(state, id));
  const [activeStep, setActiveStep] = useState<typeof STEPS[keyof typeof STEPS]>();
  useEffect(() => {
    if (pipeline) {
      setActiveStep(getInitialStep(pipeline));
    }
  }, [pipeline]);
  const activeStepIndex = STEPS_ORDER.findIndex(value => value === activeStep);
  const onNext = useCallback(() => activeStepRef?.current?.next(), []);

  if (!pipeline) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <PipelineExecution id={id} />
      </div>
      <div className={styles.right}>
        {STEPS_ORDER.map((step, i) => {
          if (i > activeStepIndex) {
            return null;
          }
          const isActive = i === activeStepIndex;
          const Widget = STEP_WIDGETS[step];
          return <div key={step}>
            <Module>
              <Widget id={id} ref={isActive ? activeStepRef : null}/>
            </Module>
          </div>;
        })}
        {canModify &&
          <Button
            className={styles.next}
            onClick={onNext}
            text={STEP_BUTTONS[activeStep!]}
            icon={<Icons.Database />}
            iconPosition="Left"
          />
        }
      </div>
    </div>
  )
}
