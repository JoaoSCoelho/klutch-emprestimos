import Head from 'next/head'
import { useState } from 'react'
import { InputMoney } from '../components/InputMoney'
import { Subject } from '../components/Subject'
import api from '../services/api.json'
import { IInstallment, ITable, RateTable } from '../components/RateTable'
import styles from '../styles/pages/Home.module.css'
import { Button } from '../components/Button'
import Link from 'next/link'

export default function Home() {
  const [desiredValue, setDesiredValue] = useState<number>();
  const [showTables, setShowTables] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<ITable>();
  const [selectedInstallment, setSelectedInstallment] = useState<IInstallment>()

  return (
    <div className={styles.container}>
      <Head>
        <title>Empréstimos | Klutch</title>
      </Head>

      <main className={styles.main}>
        <Subject text="Simulação de Taxas" plusIcon />


        <form className={styles.desiredValue} onSubmit={(e) => {
          e.preventDefault();
          setShowTables(true);
        }}>
          <strong className={styles.title}>Valor Desejado</strong>

          <InputMoney onChange={(e) => setDesiredValue(Number(e.target.value))} />

          <Button text="Calcular" type="submit" />
        </form>


        {showTables && (
          <form className={styles.desiredTableAndInstallment}>
            {api.rateTable.map((rateTable) => (
              <div className={styles.inputContainer} key={rateTable.id}>
                <input
                  type="radio"
                  name='rate-table'
                  id={rateTable.id + ''}
                  value={rateTable.id}
                  onChange={(e) => e.target.checked && setSelectedTable(rateTable)}
                />

                <label htmlFor={rateTable.id + ''}>
                  <RateTable
                    disabled={selectedTable?.id !== rateTable.id}
                    {...rateTable}
                    className={`${styles.rateTable}`}
                    onSelect={(installmentID) => setSelectedInstallment(rateTable.installments.find((installment) => installment.id === installmentID))}
                    selectedInstallmentID={selectedInstallment?.id}
                  />
                </label>
              </div>
            ))}

            <footer className={styles.tableAndInstallmentInfo}>
              <div className={styles.content}>
                <div className={styles.info}>
                  <div className={styles.tableName}>Nome: {selectedTable?.name}</div>
                  <div className={styles.installments}>Parcelas: {selectedInstallment?.installments || ''}</div>
                  <div className={styles.installmentValue}>
                    Valor da Parcela: {selectedInstallment && `R$${selectedInstallment?.installmentValue.toFixed(2).replace('.', ',')}`}
                  </div>
                </div>

                <Link href={`/search-client?rate-table=${selectedTable?.id}&installment=${selectedInstallment?.id}`}>
                  <a rel="next" target="_self">
                    <Button text="Avançar" type="submit" />
                  </a>
                </Link>
              </div>
            </footer>
          </form>
        )}
      </main>
    </div>
  )
}
