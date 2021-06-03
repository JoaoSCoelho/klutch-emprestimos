import Link from 'next/link'
import { useContext } from 'react'
import { SideBarContext } from '../contexts/SideBarContext'
import styles from '../styles/components/SideBar.module.css'

export function SideBar() {
  const { open } = useContext(SideBarContext);

  return (
    <div className={styles.container} style={{ display: open ? 'initial' : 'none' }}>
      <ul>
        <li>
          <Link href="/search-client?redirect=solicitations">
            <a>
              <div>
                Solicitações
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}