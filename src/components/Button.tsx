import { MouseEvent } from 'react'
import styles from '../styles/components/Button.module.css'

export interface IButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset';
  color: 'orange' | 'blue';
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => any;
}

export function Button({ text, type, color, disabled, onClick }: IButtonProps) {
  return (
    <button
      onClick={(e) => onClick && onClick(e)}
      type={type}
      disabled={disabled}
      className={`${styles.container} ${styles[color]}`}
    >
      {text}
    </button>
  )
}