'use client'

import React, {useCallback} from 'react';
import Link from 'next/link';
import cx from 'classnames';
import {useRouter} from 'next/navigation';

import {Module} from '@/shared/ui/Module';
import {createPipeline} from '@/shared/api/dotsight';

import styles from './index.module.scss';

const Header = () => {
  const router = useRouter();
  const onCreate = useCallback(async () => {
    const result = await createPipeline({});
    if (result?.data?.id) {
      router.push(`/pipeline/${result?.data?.id}`);
    }
  }, [router]);
  return (
    <Module className={styles.root}>
      <a href="https://fidi.tech" className={styles.badge}>
        <div className={styles.logo} />
      </a>
      <Link href="/" className={cx(styles.link, styles.dashboard)}>Dashboard</Link>
      <div className={styles.link} onClick={onCreate}>Create Data Pipeline</div>
    </Module>
  )
}

export default Header;