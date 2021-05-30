import { ChangeEvent } from 'react'
import styles from '../styles/components/InputFile.module.css'

export interface IInputFileProps {
  name?: string;
  id: string;
  description: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
}

export function InputFile({ name, id, description, onChange }: IInputFileProps) {
  return (
    <div className={styles.container}>
      <input type="file" name={name} id={id} onChange={(e) => onChange && onChange(e)} />
      <span className={styles.inputDesc}>{description}</span>
      <label htmlFor={id}>Adicionar</label>
    </div>
  )
}