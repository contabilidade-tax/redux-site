/* eslint-disable no-unused-vars */
import { AnimatePresence, LayoutGroup, motion, useAnimation } from 'framer-motion'
import { useEffect, useReducer, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { gsap } from 'gsap'

import { Icon, ButtonBackgroundShine } from 'src/components/Tools'
import { ServiceProps } from '@/types'

import styles from './Servicos.module.scss'
import services from '@/common/data/services.json'

gsap.registerPlugin(ScrollTrigger)

const initialState = {
  selectedTab: 0,
  showingTab: 0,
  animating: false,
};

function reducer(state: any, action: { type: string; tabIndex: number }) {
  switch (action.type) {
    case "ANIMATE_OUT":
      return { ...state, selectedTab: action.tabIndex, animating: true };
    case "CHANGE_TAB":
      return { ...state, showingTab: action.tabIndex, animating: false };
    default:
      return state;
  }
}

export default function Servicos({ className, ...rest }: ServiceProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const animationControls = services.map(() => useAnimation());

  const textAreaRef = useRef<HTMLDivElement>(null)
  const tituloRef = useRef<HTMLDivElement>(null)
  const infoButtonRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const switchTab = (newTabIndex: number) => {
    if (state.animating) return; // Ignore se já estiver animando
    dispatch({
      type: "ANIMATE_OUT",
      tabIndex: newTabIndex
    });

    animationControls[state.showingTab].start(exit).then(() => {
      // Aqui, adicionamos um atraso antes de mudar para o próximo elemento
      setTimeout(() => {
        dispatch({
          type: "CHANGE_TAB",
          tabIndex: newTabIndex
        });
        animationControls[newTabIndex].start(animate);

      }, 100); // o atraso deve corresponder à duração da animação de saída
    });
  };

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
        },
      })
    }
  }, [])

  const exit = {
    transform: 'scaleX(0)',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.550, 0.085, 0.680, 0.530],
    },
  };
  const initial = {
    transform: "translateY(1000px)",
    opacity: 0,
  }
  const animate = {
    transform: "translateY(0)",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }

  return (
    <LayoutGroup >
      <AnimatePresence mode="wait">
        <section className={className} {...rest}>
          <div className="w-28 rounded-3xl bg-primary-color text-center">
            <span className="bg-yellow theme rounded-full p-10">Serviços</span>
          </div>
          <div className="my-8">
            <h1 className="text-5xl font-bold">Como podemos ajudar?</h1>
          </div>
          <nav ref={navRef} className={`${styles['service-nav']} w-5/5 max-h-max`}>
            <ul className="flex justify-start">
              {services.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    switchTab(index)
                  }}
                  className={item === state.showingTab ? styles.selectedItem : ''}
                >
                  <Icon src={`/assets/img/icons/${item.icon}`} />
                  <span>{item.titulo}</span>
                </li>
              ))}
            </ul>
          </nav>
          <section className="infos relative my-8 flex max-h-max flex-1 gap-20">
            <motion.div
              className="left w-1/3"
              key={state.showingTab ? state.showingTab.titulo : ''}
            >
              <div className="text-area bg-[#20202010] p-5 backdrop-blur-md">
                <h3 ref={tituloRef} className="text-xl font-semibold">
                  {state.showingTab.subtitulo}
                </h3>
                <div
                  ref={textAreaRef}
                  className="w-4/4 my-4 flex flex-col gap-10"
                >
                  {state.showingTab.texto}
                  <div ref={infoButtonRef}>
                    <ButtonBackgroundShine className="w-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={initial} animate={animationControls[state.showingTab]} >
              <Image
                src={state.showingTab.image}
                width={400}
                height={400}
                alt="Nav Big Image"
                className="w-full"
              />
            </motion.div>
          </section>
        </section >
      </AnimatePresence>
    </LayoutGroup>
  )
}
