'use client'

import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

import {Module} from '@/shared/ui/Module';
import {Button} from '@/shared/ui/Button';
import {Icons} from '@/shared/ui/icons';

import styles from './index.module.scss';

const Header = () => {
  const router = useRouter();
  const disconnect = () => {
    router.refresh()
    router.push('/api/auth/logout');
  }
  return (
    <Module className={styles.root}>
      <a href="https://fidi.tech" className={styles.badge}>
        <div className={styles.logo} />
      </a>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>My Pipelines</Link>
      </div>
      <Button onClick={disconnect} icon={<Icons.Disconnect />} theme="muted" className={styles.disconnect} />
    </Module>
  )
}

export default Header;