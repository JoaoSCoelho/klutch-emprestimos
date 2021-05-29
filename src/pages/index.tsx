import Head from 'next/head'
import { useState } from 'react'
import { InputMoney } from '../components/InputMoney'
import { Subject } from '../components/Subject'
import styles from '../styles/pages/Home.module.css'
import api from '../services/api.json'
import { RateTable } from '../components/RateTable'
import { Button } from '../components/Button'

export default function Home() {
  const [desiredValue, setDesiredValue] = useState<number>();
  const [showTable, setShowTable] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Empréstimos | Klutch</title>
      </Head>

      <main className={styles.main}>
        <Subject text="Simulação de Taxas" plusIcon />

        <form className={styles.desiredValue} onSubmit={(e) => {
          e.preventDefault();
          setShowTable(true);
        }}>
          <strong className={styles.title}>Valor Desejado</strong>

          <InputMoney onChange={(e) => setDesiredValue(Number(e.target.value))} />

          <Button text="Calcular" type="submit" />
        </form>

        {showTable && (
          <RateTable {...api.rateTable[0]} className={`${styles.rateTable}`} />
        )}
      </main>
    </div>
  )
}
