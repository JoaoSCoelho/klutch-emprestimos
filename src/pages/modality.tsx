import Link from 'next/link'
import { useContext } from 'react'
import { Button } from '../components/Button'
import { Main } from '../components/Main'
import { Subject } from '../components/Subject'
import { LoanContext } from '../contexts/LoanContext'
import styles from '../styles/pages/Modality.module.css'

export type IModality = 'CREDIT_CARD' | 'PAYROLL_LOANS'

export default function Modality() {
  const { setModality } = useContext(LoanContext)

  return (
    <div className={styles.container}>
      <Main>
        <Subject plusIcon text="Solicitar Empréstimo" />

        <div className={styles.content}>
          <strong>Escolha a modalidade:</strong>

          <Link href="/card-data">
            <a rel="next" target="_self">
              <Button color="blue" text="Cartão de Crédito" type="button" onClick={() => setModality('CREDIT_CARD')} />
            </a>
          </Link>

          <Button color="blue" text="Crédito Consignado" type="button" disabled />
        </div>
      </Main>
    </div>
  )
}