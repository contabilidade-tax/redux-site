'use client'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useEffect, useReducer, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Icon } from '../Tools'

import styles from './Header.module.scss'
import MenuItens from './MenuItens'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Home', src: '/home' },
  { label: 'Sobre', src: '/sobre' },
  { label: 'Serviços', src: '/servicos' },
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

export default function Header({ className }: { className?: string }) {
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
        cn(
          styles.head,
          'bg-zinc-50 sticky top-0 z-30 flex h-[10vh] w-full items-center justify-between bg-[#fafafa] shadow-md',
          className,
        )
      }
    >
      <Link href={'/'} className={`h-[50px] w-[200px] ${styles.logo}`} >
        <Image
          className='w-full h-full object-contain'
          // src="/assets/img/redux-logo.svg"
          src="/assets/img/logo-patrocinio.svg"
          alt="Redux Logo"
          width={1000}
          height={1000}
          priority={true}
        />
      </Link>
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
              {tab === state.currentPage ? (
                <motion.div className={cn(styles.underline, '!bg-primary-color')} layoutId="underline" />
              ) : (null)}
            </li>
          ))}
        </ul>
      </div>
      <Link href="/login" className={`${styles.link} hidden`}>
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-3 text-lg font-semibold text-white bg-black hover:bg-primary-color rounded-full"
        >
          <Icon
            src={isHovered ? '/assets/img/dino-smile.png' : '/assets/img/dino-serio.png'}
            width={30}
            height={30}
            className={' relative top-[.29rem]'} />
          Login
        </Button>
      </Link>
      <Button
        onClick={() => {
          setMenuOpen(true)
        }}
        className={`${styles.hamburguerButton} ` + 'w-[4em] h-[3em] bg-primary-color'}
      >
        <Bars3Icon width={40} height={40} />
      </Button>
      {
        state.menuIsOpen && (
          <MenuItens
            ref={menuRef}
            state={state}
            className="items-center justify-center bg-black/90 p-4 text-3xl text-white backdrop-blur-sm"
            tabs={tabs}
            setCurrentPage={handleActualPage}
            setMenuOpen={setMenuOpen}
          />
        )
      }
    </header >
  )
}
