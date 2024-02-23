import React from 'react';
import cx from 'classnames';

import styles from './index.module.scss';

type Props = {
  header: string[],
  rows: (string | undefined)[][],
  palette?: string[],
}

export const Table = ({header, rows, palette}: Props) => {
  return (
    <table className={cx(styles.root, palette && styles.withMarker)}>
      <tbody>
        {header &&
          <>
            <tr className={styles.header}>
              {header.map(value => <th className={styles.cell} key={value}>{value}</th>)}
            </tr>
            <tr className={styles.spacer}/>
          </>
        }
        {rows.map((row, i) => (
          <tr className={styles.row} key={i}>
            {row.map((value, j) =>
              <td className={styles.cell} key={`${j}${i}`}>
                {j === 0 && palette
                  ? <div className={styles.marker} style={{color: palette[i % palette.length]}} />
                  : null
                }
                {value}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
