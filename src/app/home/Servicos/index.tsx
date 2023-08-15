/* eslint-disable no-unused-vars */
import { RefObject, useEffect, useReducer, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { gsap } from 'gsap'

import { ButtonBackgroundShine } from 'src/components/Tools'
import { ServiceProps } from '@/types'

import styles from './Servicos.module.scss'
import { debounce } from '@/common/functions'
import services from '@/common/data/services.json'
import ServiceNav from '@/app/home/Servicos/ServiceNav'

gsap.registerPlugin(ScrollTrigger)

function reducer(state: any, action: { type: string; value?: number }) {
  switch (action.type) {
    case 'ANIMATE_START':
      return {
        ...state,
        isAnimating: true,
      }
    case 'CHANGE_TAB':
      return {
        ...state,
        actualIndex: action.value,
        selectedTab: services[action.value!],
      }
    case 'ANIMATE_END':
      return {
        ...state,
        isAnimating: false,
      }
    case 'CLIENT_WIDTH_CHANGE':
      return {
        ...state,
        clientInnerWidth: action.value,
      }
    default:
      return state
  }
}

export default function Servicos({ className, ...rest }: ServiceProps) {
  const initialState = {
    actualIndex: 0,
    selectedTab: services[0],
    isAnimating: false,
    clientInnerWidth: window.innerWidth || document.documentElement.clientWidth,
  }
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
    })

    // Iniciar a animação de transição na imagem atual
    animateTransition(imageRef, newTabIndex)
  }

  // animação dos menus de navegação e seleção da área
  useEffect(() => {
    // Listener do tamanho da tela
    const handleResize = () => {
      // debounce(() => {
      console.log(window.innerWidth)
      dispatch({
        type: 'CLIENT_WIDTH_CHANGE',
        value: window.innerWidth || document.documentElement.clientWidth,
      })
      // }, 300)
    }

    // Adiciona o EventListener
    window.addEventListener('resize', handleResize)

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

    // Remove o EventListener
    return () => {
      window.removeEventListener('resize', handleResize)
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
          value: newTabIndex,
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
        <span className="bgYellow-G theme-G rounded-full bg-primary-color p-10">
          Serviços
        </span>
      </div>
      <div className="mb-6 mt-3 h-full w-full">
        <h1 className="m-[0] text-5xl font-bold">Como podemos ajudar?</h1>
      </div>
      <ServiceNav
        navRef={navRef}
        switchTab={switchTab}
        services={services}
        state={state}
      />
      <section
        className={
          'relative mb-28 mt-6 flex h-[15rem] w-full flex-1 grid-cols-1 flex-col gap-4' +
          ` ${styles.infos}`
        }
      >
        {/* TextArea com conteúdo */}
        <aside className="relative h-[5rem] w-full">
          <div
            className={
              'relative flex justify-between bg-[#20202010] p-5 backdrop-blur-md' +
              ` ${styles.textArea}`
            }
          >
            <div
              ref={textAreaRef}
              className="text flex items-center overflow-hidden"
            >
              <h3 className="text-xl font-semibold">
                {state.selectedTab.subtitulo}
              </h3>
              <span hidden className="flex w-full flex-col">
                {state.selectedTab.texto}
              </span>
            </div>
            <Link href="/contato">
              <ButtonBackgroundShine className="self-end p-5" />
            </Link>
          </div>
        </aside>

        <aside className="image-area relative h-full w-full">
          <section className="screen relative flex h-full w-full justify-center">
            <div
              className={
                'absolute -top-[0%] z-[-1] h-[180%] w-[100%]' +
                ` ${styles.contentWrapper}`
              }
            >
              {/* Imagem do Notebook */}
              <div
                ref={macRef}
                className="mac h-full w-full"
                style={{
                  backgroundImage: `url('/assets/img/mac.png')`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
              {/* Imagem do conteúdo */}
              <div
                ref={contentRef}
                className={
                  'absolute left-[25.5%] top-[6%] z-30 h-[23vh] w-[34%] overflow-hidden rounded-lg border-2' +
                  ` ${styles.content}`
                }
              >
                <div
                  ref={imageRef}
                  className="h-full w-full"
                  style={{
                    backgroundImage: `url(${state.selectedTab.image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            </div>
          </section>
        </aside>
      </section>
    </section>
  )
}
