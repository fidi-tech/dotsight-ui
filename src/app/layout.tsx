'use client'

import {Providers} from '@/infra/providers';
import 'react-tooltip/dist/react-tooltip.css';

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
          {children}
        </Providers>
      </body>
    </html>
  )
}
