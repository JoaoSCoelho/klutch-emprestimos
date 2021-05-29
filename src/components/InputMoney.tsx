import { ChangeEvent } from 'react';
import styles from '../styles/components/InputMoney.module.css'

export interface IInputMoneyProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  className?: string;
}

export function InputMoney({ onChange, className }: IInputMoneyProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <span className={styles.currency}>R$</span>
      <input
        type="number"
        min="300"
        max="10000"
        step="0.01"
        defaultValue="0.00"
        title="O valor deve estar entre R$300.00 e R$10000.00"
        onChange={onChange} />
    </div>
  )
}