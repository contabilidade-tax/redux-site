/* eslint-disable no-unused-vars */
'use client'
import React, { Ref, useEffect, useRef } from 'react'
import Link from 'next/link'

import { ButtonBackgroundShine } from '@/components/Tools'
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
            <main className={` ${styles.wrapper} h-max max-w-full overflow-hidden`}>
              <section className={styles.contentArea}>
                <div className={styles.leftArea + ' topArea col-span-1 mt-2'}>
                  <div className={`${styles.introText} w-full leading-none text-4xl text-center`}>
                    <p className="w-full h-max font-semibold">
                      Não somos obrigação,
                    </p>
                    <p className={styles.grosso}>
                      <span className='textYellow-G'> somos ferramenta</span>
                      <span className="textYellow-G">.</span>
                    </p>
                  </div>
                  <section className="game w-full h-[380px] mx-auto">
                    {mobileState.isSmallScreen ? (
                      // <GameScene
                      //   chProp={450}
                      //   cwProp={320}
                      //   scaleProp={.6}
                      //   className={`${styles.mobileGameScene} h-[300px] w-full max-w-[550px]`}
                      // />
                      <></>
                    ) : (
                      <GameScene
                        chProp={550}
                        cwProp={1580}
                        scaleProp={.7}
                        dinoX={200}
                        dinoY={50}
                        dinoPausedX={200}
                        dinoPausedY={50}
                        className={`${styles.gameScene} mx-auto w-full`}
                      />
                    )
                    }
                  </section>
                  <div className={`${styles.bottomTextContent} flex flex-col my-12`}>
                    <div className="text-center">
                      <h2 className="text-2xl">
                        A <span className='textYellow-G font-bold'>melhor solução</span> para sua empresa.
                      </h2>
                    </div>
                    <Link href='/contato' className='h-auto w-1/6 mx-auto text-lg'>
                      <ButtonBackgroundShine
                        text="Fale com a gente! 🤙🏼"
                        className="text-zinc-100 mt-4 w-full rounded-full px-4 py-2"
                      />
                    </Link>
                  </div>
                </div>
              </section>
              <Servicos className={styles.servicos} />
              <InstaRecentPosts className='w-full h-full flex justify-center items-start' />
            </main>
          </>
        )
      }
    </>
  )
}
