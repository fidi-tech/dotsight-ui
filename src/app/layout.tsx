'use client'

import cx from 'classnames';
import { Inter } from 'next/font/google'

import {Providers} from '@/infra/providers';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';

import styles from './layout.module.scss';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cx(styles.root, inter.className)}>
        <Providers>
          <div className={styles.container}>
            <Header />
            <div className={styles.contentWrapper}>
              <div className={styles.content}>
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
