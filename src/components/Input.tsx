import Image from 'next/image'
import { ChangeEvent, KeyboardEvent } from 'react'
import styles from '../styles/components/Input.module.css'

export interface IInputProps {
  type?: 'text' | 'number';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => any;
  placeholder?: string;
  mask?: 'DATE' | 'CARD_NUMBER'
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}

export function Input({ type = 'text', onChange, placeholder, onKeyDown, mask, maxLength, minLength, max, min }: IInputProps) {
  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        maxLength={mask === 'DATE' ? 10 : (mask === 'CARD_NUMBER' ? 19 : maxLength)}
        minLength={minLength}
        min={min}
        max={max}
        type={type}
        onChange={(e) => onChange && onChange(e)}
        onKeyDown={(e) => {
          if (mask === 'DATE') {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
            e.currentTarget.value = e.currentTarget.value.replace(/(\d{2})(\d)/, "$1/$2")
            e.currentTarget.value = e.currentTarget.value.replace(/(\d{2})(\d)/, "$1/$2")
            e.currentTarget.value = e.currentTarget.value.replace(/(\d{2})(\d{4})$/, "$1/$2")
          } else if (mask === 'CARD_NUMBER') {
            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
            e.currentTarget.value = e.currentTarget.value.replace(/(\d{4})(\d)/, "$1 $2")
            e.currentTarget.value = e.currentTarget.value.replace(/(\d{4})(\d)/, "$1 $2")
            e.currentTarget.value = e.currentTarget.value.replace(/(\d{4})(\d)/, "$1 $2")
            e.currentTarget.value = e.currentTarget.value.replace(/(\d{4})(\d)/, "$1 $2")
          }

          onKeyDown && onKeyDown(e)
        }}
      />

      {/* {mask === 'CARD_NUMBER' && (
        <div className={styles.cardFlag}>
          <Image width={30} height={20} src={`/${}.svg`} />
        </div>
      )} */}
    </div>
  )
}