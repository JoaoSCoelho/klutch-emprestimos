import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Main } from '../components/Main'
import { LoanContext } from '../contexts/LoanContext'
import styles from '../styles/pages/Solicitations.module.css'
import { ISolicitation } from './emprestim/[id]'
import api from '../services/api.json'
import Link from 'next/link'

export default function Solicitations() {
  const [solicitations, setSolicitations] = useState<ISolicitation[]>()
  const { client } = useContext(LoanContext)
  const router = useRouter()

  useEffect(() => {
    if (!client) {
      router.push('search-client?redirect=solicitations')
      return;
    }

    axios.get('/api/solicitations', { params: { clientId: client.id } })
      .then(({ data }) => {
        setSolicitations(data)
      })
      .catch(() => alert('Houve um erro ao buscar suas solicitações!'))
  }, [])

  return (
    <div className={styles.container}>
      <Main>
        <div className={styles.solicitationsContainer}>
          {
            solicitations?.map((solicitation) => {
              return (
                <Link href={'/emprestim/' + solicitation.id}>
                  <a>
                    <div className={styles.solicitationCard} key={solicitation.id}>
                      <div className={styles.installments}>
                        <span>
                          {api.rateTable.find((rt) => rt.id === solicitation.rateTableId)?.installments.find((installment) => installment.id === solicitation.installmentId)?.installments} parcelas de
                  </span>
                        <span className={styles.money}>
                          R$ {solicitation.installmentValue.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className={styles.desiredValue}>
                        <span>Valor desejado</span>
                        <span className={styles.money}>
                          R$ {solicitation.desiredValue.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      <div className={styles.date}>
                        {new Date(solicitation.timestamp).getDate().toString().padStart(2, '0')}/{(new Date(solicitation.timestamp).getMonth() + 1).toString().padStart(2, '0')}/{new Date(solicitation.timestamp).getFullYear().toString().padStart(4, '0')}
                      </div>
                    </div>
                  </a>
                </Link>
              )
            }) || 'Carregando...'
          }
        </div>
      </Main>
    </div>
  )
}