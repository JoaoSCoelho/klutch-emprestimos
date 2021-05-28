import Head from 'next/head'
import { Subject } from '../components/Subject'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Empréstimos | Klutch</title>
      </Head>

      <main className={styles.main}>
        <Subject text="Simulação de Taxas" plusIcon />
      </main>
    </div>
  )
}
