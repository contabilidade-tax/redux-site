/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect, Suspense } from 'react'
import { setCookie, parseCookies } from "nookies";
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
// 
import Servicos from './home/Servicos'
import { ButtonBackgroundShine } from '@/components/Tools'
import { useMobileContext } from '@/common/context/MobileDeviceContext'
import InstaRecentPosts from '@/components/InstaRecentPosts'
import { cn } from '@/lib/utils'
import Sobre from '@/components/Sobre'
// 
import NatalGameScene from './home/NatalGameScene'
import GameScene from './home/GameScene'
// 
import '@/app/home/home.scss'

type handleCookieActions = {
  type: 'SET' | 'GET';
};

function Home() {
  // const [isClient, setIsClient] = useState(false)
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
    // setIsClient(true)

    // Lógica do toast de welcome após autorizar os recents posts
    if (params.get('welcome') && !welcomeCookie({ type: 'GET' })) {
      handleWelcomeNotification()
    }

  }, [])

  return (
    <>
      <section className={cn('contentArea', 'min-h-[90svh] w-full', 'pt-[10sh]')}>
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
          <div className={`bottomTextContent flex flex-col w-full h-max row-span-1`}>
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
      <section id='servicos' className={cn('wrapper', 'w-full min-h-[90svh]', '!mt-[10svh] !pt-[5svh]', "flex justify-center items-center servicos py-10")}>
        <Servicos className={cn('h-full w-full')} />
      </section>
      {/* <section id='sobre' className={cn('wrapper', 'w-full h-auto min-h-[90svh] max-w-[1500px]', '!pt-[10svh]', "flex flex-col gap-5 justify-center items-center notSelected-G")}>
        <div className='intraSection space-y-2'>
          <h1 className='self-center text-left md:text-7xl font-extrabold text-primary-color xsm:text-5xl'>Conheça nosso time:</h1>
          <Sobre />
        </div>
      </section> */}
      <section id='recents' className={cn('wrapper', 'max-h-[90svh] h-auto max-w-full mt-[10svh] mb-[5svh]', 'flex flex-col justify-center notSelected-G')}>
        <h1 className='text-center text-5xl md:!text-5xl sm:!text-2xl font-extrabold text-primary-color'>Posts recentes!</h1>
        {/* <section className='posts max-h-[38rem] min-h-[450px] w-full'> */}
        <section className='posts w-full h-auto xsm:!scale-95 md:!scale-100'>
          <InstaRecentPosts isMobile={mobileState.isSmallScreen} noRefresh={params.has('noRefresh')} />
        </section>
      </section>
    </>
  )
}

export default function Page() {
  return <Suspense><Home /></Suspense>
}