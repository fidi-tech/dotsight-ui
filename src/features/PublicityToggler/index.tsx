import React, {useCallback} from 'react';

import Switch from '@/shared/ui/Switch';
import {WidgetId} from '@/entities/widget/model';

import styles from './index.module.scss';
import {useEnhance} from './hooks';

type Props = {
  id: WidgetId;
  controllable?: boolean;
  labelClassName?: string;
}

const PublicityToggler = ({id, controllable, labelClassName}: Props) => {
  const {label, isPublic, setIsPublic} = useEnhance(id);
  const toggle = useCallback(() => {
    if (controllable) {
      return;
    }
    setIsPublic(!isPublic);
  }, [isPublic, setIsPublic, controllable]);
  return (
    <div className={styles.root} onClick={toggle}>
      <div className={labelClassName}>{label}</div>
      <Switch className={styles.switcherContainer} switcherClassName={styles.switcher} initial={isPublic} controllable={controllable} />
    </div>
  )
}

export default PublicityToggler;