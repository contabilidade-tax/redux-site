/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useLayoutEffect } from 'react'
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
      Y: 160
    },
    dinoCarMobile: {
      X: 200,
      Y: 105
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
  useLayoutEffect(() => {
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
            {/* <Header /> */}
            <section className={cn(styles.contentArea, 'min-h-[90svh] w-full', 'pt-[10sh]')}>
              <div className={cn('min-h-[90svh] w-full flex flex-col justify-between py-[5%] md:!py-[3%] md:!gap-10')}>
                <div className={cn('w-full tracking-wide lg:text-6xl text-7xl text-center p-0')}>
                  <p className={cn("w-full h-max font-normal", "xsm:text-4xl md:!text-6xl")}>
                    Não somos obrigação,
                  </p>
                  <p className='font-black xsm:text-4xl md:!text-6xl'>
                    <span className='text-primary-color'> somos ferramenta</span>
                    <span className="text-primary-color">.</span>
                  </p>
                </div>
                <section data-mobile={mobileState.isMobileDevice} className={cn("w-full flex-1 relative mx-auto border-2 border-black")}>
                  {/* <section className={cn("w-screen !mx-12 relative", "xsm:h-[230px] md:!flex-1", "border-2 border-black")}> */}
                  <GameScene
                    chProp={mobileState.isSmallScreen ? 250 : 450}
                    cwProp={typeof window !== 'undefined' ? window.innerWidth : 1580}
                    scaleProp={mobileState.isMobileDevice ? .6 : .6}
                    speedProp={200}
                    timeToReset={26.5}
                    dino={mobileState.isMobileDevice ? dinoPositions.dinoMobile : dinoPositions.dino}
                    dinoPaused={mobileState.isMobileDevice ? dinoPositions.dinoMobile : dinoPositions.dino}
                    dinoCar={mobileState.isMobileDevice ? dinoPositions.dinoCarMobile : dinoPositions.dinoCar}
                    className={cn(styles.gameScene, 'object-contain mx-auto !w-full md:h-auto md:max-h-[400px] border-2 border-yellow-500')}
                  />
                  {/* <video src="/assets/video/dinoAnimation.mp4" autoPlay loop muted disablePictureInPicture={true} disableRemotePlayback={true} className="w-full h-full object-fill"></video> */}
                  {/* <img alt='Dino' src="/assets/video/dinoAnimation.gif" width={1000} height={1000} className="w-full h-full object-fit" /> */}
                </section>
                <div className={`${styles.bottomTextContent} flex flex-col`}>
                  <h2 className="text-2xl lg:text-4xl text-center">
                    A <span className='text-primary-color font-black'>melhor solução</span> para sua empresa.
                  </h2>
                  <Link href='/contato' className='h-auto w-1/2 min-w-[261px] mx-auto text-lg lg:w-1/6'>
                    <ButtonBackgroundShine
                      text="Fale com a gente! 🤙🏼"
                      className="text-zinc-100 mt-4 w-full rounded-full px-4 py-2"
                    />
                  </Link>
                </div>
              </div>
            </section>
            <section id='servicos' className={cn(styles.wrapper, 'w-full min-h-[90svh]', '!mt-[10svh] !pt-[5svh]', "flex justify-center items-center servicos py-10")}>
              <Servicos className={cn('h-full w-full')} />
            </section>
            <section id='sobre' className={cn(styles.wrapper, 'w-full h-auto min-h-[90svh] max-w-[1500px]', '!pt-[10svh]', "flex flex-col gap-5 justify-center items-center notSelected-G")}>
              <div className='intraSection space-y-2'>
                <h1 className='self-center text-left md:text-7xl font-extrabold text-primary-color xsm:text-5xl'>Conheça nosso time:</h1>
                <Sobre />
              </div>
            </section>
            <section className={cn(styles.wrapper, 'max-h-[90svh] h-auto max-w-full md:mt-[10svh] xsm:!my-[10svh]', 'flex flex-col justify-center notSelected-G')}>
              <h1 className='text-center text-5xl md:!text-5xl sm:!text-2xl font-extrabold text-primary-color'>Posts mais recentes!</h1>
              {/* <section className='posts max-h-[38rem] min-h-[450px] w-full'> */}
              <section className='posts w-full xsm:!scale-95 md:!scale-100'>
                <InstaRecentPosts isMobile={mobileState.isSmallScreen} />
              </section>
            </section>
          </>
        )
      }
    </>
  )
}
