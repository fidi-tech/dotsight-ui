import React from 'react';

import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode,
}
const MainLayout = (props: Props) =>
  <div className={styles.container}>
    <Header />
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        {props.children}
      </div>
      <Footer />
    </div>
  </div>

export default MainLayout;
