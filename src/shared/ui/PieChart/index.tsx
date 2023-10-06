import * as React from 'react';

import styles from './index.module.scss';

type Props = {
  pie: Array<{
    id: string;
    percent: number;
    color: string;
  }>;
  children?: React.ReactNode;
};

export const PieChart = ({pie, children}: Props) => {
  const r = 34;

  const fullCircleLength = 2 * Math.PI * r;

  const pieces = React.useMemo(() => {
    const result = [];

    let currentOffset = -90;
    let accumulatedLength = 0;

    for (let i = 0; i < pie.length; i++) {
      const piece = pie[i];
      const pieceLength = pie.length - 1 === i
        ? fullCircleLength - accumulatedLength
        : fullCircleLength * piece.percent;

      result.push({
        id: piece.id,
        transform: `rotate(${currentOffset}deg)`,
        stroke: piece.color,
        strokeDasharray: `${pieceLength} ${fullCircleLength}`,
      });

      currentOffset += piece.percent * 360;
      accumulatedLength += pieceLength;
    }

    return result;
  }, [pie, fullCircleLength]);

  return (
    <svg className={styles.root} viewBox="0 0 100 100">
      {pieces.map(piece => (
        <circle key={piece.id} className={styles.part} r={r} cx="50" cy="50" style={piece} />
      ))}
      <circle className={styles.center} r={r + 5} cx="50" cy="50" />
      <foreignObject x="0" y="0" width="100" height="100">
        <div className={styles.content}>
          {children}
        </div>
      </foreignObject>
    </svg>
  )
};
