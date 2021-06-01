import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Button } from '../components/Button'
import { GreenCardBase } from '../components/GreenCardBase'
import { Main } from '../components/Main'
import { Subject } from '../components/Subject'
import { LoanContext } from '../contexts/LoanContext'
import styles from '../styles/pages/Success.module.css'

export default function Success() {
  const { client, card, desiredValue, installment, id } = useContext(LoanContext);
  const cardFlag = (cardNumber: string) => {
    cardNumber = cardNumber.replace(/ /g, '')

    if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) return 'AMERICAN_EXPRESS'
    if (cardNumber.startsWith('35')) return 'JCB'
    if (cardNumber.startsWith('6011') || cardNumber.startsWith('65')) return 'DISCOVER'
    if (cardNumber.startsWith('36') || cardNumber.startsWith('38')) return 'DINNERS_CLUB'
    if (Number(cardNumber.slice(0, 2)) >= 51 && Number(cardNumber.slice(0, 2)) <= 55) return 'MASTERCARD'
    else return 'VISA'
  }
  const fullValue = desiredValue * (1 + (installment?.installmentInterest / 100 + installment?.comission / 100));
  const fullValueFormated = `R$ ${fullValue?.toFixed(2).replace('.', ',')}`
  const installmentValueFormated = `R$ ${(fullValue / installment?.installments).toFixed(2).replace('.', ',')}`
  const router = useRouter();

  useEffect(() => {
    if (!client) router.push('/')
  }, [])

  return (
    <div className={styles.container}>
      <Main>
        <Subject text="Solicitar empréstimo" plusIcon />

        <div className={styles.content}>
          <strong className={styles.title}>Solicitação Realizada com Sucesso!</strong>

          <section className={styles.solicitationSummary}>
            <strong>Resumo da solicitação</strong>

            <div className={styles.cardsContainer}>
              <GreenCardBase>
                <span className={styles.name}>{client?.name}</span>
                <span className={styles.phone}>{client?.phone.replace(/(^\d{2})(\d{1})(\d{4})(\d{4})/g, '$1 $2 $3-$4')}</span>
              </GreenCardBase>
              <GreenCardBase>
                <span className={styles.key}>Taxa de Juros</span>
                <span className={styles.installmentInterest}>{installment?.installmentInterest}%</span>
              </GreenCardBase>
              <GreenCardBase>
                <Image src="/images/credit-card-orange.svg" width={55} height={40} />
                <span className={styles.endCardNumber}>{card?.number.replace(/ /g, '').slice(card.number.length - 7)}</span>
                <span className={styles.cardFlag}>{card && cardFlag(card.number)}</span>
                <span className={styles.cardValidity}>{card?.expiration.replace(/\d{2}\/(\d{2}\/)\d{2}(\d{2})/g, '$1$2')}</span>
              </GreenCardBase>
              <GreenCardBase>
                <span className={styles.key}>Parcelas:</span>
                <span className={styles.installments}>{installment?.installments}</span>
              </GreenCardBase>
              <GreenCardBase>
                <span className={styles.key}>Valor desejado:</span>
                <span className={`${styles.desiredValue} ${styles.money}`}>R$ {desiredValue?.toFixed(2).replace('.', ',')}</span>
              </GreenCardBase>
              <GreenCardBase>
                <span className={styles.key}>Valor da Parcela:</span>
                <span className={`${styles.installmentValue} ${styles.money}`}>{installmentValueFormated}</span>
              </GreenCardBase>
              <GreenCardBase>
                <span className={styles.key}>Valor Total do Empréstimo:</span>
                <span className={`${styles.fullValue} ${styles.money}`}>{fullValueFormated}</span>
              </GreenCardBase>
            </div>
          </section>

          <Link href={'emprestim/' + id}>
            <a target="_self">
              <Button color="blue" type="button" text="Detalhe da Solicitação" />
            </a>
          </Link>

          <span>O CredFica avaliará a solicitação.</span>
        </div>
      </Main>
    </div>
  )
}