import React, {ReactNode} from 'react';
import {Tooltip as ReactTooltip} from 'react-tooltip';

import styles from './index.module.scss';
import {useEnhance} from './hooks';

type Props = {
  children: ReactNode,
  Tooltip: ReactNode,
}

const WithTooltip = ({children, Tooltip}: Props) => {
  const {
    tooltipRef,
    tooltipId,
    tooltip,
    tooltipContent,
  } = useEnhance({Tooltip});

  return (
    <div className={styles.root} {...tooltip}>
      {children}
      <ReactTooltip
        id={tooltipId}
        ref={tooltipRef}
        className={styles.tooltipContent}
        arrowColor="transparent"
        render={tooltipContent}
      />
    </div>
  )
}

export default WithTooltip;