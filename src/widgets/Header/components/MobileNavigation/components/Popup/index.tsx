'use client'

import React from 'react';
import Link from 'next/link';

import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss'

type Props = {
  onSelect?: () => void;
}

export default function Popup({onSelect}: Props) {
  return (
    <div className={styles.root}>
      <Link href='/' onClick={onSelect} className={styles.button}>
        <p>Code-Free Analytics</p>
        <div className={styles.chevron}>
          <Icons.ChevronUp />
        </div>
      </Link>
      <Link href='https://app.fidi.tech' onClick={onSelect} className={styles.button}>
        <p>Portfolio Tracker</p>
        <div className={styles.chevron}>
          <Icons.ChevronUp />
        </div>
      </Link>
    </div>
  )
}
