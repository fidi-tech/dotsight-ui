import React, {useEffect, useRef, useState} from 'react';
import {Tooltip} from 'react-tooltip';

import styles from './index.module.scss';

type Props = {
  text: string,
};

const CroppedText = ({text}: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    () => {
      const current = ref.current;
      if (!current) {
        return;
      }
      if (current.scrollWidth > current.offsetWidth) {
        setShowTooltip(true)
      } else {
        setShowTooltip(false)
      }
    },
    [text]
  );

  return (
    <div className={styles.root} ref={ref}>
      <p data-tooltip-id={text} data-tooltip-content={text}>{text}</p>
      {showTooltip && <Tooltip id={text} />}
    </div>
  )
}

export default CroppedText;