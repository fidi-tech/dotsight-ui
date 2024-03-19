import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import {Module} from '@/shared/ui/Module';
import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

type Props = {
  Icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

const HideableBlock = ({
  Icon,
  title,
  children,
}: Props) => {
  const [isOpened, setIsOpened] = useState(true);
  const toggleIsOpened = useCallback(() => setIsOpened(!isOpened), [isOpened, setIsOpened]);
  return (
    <Module className={styles.root}>
      <div
        className={styles.header}
        onClick={toggleIsOpened}
        data-is-opened={isOpened}
      >
        {Icon && (
          <div className={styles.iconWrapper}>
            <div className={styles.icon}>
              {Icon}
            </div>
          </div>
        )}
        <div className={styles.title}>
          {title}
        </div>
        <div className={cx(styles.openIcon, {[styles.reverted]: !isOpened})}>
          <Icons.ChevronUp />
        </div>
      </div>
      <div className={cx(styles.body, {[styles.bodyOpened]: isOpened})}>
        {children}
      </div>
    </Module>
  );
}

export default HideableBlock;
