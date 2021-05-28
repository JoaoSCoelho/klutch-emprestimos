import Image from 'next/image'
import styles from '../styles/components/Subject.module.css'

export interface ISubjectProps {
  plusIcon?: boolean;
  text: string;
}

export function Subject({ text, plusIcon }: ISubjectProps) {

  return (
    <div className={styles.container}>
      {plusIcon && <Image src="/images/plus-blue.svg" width={67} height={67} />}

      <Image src="/images/folder-orange.svg" width={115} height={115} />

      <strong className={styles.title}>{text}</strong>
    </div>
  )
}