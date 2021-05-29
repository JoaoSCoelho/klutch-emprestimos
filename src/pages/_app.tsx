import { Header } from '../components/Header'
import { LoanProvider } from '../contexts/LoanContext'

/* Importa estilos válidos para todo o site */
import '../styles/fonts.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <LoanProvider>
      <Header />
      <Component {...pageProps} />
    </LoanProvider>
  )
}

export default MyApp
