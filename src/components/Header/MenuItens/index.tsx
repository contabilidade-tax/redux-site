import Link from 'next/link'
import { Button } from '@material-tailwind/react'
import { motion } from 'framer-motion'

import { XCircleIcon, UserIcon } from '@heroicons/react/24/solid'

import { gsap } from 'gsap'

import { MenuItensProps } from '@/types'
import styles from './MenuItens.module.scss'
import { useEffect, useRef } from 'react'

export default function MenuItens({
  tabs,
  state,
  setCurrentPage,
  setMenuOpen,
  ref,
  className,
  style,
}: MenuItensProps) {
  const navRef = useRef<HTMLUListElement>(null)
  const xRef = useRef<SVGSVGElement>(null)
  const loginRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (navRef.current) {
      const tl = gsap.timeline({ delay: 0 })

      tl.fromTo(
        loginRef.current,
        { y: -550, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5 },
        0,
      )

      tl.fromTo(
        navRef.current.querySelectorAll('li'),
        { x: (index) => (index % 2 === 0 ? '100%' : '-100%'), autoAlpha: 0 },
        {
          duration: 0.5,
          x: '0%',
          autoAlpha: 1,
          ease: 'power4.out',
          stagger: 0.1,
        },
        0,
      )

      tl.to(
        xRef.current,
        {
          rotation: 360,
          duration: 1,
          ease: 'power2.out',
        },
        0,
      )
    }

    return () => {
      if (navRef.current) {
        const tl = gsap.timeline({ delay: 0 })

        tl.fromTo(
          loginRef.current,
          { x: 0, autoAlpha: 0 },
          { x: -1000, autoAlpha: 1, duration: 0.5 },
          0,
        )

        tl.fromTo(
          navRef.current.querySelectorAll('li'),
          { y: (index) => (index % 2 === 0 ? '100%' : '-100%'), autoAlpha: 0 },
          {
            duration: 0.5,
            x: '0%',
            autoAlpha: 1,
            ease: 'power4.out',
            stagger: 0.1,
          },
          0,
        )

        tl.to(
          xRef.current,
          {
            rotation: 360,
            duration: 1,
            ease: 'power2.out',
          },
          0,
        )
      }
    }
  }, [])

  return (
    <div
      style={style}
      className={
        `${styles.ulWrapper} ` + '!absolute left-0 top-0 z-50 h-screen w-full'
      }
    >
      <ul
        ref={navRef}
        className={
          `${className} ` + 'flex h-full w-full flex-col gap-10 font-bold'
        }
      >
        {tabs.map((item) => (
          <li
            className={
              (item === state.currentPage ? 'selected ' : '') + 'font-norma p-1'
            }
            key={item.label}
            onClick={() => {
              setMenuOpen(!state.menuIsOpen)
              setCurrentPage({ type: 'SWITCH_PAGE', value: item })
            }}
          >
            <Link href={item.src} className="text-left">
              {item.label}
            </Link>
            {item === state.currentPage ? (
              <motion.div className={styles.underline} layoutId="underline" />
            ) : null}
          </li>
        ))}
      </ul>
      <div className="absolute top-2 h-auto w-full">
        <div
          className={
            `${styles.headMenuMobile} ` +
            'absolute flex h-max w-full items-center justify-between'
          }
        >
          <Link href="/login" target="blank">
            <Button
              ref={loginRef}
              variant="filled"
              color="gray"
              ripple={true}
              className="flex items-center gap-3 text-lg hover:scale-105"
            >
              <UserIcon width={20} height={20} />
              Login
            </Button>
          </Link>
          <XCircleIcon
            ref={xRef}
            color="white"
            className="cursor-pointer"
            width={75}
            height={75}
            onClick={() => setMenuOpen(!state.menuIsOpen)}
          />
        </div>
      </div>
    </div>
  )
}
