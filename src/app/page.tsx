/* eslint-disable no-unused-vars */
'use client'
import React, { useState, useEffect, Fragment } from 'react'

// import { Zoom } from 'react-slideshow-image'
// import 'react-slideshow-image/dist/styles.css'

import Servicos from './components/Servicos'
import GameScene from './components/Animation'
import Loading from './components/Loading'
import { ButtonBackgroundShine } from '../app/components/Tools'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [renderGameScene, setRenderGameScene] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500) // Aqui você define o tempo de duração da animação

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
  }, []) // Sem dependências, então só é executado no mount e unmount

  useEffect(() => {
    // Verificar se o código está sendo executado no lado do cliente
    if (typeof window !== 'undefined') {
      document.body.style.overflow = isLoading ? 'hidden' : 'auto'
    }

    if (!isLoading) {
      const timer = setTimeout(() => {
        setRenderGameScene(true) // Isto irá acionar a re-renderização do componente
      }, 1000) // Se 1 ms é muito curto, considere aumentar este tempo

      // Limpar o timer quando o componente desmontar ou antes da próxima renderização
      return () => clearTimeout(timer)
    }
  }, [isLoading]) // A função no useEffect será executada sempre que isLoading mudar

  return (
    <>
      {
        isLoading ? (
          <Loading />
        ) : null /* ou qualquer outro componente ou conteúdo quando não estiver carregando */
      }

      <div className="z-10 flex h-full w-full flex-col px-24 pt-28">
        <section className="first-visualization flex flex-1">
          <section className="left-area w-2/4">
            <div className="home-text w-5/5 text-7xl leading-none">
              <h1 className="w-full">Não somos obrigação,</h1>
              <h1 className="w-full font-extrabold">
                somos ferramenta
                <span className="text-yellow">.</span>
              </h1>
            </div>
            <div className="flex flex-col">
              <div className="mt-28">
                <h2 className="text-3xl">
                  Soluções contábeis personalizadas <br />
                  para simplificar sua rotina.
                </h2>
              </div>
              <ButtonBackgroundShine
                text="Fale com a gente! 🤙🏼"
                className="mt-8 w-2/4 rounded-full px-4 py-2 text-zinc-100"
              />
            </div>
          </section>
          <section className="right-area relative -left-20 -top-[0.82rem] h-2/6 w-1/2 scale-90 p-2">
            {renderGameScene ? <GameScene /> : null}
          </section>
        </section>
        <div className="divisor"></div>
        <Servicos className="servicos relative" />
        <section className="my-8">A</section>
      </div>
    </>
  )
}
