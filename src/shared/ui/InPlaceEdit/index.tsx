import React from 'react';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';
import {useEnhance} from './hooks';

type Props = {
  value: string,
  onSave: (s: string) => void,
}
export const InPlaceEdit = ({value, onSave}: Props) => {
  const {
    spanRef,
    inputRef,
    content,
    width,
    isEditing,
    startEditing,
    onChange,
    onConfirm,
  } = useEnhance({value, onSave});

  return (
    <div className={styles.root}>
      <span className={styles.hide} ref={spanRef}>{content}</span>
      <input
        style={{ width }}
        value={content}
        onBlur={onConfirm}
        onChange={onChange}
        disabled={!isEditing}
        ref={inputRef}
      />
      {!isEditing && <div className={styles.icon} onClick={startEditing}><Icons.Pen/></div>}
    </div>
  )
}