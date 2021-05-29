import styles from '../styles/components/Button.module.css'

export interface IButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset';
  color: 'orange' | 'blue';
}

export function Button({ text, type, color }: IButtonProps) {
  return (
    <button type={type} className={`${styles.container} ${styles[color]}`}>{text}</button>
  )
}