/* eslint-disable no-unused-vars */
'use client'
import React, { useEffect } from 'react'

import { ButtonBackgroundShine } from 'src/components/Tools'
import FullPageLayout from '@/components/FullPageLayout'
import GameScene from './GameScene'
import Servicos from './Servicos'

import { useLoading } from '@/common/context/LoadingContext'
import Loading from 'src/components/Loading'
import styles from './Home.module.scss'

export default function Home() {
  const { isLoading, setIsLoading } = useLoading()

  // Define o mount do component de loading e timeout de saída
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3250) // Aqui você define o tempo de duração da animação

    // Função para interceptar o evento keydown
    const onKeyDown = (event: {
      keyCode: number
      preventDefault: () => void
    }) => {
      // 32 é o código da tecla para a tecla de espaço
      if (event.keyCode === 32) {
        event.preventDefault()
      }
    }

    // Adiciona o listener ao objeto window
    window.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(timer) // Limpa o timer se o componente for desmontado antes do tempo acabar
      window.removeEventListener('keydown', onKeyDown) // Remove o listener quando o componente é desmontado
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Sem dependências, então só é executado no mount e unmount

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
          <FullPageLayout
            className={'flex w-full flex-col' + ` ${styles.wrapper}`}
          >
            <section className="ContentArea pt-10">
              <section className={styles.leftArea + ' topArea'}>
                <div className="w-full text-4xl leading-none">
                  <h1 className="w-full">Não somos obrigação,</h1>
                  <h1 className="w-full font-extrabold">
                    somos ferramenta
                    <span className="text-yellow">.</span>
                  </h1>
                </div>
                <div className="flex flex-col">
                  <div className="mt-10">
                    <h2 className="text-3xl">
                      Soluções contábeis personalizadas <br />
                      para simplificar sua rotina.
                    </h2>
                  </div>
                  <ButtonBackgroundShine
                    text="Fale com a gente! 🤙🏼"
                    className="text-zinc-100 mt-8 w-full rounded-full px-4 py-2"
                  />
                </div>
              </section>
              <section className="right-area relative -left-4 -top-[0.82rem] h-2/6 w-1/2 scale-90 p-2">
                {/* <GameScene /> */}
              </section>
            </section>
            <Servicos className="servicos" />
          </FullPageLayout>
        ) /* ou qualquer outro componente ou conteúdo quando não estiver carregando */
      }
    </>
  )
}
