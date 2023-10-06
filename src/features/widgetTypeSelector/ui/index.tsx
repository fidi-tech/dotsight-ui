import React, {forwardRef, Ref} from 'react';

import {PipelineId} from '@/entities/pipeline/model/types';
import {Selector} from '@/shared/ui/Selector';

import useEnhance from '../lib/hooks';
import styles from './index.module.scss';

type Props = {
  id: PipelineId,
}

const WidgetTypeSelector = ({id}: Props, ref: Ref<any>) => {
  const {
    selectedType,
    typeOptions,
    onOptionSelect,
    isDisabled,
  } = useEnhance({ref, pipelineId: id});

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.title}>What type of widget do you want to build?</div>
        <div>
          <Selector options={typeOptions} selected={selectedType} onSelect={onOptionSelect} isDisabled={isDisabled} />
        </div>
      </div>
    </div>
  )
}

export default forwardRef(WidgetTypeSelector);
