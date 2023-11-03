/* eslint-disable no-unused-vars */
import React, {
  useReducer,
} from 'react'
import Link from 'next/link'

import { ServiceProps } from '@/types'
import services from '@/common/data/services.json'
import ServiceNav from '@/app/home/Servicos/ServiceNav'
import styles from './Servicos.module.scss'
import { useMobileContext } from '@/common/context/MobileDeviceContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { CriarEmpresa, Societario, Fiscal, Contabil } from '@/components/Animation'
import Seletores from '@/components/ui/seletores'
import { ButtonBackgroundShine } from '@/components/Tools'

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
    default:
      return state
  }
}

function formatTextToArray(text: string) {
  return text.split('. ').map(sentence => sentence.trim()).filter(Boolean);
}

interface initialStateProps {
  actualIndex: number
  selectedTab: typeof services[0]
  isAnimating: boolean
}

export default function Servicos({ scrollerRef, className, ...rest }: ServiceProps) {
  const initialState: initialStateProps = {
    actualIndex: 0,
    selectedTab: services[0],
    isAnimating: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { mobileState } = useMobileContext();
  const animations = [CriarEmpresa, Societario, Fiscal, Contabil];

  const switchTab = (index: number) => {
    if (state.isAnimating) return // Ignore se já estiver animando
    if (state.selectedTab === services[index]) return // Ignore se for a mesma aba

    // dispatch({
    //   type: 'ANIMATE_START',
    // })
    if (index < 0) {
      index = services.length - 1
    } else if (index > services.length - 1) {
      index = 0
    }
    dispatch({
      type: 'CHANGE_TAB',
      value: index,
    })

    // animateInAndOut(imageRef, index)
  }

  return (
    <section className={cn(styles.servicos, className)} {...rest}>
      <section className={cn('h-full w-full flex flex-col justify-center items-center')}>
        <h1 className={cn("m-0 p-0 title-G font-semibold text-4xl text-center !w-max !h-max", styles.title)}>Como podemos ajudar<span className={cn('font-black text-5xl', 'text-primary-color')}>?</span></h1>
        <div className={cn(styles.contentWrapper, 'mt-2 flex h-[75%] w-full', 'xl:h-[65%]')}>
          {/* LEFT AREA */}
          <div className={cn(styles.left, 'w-1/3 h-full')}>
            <div className={cn(styles.textArea, 'w-full h-full flex flex-col relative justify-center items-center')}>
              <Seletores
                services={services}
                state={state}
                switchTab={switchTab}
                styles={styles}
                className={cn(styles.seletores)}
              />
              {/* TEXTO */}
              <div className={cn(
                styles.text,
                "bg-[#202020] w-full max-h-full max-w-[25rem] rounded-xl flex-1 flex flex-col justify-between",
              )}>
                {/* SUBTITULO */}
                <div className={cn(
                  'bg-primary-color rounded-full w-4/5 h-10 mx-auto relative -translate-y-1/2 justify-center items-center hidden md:flex',
                  styles.subtitle
                )}>
                  <p className={cn('font-semibold text-base text-center text-white', 'w-max h-max')}>{state.selectedTab.titulo}</p>
                </div>
                {/* TEXTO SELECIONADO */}
                <div className={cn(
                  styles.selectedText,
                  'flex px-3 text-white text-lg xl:text-2xl',
                  'md:px-6 md:flex-col md:gap-4'
                )}>
                  {mobileState.isSmallScreen ?
                    <p className={cn('text-left leading-snug', styles.paragraph)}>{state.selectedTab.texto}</p>
                    :
                    formatTextToArray(state.selectedTab.texto).map((sentence, index) => (
                      <p className='text-left' key={index}>{sentence}.</p>
                    ))
                  }
                </div>
                {/* COISA INVISIVEL PRA CENTRALIZAR O TEXTO */}
                <div className={cn(
                  'bg-primary-color rounded-full w-4/5 h-10 mx-auto relative justify-center items-center opacity-0',
                )} />
              </div>
            </div>
          </div>
          {/* RIGHT AREA */}
          <div className={cn(styles.right, 'flex-1 h-full flex flex-col justify-center items-center')}>
            <div className={cn(
              styles.animationContainer,
              'w-full h-[75%] min-h-[421px]',
            )}>
              <div className={cn(styles.animationArea, 'w-full h-full relative')}>
                {animations.map((Animation, index) => (
                  index === state.actualIndex &&
                  (
                    <Animation
                      title={state.selectedTab.subtitulo}
                      width={400}
                      height={mobileState.isSmallScreen ? 400 : 400}
                      key={index}
                      className={cn(
                        styles.animation,
                        'relative cursor-default w-full h-full lg:w-5/6 overflow-hidden background-cover',
                      )} />
                  )
                ))}
              </div>
            </div>
            {/* FOOTER TEXT AREA */}
            <div className={cn(styles.animationFooter, 'w-full h-max justify-between items-center hidden', 'xl:flex xl:flex-1')}>
              <div className={cn(styles.fraseStyle, 'max-w-[80%] max-h-[200px] text-7xl')}>
                {state.selectedTab.frase.split('\\').map((sentence: any, index: any) => (
                  <h1
                    className={cn(
                      { 'text-primary-color font-bold': index !== 0 }
                    )}
                    key={index}>
                    {sentence}
                  </h1>
                ))}
              </div>
              <Link className='w-full max-w-[30%] h-12 self-end relative bottom-5  mx-auto' href={'/contato'}>
                <ButtonBackgroundShine text='Fale com a gente! 🤙🏼' className='rounded-3xl w-full h-full' />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section >
  )
}
