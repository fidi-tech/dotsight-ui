import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useState,
  Ref,
  ChangeEvent,
  useMemo,
} from 'react';
import {useSelector} from 'react-redux';
import cx from 'classnames';

import {useDispatch} from '@/infra/providers/redux';
import {PipelineId} from '@/entities/pipeline/model/types';
import {Input} from '@/shared/ui/Input';
import {selectById, selectCanModify} from '@/entities/pipeline/model/selectors';
import {getPipelineName} from '@/entities/pipeline/model/getters';
import {Selector} from '@/shared/ui/Selector';
import {savePipeline} from '@/features/pipelineSave/lib/savePipeline';

import styles from './index.module.scss';

type Props = {
  id: PipelineId,
}

const VISIBILITY = {
  PUBLIC: 'Public',
  PRIVATE: 'Private'
} as const;
type Visibility = typeof VISIBILITY[keyof typeof VISIBILITY];

const PipelineSave = ({id}: Props, ref: Ref<any>) => {
  const dispatch = useDispatch();
  const pipeline = useSelector((state) => selectById(state, id))!;
  const canModify = useSelector((state) => selectCanModify(state, id));

  const [name, setName] = useState(getPipelineName(pipeline));
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), [setName]);

  const [visibility, setVisibility] = useState<Visibility>(pipeline.isPublic ? VISIBILITY.PUBLIC : VISIBILITY.PRIVATE);
  const onChangeVisibility = useCallback(({value}: {value: string}) => setVisibility(value as Visibility), [setVisibility]);
  const visibilityOptions = useMemo(() => Object.values(VISIBILITY).map(visibility => ({value: visibility, label: visibility})), []);

  const next = useCallback(
    () => {
      dispatch(savePipeline({pipelineId: id, name, isPublic: visibility === VISIBILITY.PUBLIC}));
    },
    [dispatch, id, name, visibility]
  );

  useImperativeHandle(ref, () => ({next}));

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
        {visibility === VISIBILITY.PUBLIC &&
          <div className={styles.row}>
            <Input isDisabled value={`https://dot.fidi.tech/pipeline/${id}`} />
          </div>
        }
      </div>
    </div>
  )
}

export default forwardRef(PipelineSave);
