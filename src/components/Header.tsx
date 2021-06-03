import { useContext, useState } from 'react'
import styles from '../styles/components/Header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { SideBarContext } from '../contexts/SideBarContext'

export function Header() {
  /* Variável do estado para saber se o menu lateral está aberto */
  const { open, setOpen } = useContext(SideBarContext)

  return (
    <header className={styles.container}>
      {/* Botão de menu à esquerda do cabeçalho */}
      <button
        className={`${styles.sandwichMenuButton} ${open && styles.open}`}
        type="button"
        title="Abrir menu"
        onClick={() => setOpen(!open)}
      >
        <svg viewBox="0 0 45 30" width="45" height="30">
          <rect x="0" y="0" width="45" height="5" fill="white" />
          <rect x="0" y="12.5" width="45" height="5" fill="white" />
          <rect x="0" y="25" width="45" height="5" fill="white" />
        </svg>
      </button>

      {/* Logo da Klutch que linka para página inicial */}
      <Link href="/">
        <a target="_self" title="Página inicial">
          <Image src="/images/logo-klutch-white.svg" width={120} height={30} title="Klutch Tecnologia" />
        </a>
      </Link>
    </header>
  )
}