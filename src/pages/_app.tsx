import { Header } from '../components/Header'

/* Importa estilos válidos para todo o site */
import '../styles/fonts.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<>
    <Header />
    <Component {...pageProps} />
  </>)
}

export default MyApp
