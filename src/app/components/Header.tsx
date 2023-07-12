'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [currentPage, setCurrentPage] = useState('home')

  const handleCurrentPage = (page: string) => {
    setCurrentPage(page)
  }

  return (
    <header className="flex h-20 w-full justify-between bg-zinc-50 px-16 shadow-md">
      <Image
        src="/assets/img/redux-logo.svg"
        alt="Redux Logo"
        width={200}
        height={200}
      />
      <ul className="flew-row wrapper mx-10 flex items-center justify-between font-normal">
        <li className={currentPage === 'home' ? 'active-page' : ''}>
          <Link onClick={() => handleCurrentPage('home')} href="/">
            Início
          </Link>
        </li>
        <li className={currentPage === 'about' ? 'active-page' : ''}>
          <Link onClick={() => handleCurrentPage('about')} href="sobre">
            A Redux
          </Link>
        </li>
        <li className={currentPage === 'services' ? 'active-page' : ''}>
          <Link onClick={() => handleCurrentPage('services')} href="servicos">
            Servicos
          </Link>
        </li>
        <li className={currentPage === 'contact' ? 'active-page' : ''}>
          <Link onClick={() => handleCurrentPage('contact')} href="contato">
            Contato
          </Link>
        </li>
        <li className={currentPage === 'work-with-us' ? 'active-page' : ''}>
          <Link
            onClick={() => handleCurrentPage('work-with-us')}
            href="trabalhe-conosco"
          >
            Trabalhe conosco
          </Link>
        </li>
        <li>
          <Link href="/login" target="blank">
            <button className="bg-yellow rounded-3xl px-4 py-1 hover:scale-105">
              Login
            </button>
          </Link>
        </li>
      </ul>
    </header>
  )
}
