import React from 'react';

import {Icons} from '@/shared/ui/icons';
import {Button} from '@/shared/ui';

import Popup from './components/Popup';
import {useEnhance} from './hooks';
import styles from './index.module.scss';

export default function MobileNavigation() {
  const {isOpened, toggleIsOpened, popupRef, close} = useEnhance();
  return (
    <div className={styles.root}>
      <Button icon={isOpened ? <Icons.Cross /> : <Icons.Burger />} className={styles.button} onClick={toggleIsOpened} />
      {
        isOpened && (
          <div className={styles.content} ref={popupRef}>
            <Popup onSelect={close} />
          </div>
        )
      }
    </div>
  )
}
