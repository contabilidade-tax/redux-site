/* eslint-disable no-unused-vars */
'use client'
import React, { Ref, useEffect, useRef } from 'react'
import Link from 'next/link'

import { ButtonBackgroundShine } from '@/components/Tools'
import FullPageLayout from '@/components/FullPageLayout'
import GameScene from './GameScene'
import Servicos from './Servicos'

import { useMobileContext } from '@/common/context/MobileDeviceContext'
import { useLoading } from '@/common/context/LoadingContext'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import styles from './Home.module.scss'
import InstaRecentPosts from '@/components/InstaRecentPosts'

export default function Home() {
  const { isLoading, setIsLoading } = useLoading()
  const { mobileState } = useMobileContext()

  // Define o mount do component de loading e timeout de saída
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3250) // Aqui você define o tempo de duração da animação

      return () => {
        clearTimeout(timer)
      }
    }
  })

  // Não permite scroll na tela durante o loading
  useEffect(() => {
    // Verificar se o código está sendo executado no lado do cliente
    if (typeof window !== 'undefined') {
      document.body.style.overflow = isLoading ? 'hidden' : 'auto'
    }
  }, [isLoading]) // A função no useEffect será executada sempre que isLoading mudar

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <FullPageLayout
              className={` ${styles.wrapper}`}
            >
              <section className={styles.contentArea}>
                <div className={styles.leftArea + ' topArea col-span-1 mt-2'}>
                  <div className={`${styles.introText} w-full leading-none text-3xl`}>
                    <p className="w-full h-max">
                      Não somos obrigação
                      <span className='font-extrabold textYellow-G'>{' '}somos ferramenta</span>
                      <span className="textYellow-G text-5xl">.</span>
                    </p>
                  </div>
                  {mobileState.isSmallScreen && (
                    <GameScene className={styles.mobileGameScene} />
                  )}
                  <div className={`${styles.bottomTextContent} flex flex-col md:gap-8`}>
                    <div className="mt-4">
                      <h2 className="text-2xl">
                        Soluções personalizadas
                        <span className='textYellow-G font-bold'> para simplificar</span> sua rotina.
                      </h2>
                    </div>
                    <Link href='/contato' className='h-auto w-full'>
                      <ButtonBackgroundShine
                        text="Fale com a gente! 🤙🏼"
                        className="text-zinc-100 mt-4 w-full rounded-full px-4 py-2"
                      />
                    </Link>
                  </div>
                </div>
                {!mobileState.isSmallScreen &&
                  <div className={`${styles.rightArea} ` + "relative col-span-1 h-auto w-full"}>
                    <GameScene className={`mx-auto ${styles.gameScene}`} />
                  </div>
                }
              </section>
              <Servicos className={styles.servicos} />
              <InstaRecentPosts className='w-full h-full flex justify-center items-start' />
            </FullPageLayout>
          </>
        )
      }
    </>
  )
}
