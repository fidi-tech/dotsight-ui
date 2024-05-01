import React, {useCallback, useRef, useState, useEffect} from 'react';

import {Icons} from '@/shared/ui/icons';
import {Button} from '@/shared/ui';

import Popup from './components/Popup';
import styles from './index.module.scss';

export default function MobileNavigation() {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const toggleIsOpened = useCallback(() => setIsOpened(!isOpened), [isOpened, setIsOpened]);
  const close = useCallback(() => setIsOpened(false), [setIsOpened]);
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Element)) {
      setIsOpened(false);
    }
  }, [popupRef.current]);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
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
