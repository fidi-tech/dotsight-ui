import React, {forwardRef} from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  className?: string,
  style?: React.CSSProperties,
  dataTestId?: string,
};

export const Module = forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(
    function Module(props, ref) {
        const {className, dataTestId, children, style} = props;
        return (
            <div className={cx(styles.root, className)} data-testid={dataTestId} ref={ref} style={style}>
                {children}
            </div>
        );
    }
);
