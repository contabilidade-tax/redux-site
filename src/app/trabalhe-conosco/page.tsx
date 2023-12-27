'use client'
import Script from 'next/script'
import ContactForm from './Form'

import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useLoading } from '@/common/context/LoadingContext'
import Loading from '@/components/Loading'

export default function TrabalheConosco() {
  const { isLoading, setIsLoading } = useLoading()
  const [isClient, setIsClient] = useState(false)

  // Define o mount do component de loading e timeout de saída
  useEffect(() => {
    // Identifica que está no client 
    // PS. isso é alternativa à typeof window != undefined afim de evitar erros de hydration
    setIsClient(true)

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
    <>
      {isLoading ? (<Loading />) : (<div style={{
        backgroundImage: 'url(/assets/img/bg/dinoTrabalheConoscoNatal.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: '80%',
      }}
        className='flex justify-center items-center flex-1 w-full p-6'>
        {/* GTAG */}
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
        {/* GTAG END */}
        <ContactForm className='bg-[#fff] border-2 drop-shadow-custom border-gray-400 p-6 rounded-2xl flex flex-col z-50 max-h-[52rem] xsm:min-w-[50%] md:!min-w-[30rem]' />
      </div >)}
    </>
  )

}