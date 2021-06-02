import { ChangeEvent, useState } from 'react'
import styles from '../styles/components/InputFile.module.css'

export interface IInputFileProps {
  name?: string;
  id: string;
  description: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
}

export function InputFile({ name, id, description, onChange }: IInputFileProps) {
  const [inputed, setInputed] = useState<string>()

  return (
    <div className={`${styles.container} ${inputed && styles.inputed}`}>
      <input type="file" name={name} id={id} onChange={(e) => {
        console.log(e.currentTarget.files)
        e.currentTarget.files.length ? setInputed(e.currentTarget.files[e.currentTarget.files.length - 1].name) : setInputed(undefined)
        onChange && onChange(e)
      }} />
      <span className={styles.inputDesc}>{inputed || description}</span>
      <label htmlFor={id}>Adicionar</label>
    </div>
  )
}