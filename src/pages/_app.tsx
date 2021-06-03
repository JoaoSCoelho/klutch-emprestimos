import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { LoanProvider } from '../contexts/LoanContext'
import { SideBarProvider } from '../contexts/SideBarContext'

/* Importa estilos válidos para todo o site */
import '../styles/fonts.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SideBarProvider>
      <LoanProvider>
        <Header />
        <SideBar />
        <Component {...pageProps} />
      </LoanProvider>
    </SideBarProvider>
  )
}

export default MyApp
