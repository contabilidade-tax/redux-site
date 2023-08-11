/* eslint-disable no-unused-vars */
import { RefObject, useEffect, useReducer, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { gsap } from 'gsap'

import { Icon, ButtonBackgroundShine } from 'src/components/Tools'
import { ServiceProps } from '@/types'

import styles from './Servicos.module.scss'
import services from '@/common/data/services.json'
import mac from '../../../../public/assets/img/mac.png'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const initialState = {
  selectedTab: services[0],
  isAnimating: false,
}

function reducer(state: any, action: { type: string; tabIndex: number }) {
  switch (action.type) {
    case 'ANIMATE_START':
      return {
        ...state,
        isAnimating: true,
      }
    case 'CHANGE_TAB':
      return {
        ...state,
        selectedTab: services[action.tabIndex],
      }
    case 'ANIMATE_END':
      return {
        ...state,
        isAnimating: false,
      }
    default:
      return state
  }
}

export default function Servicos({ className, ...rest }: ServiceProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const textAreaRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const macRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLImageElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const switchTab = (newTabIndex: number) => {
    if (state.isAnimating) return // Ignore se já estiver animando
    if (state.selectedTab === services[newTabIndex]) return // Ignore se for a mesma aba

    dispatch({
      type: 'ANIMATE_START',
      tabIndex: newTabIndex,
    })

    // Iniciar a animação de transição na imagem atual
    animateTransition(imageRef, newTabIndex)
  }

  // animação dos menus de navegação e seleção da área
  useEffect(() => {
    const sectionElement = document.querySelector('.servicos')

    if (sectionElement && navRef.current) {
      // Adicionada verificação para navRef.current
      const navElement = navRef.current // Adicionada variável temporária

      ScrollTrigger.create({
        trigger: sectionElement,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            navElement.querySelectorAll('li'), // Usando a variável temporária aqui
            { x: '100%', opacity: 0 },
            {
              duration: 0.5,
              x: '0%',
              opacity: 1,
              ease: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
              stagger: 0.1,
            },
          )
          // Adicione mais animações aqui
          // Área do texto
          gsap.fromTo(
            textAreaRef.current,
            { x: -100, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.3, delay: 0.55 },
          )
          // Animação do MAC
          gsap.fromTo(
            macRef.current,
            { y: 100, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, delay: 0.15 },
          )
          // Imagem
          gsap.fromTo(
            contentRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5, delay: 0.65 },
          )
        },
      })
    }
  }, [])

  const animateTransition = (
    target: RefObject<HTMLDivElement>,
    newTabIndex: number,
  ) => {
    const titulo = [textAreaRef.current?.querySelectorAll(':scope > h3')]
    const texto = [textAreaRef.current?.querySelectorAll(':scope > span')]

    // Criar uma timeline GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        // Alterar para a próxima imagem (causando renderização)
        dispatch({
          type: 'CHANGE_TAB',
          tabIndex: newTabIndex,
        })

        // Animar a entrada da nova imagem
        gsap.fromTo(
          target.current,
          { y: 300, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: 0.1,
            onComplete: () => {
              // Então define a animação de reescala com delay de duração da animação de entrada
              gsap.to(target.current, { scaleX: 1, scaleY: 1, duration: 0.2 })

              // E aqui um onComplete mudando isAnimating para false
              dispatch({
                type: 'ANIMATE_END',
                tabIndex: newTabIndex,
              })
            },
          },
        )
      },
    })

    // Primeiro, anima o scaleX e scaleY
    tl.to(target.current, {
      scaleX: 0.8,
      scaleY: 0.8,
      duration: 0.4,
      ease: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    })

    // Em seguida, anima o translateY e opacity
    tl.to(target.current, {
      y: -100,
      autoAlpha: 0,
      duration: 0.3,
      ease: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    })

    // Animação de titulo e retorno ao estado inicial usando fromTo
    tl.fromTo(
      titulo,
      { y: 0, autoAlpha: 1 },
      {
        y: 10,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        onComplete: () => {
          gsap.fromTo(
            titulo,
            { y: 25, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
              delay: 0.5,
            },
          )
        },
      },
      0.2,
    )

    // Animação de texto e retorno ao estado inicial usando fromTo
    tl.fromTo(
      texto,
      { x: 0, autoAlpha: 1 },
      {
        x: -200,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        onComplete: () => {
          gsap.fromTo(
            texto,
            { y: 45, x: 0, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
            },
          )
        },
      },
    )
  }

  return (
    <section
      className={`${className} border-y-2 border-dashed border-zinc-950 p-1`}
      {...rest}
    >
      <div className="w-28 rounded-3xl bg-primary-color text-center">
        <span className="bg-yellow theme rounded-full bg-primary-color p-10">
          Serviços
        </span>
      </div>
      <div className="my-8">
        <h1 className="text-5xl font-bold">Como podemos ajudar?</h1>
      </div>
      <nav
        ref={navRef}
        className={`${styles['service-nav']} ${styles.notSelect} w-5/5 max-h-max`}
      >
        <ul className="flex justify-start">
          {services.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                switchTab(index)
              }}
              className={item === state.selectedTab ? styles.selectedItem : ''}
            >
              <Icon src={`/assets/img/icons/${item.icon}`} />
              <span>{item.titulo}</span>
            </li>
          ))}
        </ul>
      </nav>
      <section className="infos relative mb-20 mt-8 grid grid-cols-3 max-h-[22rem] w-full">
        {/* TextArea com conteúdo */}
        <aside className="col-span-1 relative h-full w-full">
          <div className="text-area relative flex min-h-[22rem] flex-col justify-between bg-[#20202010] px-5 pt-5 backdrop-blur-md">
            <div ref={textAreaRef} className="text space-y-4 overflow-hidden">
              <h3 className="text-xl font-semibold">
                {state.selectedTab.subtitulo}
              </h3>
              <span className="flex w-full flex-col">
                {state.selectedTab.texto}
              </span>
            </div>
            <Link href="/contato">
              <ButtonBackgroundShine className="mb-5 w-full self-end" />
            </Link>
          </div>
        </aside>

        <aside className="col-span-2 image-area relative w-full">
          <section className="screen relative flex h-full w-full justify-center">
            {/* Imagem do conteúdo */}
            <div ref={contentRef} className="min-h-[14rem] min-w-[18rem] h-[18rem] w-[28.5rem] z-30 overflow-hidden rounded-lg border-2">
              <div
                ref={imageRef}
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${state.selectedTab.image})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  objectFit: 'fill'
                }}
              />
            </div>
            {/* Imagem do Notebook */}
            <div className="mac z-[-1] absolute -top-[4.25rem] left-[3.5rem] min-h-[18rem] min-w-[27rem] h-[32rem] w-[39.6rem]">
              <div
                ref={macRef}
                className="w-full h-full"
                style={{
                  backgroundImage: `url('/assets/img/mac.png')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          </section>
        </aside>
      </section>
    </section>
  )
}
