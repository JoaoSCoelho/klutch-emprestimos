import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { InputFile } from '../components/InputFile'
import { Main } from '../components/Main'
import { Subject } from '../components/Subject'
import { LoanContext } from '../contexts/LoanContext'
import styles from '../styles/pages/CardData.module.css'

export interface ICard {
  name: string;
  number: string;
  expiration: string;
  cvc: string;
}

export default function CardData() {
  const [inputedCardName, setInputedCardName] = useState<string>()
  const [inputedCardNumber, setInputedCardNumber] = useState<string>()
  const [inputedCardExpiration, setInputedCardExpiration] = useState<string>()
  const [inputedCardCvc, setInputedCardCvc] = useState<string>()
  const { desiredValue, installment, rateTable, client, modality, setCard } = useContext(LoanContext)
  const router = useRouter()

  useEffect(() => {
    if (!desiredValue || !installment || !rateTable || !client || !modality) router.push('/')
  }, [])

  return (
    <div className={styles.container}>
      <Main>
        <Subject text="Solicitar Empréstimo" plusIcon />

        <form onSubmit={(e) => {
          e.preventDefault();

          if (!inputedCardCvc || !inputedCardExpiration || !inputedCardName || !inputedCardNumber) return alert('Preencha todos os dados do cartão!')

          setCard({
            cvc: inputedCardCvc,
            expiration: inputedCardExpiration,
            name: inputedCardName,
            number: inputedCardNumber
          })

          router.push('/confirm-data');
        }}>
          <div className={styles.sectionsContainer}>
            <section className={styles.cardData}>
              <strong className={styles.title}>Insira os dados do Cartão:</strong>

              <Input placeholder="Nome completo" onChange={(e) => setInputedCardName(e.target.value)} />
              <Input placeholder="XXXX XXXX XXXX XXXX" mask="CARD_NUMBER" minLength={16} onChange={(e) => setInputedCardNumber(e.target.value)} />
              <Input placeholder="DD/MM/AAAA" mask="DATE" minLength={10} onChange={(e) => setInputedCardExpiration(e.target.value)} />
              <Input placeholder="CVC" minLength={3} maxLength={4} onChange={(e) => setInputedCardCvc(e.target.value)} />
            </section>

            <section className={styles.attachments}>
              <strong className={styles.title}>Faça o upload dos anexos do cartão:</strong>

              <InputFile description="Cartão de Crédito (Frente)" id="credit-card-front" />
              <InputFile description="Cartão de Crédito (Verso)" id="credit-card-back" />
              <InputFile description="Selfie com cartão de crédito" id="credit-card-selfie" />

              <span>Atenção: As fotos devem estar legíveis, com todas as informações visíveis do cartão.</span>
            </section>
          </div>

          <Button text="Continuar" color="blue" type="submit" />
        </form>
      </Main>
    </div>
  )
}