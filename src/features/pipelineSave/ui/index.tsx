import React, {forwardRef, Ref} from 'react';
import cx from 'classnames';
import {PipelineId} from '@/entities/pipeline/model/types';
import {Input} from '@/shared/ui/Input';
import {Selector} from '@/shared/ui/Selector';
import {useEnhance} from '@/features/pipelineSave/lib/hooks';

import styles from './index.module.scss';

type Props = {
  id: PipelineId,
}

const PipelineSave = ({id}: Props, ref: Ref<any>) => {
  const {
    canModify,
    name,
    onChangeName,
    visibilityOptions,
    visibility,
    onChangeVisibility,
    isLinkVisible,
  } = useEnhance({pipelineId: id, ref});

  if (!canModify) {
    return null;
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>Save your Data Pipeline</p>
      <div className={styles.form}>
        <div className={cx(styles.row, styles.name)}>
          <Input isDisabled={!canModify} onChange={onChangeName} value={name} />
        </div>
        <div className={styles.row}>
          <div className={styles.label}>
            Data pipeline visibility:
          </div>
          <Selector
            isDisabled={!canModify}
            options={visibilityOptions}
            onSelect={onChangeVisibility}
            selected={visibility}
            isSearchable={false}
          />
        </div>
        {isLinkVisible &&
          <div className={styles.row}>
            <Input isDisabled value={`https://dot.fidi.tech/pipeline/${id}`} />
          </div>
        }
      </div>
    </div>
  )
}

export default forwardRef(PipelineSave);
