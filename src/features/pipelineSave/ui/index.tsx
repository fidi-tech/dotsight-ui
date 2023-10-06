import React, {useCallback, forwardRef, useImperativeHandle, useState, Ref, ChangeEvent} from 'react';
import {useSelector} from 'react-redux';
import { useRouter } from 'next/navigation'

import {useDispatch} from '@/infra/providers/redux';
import {PipelineId} from '@/entities/pipeline/model/types';
import {Input} from '@/shared/ui/Input/index';
import {selectById} from '@/entities/pipeline/model/selectors';
import {updatePipelineName} from '@/entities/pipeline/model/providers/updateName';
import {getPipelineName} from '@/entities/pipeline/model/getters';

import styles from './index.module.scss';

type Props = {
  id: PipelineId,
}

const PipelineSave = ({id}: Props, ref: Ref<any>) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pipeline = useSelector((state) => selectById(state, id))!;
  const [name, setName] = useState(getPipelineName(pipeline));
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), [setName]);
  const next = useCallback(
    () => {
      dispatch(updatePipelineName({
        pipelineId: id,
        name
      }));
      router.push('/');
    },
    [dispatch, router, id, name]
  );

  useImperativeHandle(ref, () => ({next}));

  return (
    <div className={styles.root}>
      <p className={styles.title}>Save your Data Pipeline</p>
      <Input onChange={onChangeName} value={name} />
    </div>
  )
}

export default forwardRef(PipelineSave);
