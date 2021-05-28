import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Empréstimos | Klutch</title>
      </Head>

      <Header />

      <main className={styles.main}>

      </main>
    </div>
  )
}
