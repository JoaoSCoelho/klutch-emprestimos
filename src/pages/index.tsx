import Head from 'next/head'
import { useState } from 'react'
import { InputMoney } from '../components/InputMoney'
import { Subject } from '../components/Subject'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const [desiredValue, setDesiredValue] = useState<number>()

  return (
    <div className={styles.container}>
      <Head>
        <title>Empréstimos | Klutch</title>
      </Head>

      <main className={styles.main}>
        <Subject text="Simulação de Taxas" plusIcon />

        <form className={styles.desiredValue}>
          <strong className={styles.title}>Valor Desejado</strong>

          <InputMoney onChange={(e) => setDesiredValue(Number(e.target.value))} />

          <button type="submit">Calcular</button>
        </form>

      </main>
    </div>
  )
}
