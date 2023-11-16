/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

import GameScene from './GameScene'
import Servicos from './Servicos'

import { ButtonBackgroundShine } from '@/components/Tools'
import { useMobileContext } from '@/common/context/MobileDeviceContext'
import { useLoading } from '@/common/context/LoadingContext'
import { cn } from '@/lib/utils'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import InstaRecentPosts from '@/components/InstaRecentPosts'

import styles from './Home.module.scss'
import Sobre from '@/components/Sobre'

export default function Home() {
  const { isLoading, setIsLoading } = useLoading()
  const { mobileState } = useMobileContext()
  // const dinoPositions = {
  //   dino: {
  //     X: 200,
  //     Y: 324
  //   },
  //   dinoCar: {
  //     X: 200,
  //     Y: 269
  //   },
  //   dinoMobile: {
  //     X: 200,
  //     Y: 160
  //   },
  //   dinoCarMobile: {
  //     X: 200,
  //     Y: 105
  //   }
  // }

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
            <section className={cn(styles.contentArea, 'h-[90vh] w-full')}>
              <div className={cn('min-h-[90vh] w-full flex flex-col justify-around gap-8 py-4')}>
                <div className={`${styles.introText} w-full tracking-wide lg:text-6xl text-center p-0`}>
                  <p className="w-full h-max font-normal">
                    Não somos obrigação,
                  </p>
                  <p className='font-black'>
                    <span className='text-primary-color'> somos ferramenta</span>
                    <span className="text-primary-color">.</span>
                  </p>
                </div>
                <section data-mobile={mobileState.isMobileDevice} className={cn("w-full flex-1 relative data-[mobile=true]:h-[300px] mx-auto", "border-2 border-black")}>
                  {/* <GameScene
                      chProp={mobileState.isMobileDevice ? 300 : 550}
                      cwProp={1580}
                      scaleProp={mobileState.isMobileDevice ? .65 : .7}
                      speedProp={200}
                      timeToReset={26.5}
                      dino={mobileState.isMobileDevice ? dinoPositions.dinoMobile : dinoPositions.dino}
                      dinoPaused={mobileState.isMobileDevice ? dinoPositions.dinoMobile : dinoPositions.dino}
                      dinoCar={mobileState.isMobileDevice ? dinoPositions.dinoCarMobile : dinoPositions.dinoCar}
                      className={cn(styles.gameScene, 'mx-auto w-full')}
                    /> */}
                  <video src="/assets/video/dinoAnimation.mp4" autoPlay loop muted className="w-full !h-full object-fill"></video>
                </section>
                <div className={`${styles.bottomTextContent} flex flex-col`}>
                  <div className="text-center">
                    <h2 className="text-2xl">
                      A <span className='text-primary-color font-black'>melhor solução</span> para sua empresa.
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
            <section className={cn(styles.wrapper, 'w-full h-[90vh]', "flex justify-center items-center servicos")}>
              <Servicos id='servicos' className={cn('h-full w-full')} />
            </section>
            <section id='sobre' className={cn(styles.wrapper, 'w-full h-auto', "flex flex-col gap-4 justify-center items-center notSelected-G")}>
              <h1 className='self-center  text-left text-7xl font-extrabold text-primary-color'>Conheça nosso time:</h1>
              <Sobre />
            </section>
            <section className={cn(styles.wrapper, 'h-[90vh] max-w-full', 'flex flex-col justify-center notSelected-G')}>
              <h1 className='text-center text-5xl font-extrabold text-primary-color'>Confira os posts mais recentes!</h1>
              {/* <section className='posts max-h-[38rem] min-h-[450px] w-full'> */}
              <section className='posts w-full'>
                <InstaRecentPosts />
              </section>
            </section>
          </>
        )
      }
    </>
  )
}
