import { Main } from '../../components/Main'
import { Subject } from '../../components/Subject'
import styles from '../../styles/pages/EmprestimDetails.module.css'
import { useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
import Image from 'next/image'
import api from '../../services/api.json'
import { Button } from '../../components/Button'

export interface ISolicitation {
  id: number,
  clientId: number,
  installmentInterest: number,
  installmentInterestValue: number,
  comission: number,
  comissionValue: number,
  cardExpiration: string,
  installmentValue: number,
  cardNumber: string,
  cardCvc: string,
  desiredValue: number,
  totalLoan: number,
  installmentId: number,
  rateTableId: number,
  contractType: string,
  timestamp: number,
  cardImageFrontURL?: string,
  cardImageBackURL?: string,
  cardImageSelfieURL?: string
}

export default function EmprestimDetails() {
  const [emprestim, setEmprestim] = useState<ISolicitation>()
  const router = useRouter()

  useEffect(() => {
    if (!router.query.id) return;

    api.solicitations.find((solicitation) => solicitation.id + '' === router.query.id)
      ? setEmprestim(api.solicitations.find((solicitation) => solicitation.id + '' === router.query.id))
      : alert('Não existe uma solicitação com esse ID')

  }, [router])

  return (
    <div className={styles.container}>
      <Main>
        <Subject text="Detalhe de Solicitação" />

        <div className={styles.content}>
          <section className={styles.left}>
            <div className={styles.loanSystem}>Solicitação gerada por <span>Sistema Credfica</span></div>

            <div className={styles.fullValue}>
              <strong>Valor Total</strong>
              <span className={styles.money}>R$ {emprestim?.totalLoan.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className={styles.desiredValue}>
              <strong>Valor a depositar</strong>
              <span className={styles.money}>R$ {emprestim?.desiredValue.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className={`${styles.cardFront} ${styles.cardImage}`}>
              <strong>Frente do cartão</strong>
              <Image src={emprestim?.cardImageFrontURL || "/images/file-orange.svg"} width={100} height={100} />
              <a href={emprestim?.cardImageFrontURL || "/images/file-orange.svg"}>Ver comprovante</a>
            </div>
            <div className={`${styles.cardBack} ${styles.cardImage}`}>
              <strong>Verso do cartão</strong>
              <Image src={emprestim?.cardImageBackURL || "/images/file-orange.svg"} width={100} height={100} />
              <a href={emprestim?.cardImageBackURL || "/images/file-orange.svg"}>Ver comprovante</a>
            </div>
            <div className={`${styles.cardSelfie} ${styles.cardImage}`}>
              <strong>Selfie com cartão</strong>
              <Image src={emprestim?.cardImageSelfieURL || "/images/file-orange.svg"} width={100} height={100} />
              <a href={emprestim?.cardImageSelfieURL || "/images/file-orange.svg"}>Ver comprovante</a>
            </div>
          </section>

          <section className={styles.right}>
            <div className={styles.contractType}>Fluxo da Solicitação: <span>{emprestim?.contractType.toLowerCase()}</span></div>
            <div className={styles.modality}>
              <strong>Modalidade:</strong>

              <div className={styles.info}>
                <span>
                  Cartão de Crédito
                  <Image src="/images/credit-card-orange.svg" height={30} width={42} />
                </span>
                <span>
                  Número do cartão: {emprestim?.cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/g, '$1 $2 $3 $4')}
                </span>
                <span className={styles.validityAndCvc}>
                  <span className={styles.cardValidity}>
                    Validade: {emprestim?.cardExpiration.replace(/\d{2}\/(\d{2}\/)\d{2}(\d{2})/g, '$1$2')}
                  </span>
                  <span className={styles.cardCvc}>
                    CVC: {emprestim?.cardCvc}
                  </span>
                </span>
                <span>
                  {api.rateTable[emprestim?.rateTableId - 1]?.installments[emprestim?.installmentId - 1].installments} parcelas de: <span className={styles.money}>R$ {emprestim?.installmentValue.toFixed(2).replace('.', ',')}</span>
                </span>
                <span>
                  Tabela: {api.rateTable[emprestim?.rateTableId - 1]?.name}
                </span>
              </div>
            </div>

            <div className={styles.clientData}>
              <strong>Informações do Cliente:</strong>

              <div className={styles.info}>
                <span>Nome: {api.client[emprestim?.clientId - 1]?.name}</span>
                <span>CPF: {api.client[emprestim?.clientId - 1]?.cpf}</span>
                <span>Agência: {api.client[emprestim?.clientId - 1]?.bank.agency}</span>
                <span>Banco: {api.client[emprestim?.clientId - 1]?.bank.label}</span>
                <span>Tipo: {api.client[emprestim?.clientId - 1]?.bank.accountTypeLabel}</span>
                <span>Número da conta: {api.client[emprestim?.clientId - 1]?.bank.accountNumber}</span>
              </div>
            </div>

            <div className={styles.generalInfo}>
              <strong>Informações Gerais:</strong>

              <span className={styles.date}>
                Data: {new Date(emprestim?.timestamp).getDate().toString().padStart(2, '0')}/{(new Date(emprestim?.timestamp).getMonth() + 1).toString().padStart(2, '0')}/{new Date(emprestim?.timestamp).getFullYear().toString().padStart(4, '0')}
              </span>

              <div className={styles.loanState}>
                <Image src="/images/alert.svg" height={25} width={25} />
                <span>Aguardando</span>
              </div>

              <div className={styles.buttonsContainer}>
                <Button color="blue" type="button" >
                  <div>
                    <Image src="/images/check-circle.svg" height={25} width={25} />
                    <span>Pré Aprovar</span>
                  </div>
                </Button>
                <Button color="red" type="button" >
                  <div>
                    <Image src="/images/alert.svg" height={25} width={25} />
                    <span>Reprovar</span>
                  </div>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Main>
    </div>
  )
}