import Image from 'next/image';
import { ReactNode } from 'react';
import styles from '../styles/components/GreenCardBase.module.css'

export interface IGreenCardBase {
  children: ReactNode;
}

export function GreenCardBase({ children }: IGreenCardBase) {
  return (
    <div className={styles.container}>
      {children}
      <Image src="/images/check-blue.svg" width={30} height={30} />
    </div>
  )
}