'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Header.module.scss'

const tabs = [
  { label: 'Home', src: '/home' },
  { label: 'Sobre', src: '/sobre' },
  { label: 'Serviços', src: '/servicos' },
  { label: 'Contato', src: '/contato' },
  { label: 'Trabalhe Conosco', src: '/trabalhe-conosco' },
]

export default function Header() {
  const [currentPage, setCurrentPage] = useState(tabs[0])

  return (
    <header className="flex h-20 w-full justify-between bg-zinc-50 px-16 shadow-md">
      <Image
        src="/assets/img/redux-logo.svg"
        alt="Redux Logo"
        width={200}
        height={80}
      />
      <ul className="flew-row mx-10 flex items-center justify-between font-normal">
        {tabs.map((item) => (
          <li
            key={item.label}
            className={item === currentPage ? 'selected' : ''}
            onClick={() => setCurrentPage(item)}
          >
            <Link href={item.src}>{item.label}</Link>
            {item === currentPage ? (
              <motion.div className={styles.underline} layoutId="underline" />
            ) : null}
          </li>
        ))}
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
