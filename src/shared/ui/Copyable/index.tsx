import React, {ReactNode} from 'react';
import {Tooltip} from 'react-tooltip';

import styles from './index.module.scss';
import {useEnhance} from './hooks';

type Props = {
  children: ReactNode,
  value: string,
  tooltip?: ReactNode,
  onHover?: boolean,
}

const Copyable = ({value, children, onHover}: Props) => {
  const {
    onCopy,
    tooltipRef,
    copyTooltipId,
    copyTooltip,
    tooltipContent,
  } = useEnhance({value, onHover});

  return (
    <div className={styles.root} onClick={onCopy} {...copyTooltip}>
      {children}
      <Tooltip
        id={copyTooltipId}
        ref={tooltipRef}
        className={styles.tooltipContent}
        arrowColor="transparent"
        clickable={!onHover}
        openOnClick={!onHover}
        render={tooltipContent}
      />
    </div>
  )
}

export default Copyable;