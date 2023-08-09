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
            { x: 100, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.3, delay: 0.65 },
          )
        },
      })
    }
  }, [])

  const animateTransition = (
    target: RefObject<HTMLDivElement>,
    newTabIndex: number,
  ) => {
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
            scaleX: 1,
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.4,
            ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: 0.1,
            onComplete: () => {
              dispatch({
                type: 'ANIMATE_END',
                tabIndex: newTabIndex,
              })
            }, // E aqui um onComplete mudando isAnimating para false
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
      opacity: 0,
      duration: 0.3,
      ease: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
    })
  }

  return (
    <section className={className} {...rest}>
      <div className="w-28 rounded-3xl bg-primary-color text-center">
        <span className="bg-yellow theme rounded-full p-10">Serviços</span>
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
      <section className="infos relative mt-8 flex max-h-[22rem] w-full">
        <aside ref={textAreaRef} className="left h-full w-[50%]">
          <div className="text-area min-h-[20rem] bg-[#20202010] p-5 backdrop-blur-md">
            <h3 className="text-xl font-semibold">
              {state.selectedTab.subtitulo}
            </h3>
            <div className="w-4/4 relative my-4 flex flex-col">
              {state.selectedTab.texto}
            </div>
            <ButtonBackgroundShine className="relative bottom-0 w-full" />
          </div>
        </aside>
        <Image
          ref={macRef}
          src={mac}
          width={600}
          height={500}
          alt="MAC"
          className="z-1 absolute -top-8 right-[.92rem] w-[48rem] scale-90"
        />
        <aside className="right relative flex w-full scale-90 justify-center overflow-hidden">
          <div
            ref={contentRef}
            className="relative w-auto overflow-hidden rounded-lg"
          >
            <Image
              src={state.selectedTab.image}
              width={400}
              height={400}
              ref={imageRef}
              alt="Nav Big Image"
              className="z-30 h-full w-[35rem]"
            />
          </div>
        </aside>
      </section>
    </section>
  )
}
