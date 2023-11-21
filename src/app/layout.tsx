'use client'

import {Providers} from '@/infra/providers';
import Header from '@/widgets/Header';
import Footer from '@/widgets/Footer';

import styles from './layout.module.scss';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.root}>
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
