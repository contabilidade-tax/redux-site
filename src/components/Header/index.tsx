'use client'
import Image from 'next/image'
import { useReducer, useRef } from 'react'

import styles from './Header.module.scss'
import { Button, Tab, Tabs, TabsHeader } from '@material-tailwind/react'
import type { TabsHeaderProps } from '@material-tailwind/react'
import { Bars3Icon, UserIcon } from '@heroicons/react/24/solid'
import MenuItens from './MenuItens'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
  const initialReducerState = {
    currentPage: tabs[0],
    menuIsOpen: false,
  }
  const [state, dispatch] = useReducer(reducer, initialReducerState)
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

  return (
    <header
      className={
        `${styles.head} ` +
        'bg-zinc-50 sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-[#fafafa] shadow-md'
      }
    >
      <Image
        className="h-[50px] w-[200px]"
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
                  handleActualPage({ type: 'SWITCH_TAB', value: tab })
                }
              >
                {tab.label}
              </Link>
              {tab === state.currentPage && (
                <motion.div className={styles.underline} layoutId="underline" />
              )}
            </li>
          ))}
          <li>
            <Link href="/login">
              <Button
                variant="filled"
                color="gray"
                ripple={true}
                className="flex items-center gap-3 text-lg hover:scale-105"
              >
                <UserIcon width={20} height={20} />
                Login
              </Button>
            </Link>
          </li>
        </ul>
      </div>
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
