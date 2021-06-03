import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { CardKeyValue } from '../components/CardKeyValue'
import { Main } from '../components/Main'
import { RateTable } from '../components/RateTable'
import { Subject } from '../components/Subject'
import { LoanContext } from '../contexts/LoanContext'
import styles from '../styles/pages/ConfirmData.module.css'
import { storage } from '../firebase'
import axios from 'axios'

export type IContractType = 'AUTOMATIC' | 'MANUAL'

export default function ConfirmData() {
  const { desiredValue, installment, rateTable, client, modality, card, setContractType, contractType, setId } = useContext(LoanContext);
  const formatedDesiredValue = `R$ ${desiredValue?.toFixed(2).replace('.', ',')}`;
  const fullValue = desiredValue * (1 + (installment?.installmentInterest / 100 + installment?.comission / 100));
  const fullValueFormated = `R$ ${fullValue?.toFixed(2).replace('.', ',')}`;
  const installmentValueFormated = `R$ ${(fullValue / installment?.installments).toFixed(2).replace('.', ',')}`
  const [sending, setSending] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!desiredValue || !installment || !rateTable || !client || !modality || !card) router.push('/')
  }, [])

  return (
    <div className={styles.container}>
      <Main>
        <div className={styles.topPage}>
          <Subject plusIcon text="Solicitar Empréstimo" />

          <CardKeyValue propName="Tabela:" value={rateTable?.name} />
        </div>

        <div className={styles.loanInfo}>
          <CardKeyValue propName="Valor desejado:" value={formatedDesiredValue} green />
          <CardKeyValue propName="Valor Total do Empréstimo:" value={fullValueFormated} green />
          <CardKeyValue propName="Parcelas:" value={installment?.installments} />
          <CardKeyValue propName="Valor da parcela:" value={installmentValueFormated} />
        </div>

        <form
          className={`${styles.contractType} ${styles[contractType?.toLocaleLowerCase()]}`}
          onSubmit={async (e) => {
            e.preventDefault();
            setSending(true);

            card.photos.front && await storage.ref('cards/' + card.photos.front.name).put(card.photos.front)
            card.photos.back && await storage.ref('cards/' + card.photos.back.name).put(card.photos.back)
            card.photos.selfie && await storage.ref('cards/' + card.photos.selfie.name).put(card.photos.selfie)

            axios.post('/api/loan', {
              clientId: client.id,
              installmentInterest: installment.installmentInterest,
              installmentInterestValue: desiredValue * (installment.installmentInterest / 100),
              comission: installment.comission,
              comissionValue: desiredValue * (installment.comission / 100),
              cardExpiration: card.expiration,
              installmentValue: (fullValue / installment.installments),
              cardNumber: card.number.replace(/ /g, ''),
              cardCvc: card.cvc,
              desiredValue,
              totalLoan: fullValue,
              installmentId: installment.id,
              rateTableId: rateTable.id,
              contractType,
              cardImageFrontURL: card.photos.front ? await storage.ref('cards/' + card.photos.front.name).getDownloadURL() : undefined,
              cardImageBackURL: card.photos.back ? await storage.ref('cards/' + card.photos.back.name).getDownloadURL() : undefined,
              cardImageSelfieURL: card.photos.selfie ? await storage.ref('cards/' + card.photos.selfie.name).getDownloadURL() : undefined
            })
              .then(({ data: { solicitationID } }) => {
                setId(solicitationID)
                router.push('/success')
              })
              .catch(() => {
                alert('Houve um erro ao criar uma nova solicitação!')
              })

            setSending(false)
          }}
        >
          <strong>Escolha o tipo de contrato:</strong>

          <div className={`${styles.inputsContainer}`}>
            <input type="radio" name="contract-type" id="automatic" defaultChecked onChange={() => setContractType('AUTOMATIC')} />
            <label htmlFor="automatic">Automático</label>

            <input type="radio" name="contract-type" id="manual" onChange={() => setContractType('MANUAL')} />
            <label htmlFor="manual">Manual</label>
          </div>

          <Button color="blue" type="submit" className={styles.concludeButton} disabled={sending}>
            {sending
              ? (<svg viewBox={`0 0 90 90`}>
                <circle
                  className={styles.circle}
                  fill="none"
                  cx={48}
                  cy={48}
                  r={39}
                />
              </svg>)
              : (<>
                <Image src="/images/check-white.svg" width={40} height={30} />
                <span>Concluir</span>
              </>)
            }
          </Button>
        </form>

        {rateTable && <RateTable disabled className={styles.rateTable} {...rateTable} />}
      </Main>
    </div>
  )
}