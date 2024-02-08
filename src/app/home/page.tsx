/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, useLayoutEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { redirect, useSearchParams } from 'next/navigation'
import Servicos from './Servicos'
import { ButtonBackgroundShine } from '@/components/Tools'
import { useMobileContext } from '@/common/context/MobileDeviceContext'
import { useLoading } from '@/common/context/LoadingContext'
import { cn } from '@/lib/utils'
import Loading from '@/components/Loading'
import InstaRecentPosts from '@/components/InstaRecentPosts'

import styles from './Home.module.scss'
import Sobre from '@/components/Sobre'
import { toast } from 'react-toastify'
import { setCookie, parseCookies } from "nookies";
import NatalGameScene from './NatalGameScene'
import GameScene from './GameScene'
import Script from 'next/script'

type handleCookieActions = {
  type: 'SET' | 'GET';
};

export default function Home() {
  const { isLoading, setIsLoading } = useLoading()
  const [isClient, setIsClient] = useState(false)
  const { mobileState } = useMobileContext()
  const params = useSearchParams()

  function welcomeCookie(action: handleCookieActions) {
    const { has_been_welcomed } = parseCookies()

    switch (action.type) {
      case 'SET':
        setCookie(undefined, 'has_been_welcomed', 'true', {
          path: '/',
          maxAge: 24 * 60 * 60 * 1000 // 1 dias
        });
        break;
      case 'GET':
        return has_been_welcomed;
    }
  }

  const handleWelcomeNotification = () => {
    toast.success(
      <div>
        <p>Bem vindo!</p>
        <p>Recent Posts autorizado com sucesso</p>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "-translate-x-12 translate-y-16"
      })

    welcomeCookie({ type: 'SET' })
  }

  // Define o mount do component de loading e timeout de saída
  useEffect(() => {
    // Identifica que está no client 
    // PS. isso é alternativa à typeof window != undefined afim de evitar erros de hydration
    setIsClient(true)

    // Lógica do toast de welcome após autorizar os recents posts
    if (params.get('welcome') && !welcomeCookie({ type: 'GET' })) {
      handleWelcomeNotification()
    }

    // Lógica de loading
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3500) // Aqui você define o tempo de duração da animação

      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  // Não permite scroll na tela durante o loading
  useEffect(() => {
    // Verificar se o código está sendo executado no lado do cliente
    if (isClient) {
      document.body.style.overflow = isLoading ? 'hidden' : 'auto'
    }
  }, [isLoading]) // A função no useEffect será executada sempre que isLoading mudar

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      {
        isLoading ? (
          <Loading />
        ) : (
          <>
            {/* <Header /> */}
            <div id='gtag'>
              <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TAG}`}></Script>
              <Script id='google-analytics'>
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', ${process.env.NEXT_PUBLIC_GA_TAG});
              `}
              </Script>
            </div>
            {/* GTAG */}
            <section className={cn(styles.contentArea, 'min-h-[90svh] w-full', 'pt-[10sh]')}>
              <div className={cn('min-h-[90svh] w-full py-[5%] md:!py-[3%] md:!gap-10', 'grid grid-rows-5')}>
                <div className={cn('w-full tracking-wide lg:text-6xl text-7xl text-center p-0', 'row-span-1')}>
                  <p className={cn("w-full h-max font-normal", "xsm:text-4xl md:!text-6xl")}>
                    Não somos obrigação,
                  </p>
                  <p className='font-black xsm:text-4xl md:!text-6xl'>
                    <span className='text-primary-color'> somos ferramenta</span>
                    <span className="text-primary-color">.</span>
                  </p>
                </div>
                <section className={cn("w-full row-span-3 mx-auto", "flex flex-col justify-center items-center !h-[417.55px]")}>
                  <GameScene classname='w-full h-full xsm:scale-90' />
                </section>
                <div className={`${styles.bottomTextContent} flex flex-col w-full h-max row-span-1`}>
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
            <section id='recents' className={cn(styles.wrapper, 'max-h-[90svh] h-auto max-w-full mt-[10svh] mb-[5svh]', 'flex flex-col justify-center notSelected-G')}>
              <h1 className='text-center text-5xl md:!text-5xl sm:!text-2xl font-extrabold text-primary-color'>Posts recentes!</h1>
              {/* <section className='posts max-h-[38rem] min-h-[450px] w-full'> */}
              <section className='posts w-full h-auto xsm:!scale-95 md:!scale-100'>
                <InstaRecentPosts isMobile={mobileState.isSmallScreen} noRefresh={params.has('noRefresh')} />
              </section>
            </section>
          </>
        )
      }
    </Suspense>
  )
}
