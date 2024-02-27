import React, {ComponentType, useCallback, useState} from 'react';

import {Button, Module} from '@/shared/ui';

import styles from './index.module.scss';

type Props = {
  text: string,
  positive?: string,
  onPositiveClick?: () => void,
  negative?: string,
  onNegativeClick?: () => void,
}

export const withConfirmation = ({text, positive, negative, onPositiveClick, onNegativeClick}: Props) =>
  <P extends object>(Component: ComponentType<P>) => {
    const MyComp = (props: P) => {
      const [isVisible, setIsVisible] = useState(false);
      const show = useCallback(() => setIsVisible(true), [setIsVisible]);
      const hide = useCallback(() => setIsVisible(false), [setIsVisible]);
      const _onNegativeClick = useCallback(() => {
        if (onNegativeClick) {
          onNegativeClick()
        }
        hide();
      }, [onNegativeClick]);
      const _onPositiveClick = useCallback(() => {
        if (onPositiveClick) {
          onPositiveClick()
        }
        hide();
      }, [onPositiveClick]);
      const _stopPropagation = useCallback((e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
      }, []);

      return (
        <div>
          <div onClick={show} className={styles.root}>
            <Component {...props}/>
          </div>
          {isVisible && (
            <div className={styles.paranja} onClick={hide}>
              <div onClick={_stopPropagation}>
                <Module>
                  <div className={styles.text}>{text}</div>
                  <div className={styles.buttons}>
                    {negative && <Button onClick={_onNegativeClick} text={negative} theme="minor" />}
                    {positive && <Button onClick={_onPositiveClick} text={positive} />}
                  </div>
                </Module>
              </div>
            </div>
          )}
        </div>
      );
    }
    MyComp.displayName = `withConfirmation(${Component.displayName || Component.name || 'Component'})`;
    return MyComp;
  };
