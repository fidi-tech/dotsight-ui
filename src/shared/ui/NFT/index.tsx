import React, {useCallback, useMemo} from 'react';
import cx from 'classnames';

import CroppedText from '@/shared/ui/CroppedText';
import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

type Props = {
  name: string,
  collectionName: string,
  thumbnail: string,
  detailUrl?: string,
  lastPrice?: number,
  chain: string,
}

const CHAIN_ICON: Record<string, any> = {
  'eth': Icons.Ethereum,
}

const NFT = ({name, collectionName, thumbnail, detailUrl, lastPrice, chain}: Props) => {
  const ChainIcon = useMemo(() => CHAIN_ICON[chain], [chain]);
  const onClick = useCallback(() => {
    if (detailUrl) {
      window.open(detailUrl);
    }
  }, [detailUrl]);

  return (
    <div className={styles.root}>
      <img
        className={cx(styles.image, {[styles.clickable]: !!detailUrl})}
        src={thumbnail}
        onClick={onClick}
        alt={name}
      />
      <div className={styles.description}>
        <div className={styles.collectionName}>
          <CroppedText text={collectionName} />
        </div>
        <div className={styles.nftName}>
          <CroppedText text={name} />
        </div>
      </div>
      {
        lastPrice &&
        <div className={styles.pricing}>
          <div className={styles.oldPrice}>
            <div className={styles.clock}>
              <Icons.Clock />
            </div>
            <div>
              {lastPrice}
            </div>
            <div className={styles.chainIcon}>
              {ChainIcon && <ChainIcon />}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default NFT;