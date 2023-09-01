/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect } from 'react'
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
  const dinoPositions = {
    dino: {
      X: 200,
      Y: 324
    },
    dinoCar: {
      X: 200,
      Y: 269
    },
    dinoMobile: {
      X: 200,
      Y: 235
    },
    dinoCarMobile: {
      X: 200,
      Y: 180
    }
  }

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
              <section className={`${styles.contentArea} min-h-[90vh]`}>
                <div className={styles.leftArea + ' mt-2 sm:h-[90vh] h-full w-full'}>
                  <div className={`${styles.introText} w-full leading-none text-[2.5rem] text-center p-0 my-5`}>
                    <p className="w-full h-max font-medium">
                      Não somos obrigação,
                    </p>
                    <p className={styles.grosso}>
                      <span className='textYellow-G'> somos ferramenta</span>
                      <span className="textYellow-G">.</span>
                    </p>
                  </div>
                  <section data-mobile={mobileState.isSmallScreen} className="w-full relative max-h-[380px] data-[mobile=true]:h-[280px] mx-auto my-10 overflow-hidden object-center">
                    <GameScene
                      chProp={mobileState.isSmallScreen ? 400 : 550}
                      cwProp={1580}
                      scaleProp={.7}
                      speedProp={200}
                      timeToReset={26.5}
                      dino={mobileState.isSmallScreen ? dinoPositions.dinoMobile : dinoPositions.dino}
                      dinoPaused={mobileState.isSmallScreen ? dinoPositions.dinoMobile : dinoPositions.dino}
                      dinoCar={mobileState.isSmallScreen ? dinoPositions.dinoCarMobile : dinoPositions.dinoCar}
                      className={`${styles.gameScene} mx-auto w-full`}
                    />
                  </section>
                  <div className={`${styles.bottomTextContent} flex flex-col my-12`}>
                    <div className="text-center">
                      <h2 className="text-2xl">
                        A <span className='textYellow-G font-black'>melhor solução</span> para sua empresa.
                      </h2>
                    </div>
                    <Link href='/contato' className='h-auto w-1/2 min-w-[261px] mx-auto text-lg lg:w-1/6'>
                      <ButtonBackgroundShine
                        text="Fale com a gente! 🤙🏼"
                        className="text-zinc-100 mt-4 w-full rounded-full px-4 py-2"
                      />
                    </Link>
                  </div>
                </div>
              </section>
              <Servicos className={`${styles.servicos} min-h-[90vh]`} />
              {/* <InstaRecentPosts className='w-full h-full flex justify-center items-start' /> */}
            </main>
          </>
        )
      }
    </>
  )
}
