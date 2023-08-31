'use client'
import { Bars3Icon, UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useReducer, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Icon } from '../Tools'

import styles from './Header.module.scss'
import MenuItens from './MenuItens'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { label: 'Home', src: '/home' },
  { label: 'Sobre', src: '/sobre' },
  { label: 'Serviços', src: '/servicos' },
  { label: 'Contato', src: '/contato' },
  { label: 'Trabalhe Conosco', src: '/trabalhe-conosco' },
]

function reducer(state: any, action: { type: string; value?: any }) {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        menuIsOpen: true,
      }
    case 'CLOSE':
      return {
        ...state,
        menuIsOpen: false,
      }
    case 'SWITCH_PAGE':
      return {
        ...state,
        currentPage: action.value,
      }
  }
}

export default function Header() {
  const currentPage = usePathname()
  const initialReducerState = {
    currentPage: tabs[0],
    menuIsOpen: false,
  }
  const [state, dispatch] = useReducer(reducer, initialReducerState)
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null)
  const handleActualPage = (action: { type: string; value: any }) => {
    return dispatch(action)
  }
  function setMenuOpen(isOpen: boolean) {
    if (isOpen) {
      dispatch({ type: 'OPEN' })
    } else {
      dispatch({ type: 'CLOSE' })
    }
  }

  // Não permite scroll na tela enquanto o menu está aberto
  useEffect(() => {
    // Verificar se o código está sendo executado no lado do cliente
    if (typeof window !== 'undefined') {
      document.body.style.overflow = state.isMenuOpen ? 'hidden' : 'auto'
    }
  }, [state.isMenuOpen]) // A função no useEffect será executada sempre que isLoading mudar

  useEffect(() => {
    if (currentPage !== state.currentPage.src) {
      // Se a página atual for diferente da página no estado, atualize a página atual no estado
      // Isso mudará o estado para refletir a página atual e atualizará o indicador no menu
      const newCurrentPage = tabs.find(tab => tab.src === currentPage)
      if (newCurrentPage) {
        dispatch({ type: 'SWITCH_PAGE', value: newCurrentPage })
      }
    }
  }, [currentPage, state.currentPage.src])

  useEffect(() => {

  }, [isHovered])

  return (
    <header
      className={
        `${styles.head} ` +
        'bg-zinc-50 sticky top-0 z-30 flex h-[10vh] w-full items-center justify-between bg-[#fafafa] shadow-md'
      }
    >
      <Image
        className={`h-[50px] w-[200px] ${styles.logo}`}
        src="/assets/img/redux-logo.svg"
        alt="Redux Logo"
        width={0}
        height={0}
        priority={true}
      />
      <div className={`${styles.desktopTabs} ` + 'hidden h-auto w-max'}>
        <ul className="flex items-center">
          {tabs.map((tab, index) => (
            <li key={index}>
              <Link
                href={tab.src}
                onClick={() =>
                  handleActualPage({ type: 'SWITCH_PAGE', value: tab })
                }
              >
                {tab.label}
              </Link>
              {tab === state.currentPage && (
                <motion.div className={styles.underline} layoutId="underline" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <Link href="/login" className={styles.link}>
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-3 text-lg font-semibold text-white bg-black hover:bg-primary-color rounded-full"
        >
          <Icon
            src={isHovered ? '/assets/img/dino-smile.png' : '/assets/img/dino-serio.png'}
            width={30}
            height={30}
            className={`${styles.dinoSerio}` + ' relative top-[.29rem]'} />
          Login
        </Button>
      </Link>
      <Button
        onClick={() => {
          setMenuOpen(true)
        }}
        className={`${styles.hamburguerButton} ` + 'scale-90 p-1'}
      >
        <Bars3Icon width={50} height={50} />
      </Button>
      {state.menuIsOpen && (
        <MenuItens
          ref={menuRef}
          state={state}
          className="items-center justify-center bg-black/90 p-4 text-3xl text-white backdrop-blur-sm"
          tabs={tabs}
          setCurrentPage={handleActualPage}
          setMenuOpen={setMenuOpen}
        />
      )}
    </header>
  )
}
