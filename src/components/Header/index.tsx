'use client'
import Image from 'next/image'
import { Dispatch, useEffect, useReducer, useRef } from 'react'

import styles from './Header.module.scss'
import { Button, Typography } from '@material-tailwind/react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import MenuItens from './MenuItens'

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
    // <header className={`${styles.head} ` + "flex h-20 w-full justify-between items-center bg-zinc-50 shadow-md"}>
    <header
      className={
        `${styles.head} ` +
        'bg-zinc-50 sticky top-0 z-30 flex h-20 w-full items-center justify-between shadow-md'
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
      <Button
        onClick={() => {
          setMenuOpen(true)
        }}
        className="scale-90 p-1"
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
