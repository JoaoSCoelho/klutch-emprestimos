import { Button } from '../components/Button'
import { Main } from '../components/Main'
import { Subject } from '../components/Subject'
import styles from '../styles/pages/SearchClient.module.css'
import api from '../services/api.json'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { LoanContext } from '../contexts/LoanContext'
import { useRouter } from 'next/router'

export interface IClientBank {
  label: string,
  accountTypeLabel: string,
  accountNumber: string
}

export interface IClient {
  id: number,
  name: string,
  phone: string,
  cpf: string,
  bank: IClientBank
}

export default function SearchClient() {
  const [cpf, setCpf] = useState<string>()
  const { desiredValue, installment, rateTable, client, setClient } = useContext(LoanContext)
  const router = useRouter()

  function search(cpf: string) {
    const onlyNumberCpf = cpf && cpf.replace(/[\.-]/g, '');
    const client = api.client.find((client) => client.cpf === onlyNumberCpf)

    return client;
  }

  useEffect(() => {
    if (!desiredValue || !installment || !rateTable) router.push('/')
  }, [])

  return (
    <div className={styles.container}>
      <Main className={styles.main}>
        <Subject text="Solicitar Empréstimo" plusIcon />

        <form className={styles.searchByCpf} onSubmit={(e) => {
          e.preventDefault()

          const client = search(cpf)
          setClient(client || null)
          !client && setCpf('')
        }}>
          <strong className={styles.title}>Busque o Cliente</strong>

          <input
            type="text"
            maxLength={14}
            minLength={13}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className={(client === null) && styles.notFound}
            placeholder={(client === null) ? 'Cliente não encontrado!' : 'XXX.XXX.XXX-XX'}
            onKeyDown={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
              e.currentTarget.value = e.currentTarget.value.replace(/(\d{3})(\d)/, "$1.$2")
              e.currentTarget.value = e.currentTarget.value.replace(/(\d{3})(\d)/, "$1.$2")
              e.currentTarget.value = e.currentTarget.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            }}
          />

          <Button text="Buscar" type="submit" color="blue" />
        </form>

        {client && (
          <div className={styles.clientFound}>
            <strong>Cliente encontrado:</strong>
            <span className={styles.cpf}>{cpf}</span>
            <span className={styles.clientName}>{client.name}</span>

            <Link href="/modality">
              <a rel="next" target="_self">
                <Button text="Solicitar" type="button" color="blue" />
              </a>
            </Link>
          </div>
        )}
      </Main>
    </div>

  )
}