import styles from '../styles/components/CardKeyValue.module.css'

export interface ICardKeyValueProps {
  propName: string;
  value: string | number;
  green?: boolean;
  className?: string;
}

export function CardKeyValue({ propName, value, green, className }: ICardKeyValueProps) {
  return (
    <div className={`${styles.container} ${green && styles.green} ${className}`}>
      <span className={styles.key}>{propName}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}