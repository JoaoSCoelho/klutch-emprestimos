import styles from '../styles/components/Button.module.css'

export interface IButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset'
}

export function Button({ text, type }: IButtonProps) {
  return (
    <button type={type} className={styles.container}>{text}</button>
  )
}