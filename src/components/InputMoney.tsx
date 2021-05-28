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
      <input type="number" min="300" max="10000" onChange={(e) => {
        e.target.value = Number(e.target.value).toFixed(2) + ''
        onChange(e)
      }} />
    </div>
  )
}