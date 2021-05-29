import styles from '../styles/components/Button.module.css'

export interface IButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset';
  color: 'orange' | 'blue';
  disabled?: boolean;
}

export function Button({ text, type, color, disabled }: IButtonProps) {
  return (
    <button type={type} disabled={disabled} className={`${styles.container} ${styles[color]}`}>{text}</button>
  )
}