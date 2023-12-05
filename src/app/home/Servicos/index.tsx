/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useLayoutEffect,
  useReducer, useRef, useState,
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

function reducer(state: any, action: { type: string; value?: number; size?: { width: number, height: number } }) {
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
    case 'CHANGE_ANIMATION_AREA_SIZE':
      return {
        ...state,
        animationArea: action.size,
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
  animationArea: {
    width: number
    height: number
  }
}

export default function Servicos({ scrollerRef, className, ...rest }: ServiceProps) {
  const initialState: initialStateProps = {
    actualIndex: 0,
    selectedTab: services[0],
    isAnimating: false,
    animationArea: { width: 0, height: 0 }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { mobileState } = useMobileContext();
  const animations = [CriarEmpresa, Societario, Fiscal, Contabil];
  const animationAreaRef = useRef<HTMLDivElement>(null)
  const currentWindowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

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

  useEffect(() => {
    if (animationAreaRef.current) {
      dispatch({
        type: 'CHANGE_ANIMATION_AREA_SIZE',
        size: { width: animationAreaRef.current.offsetWidth, height: animationAreaRef.current.offsetHeight }
      })
    }
  }, [currentWindowWidth])

  return (
    <section className={cn(styles.servicos, className)} {...rest}>
      <section className={cn('max-h-[90vh] w-full flex flex-col justify-center items-center py-8')}>
        <h1 className={cn("font-semibold md:text-4xl lg:text-6xl text-center text-3xl", styles.title)}>Como podemos ajudar<span className={cn('font-black md:text-5xl lg:text-7xl text-3xl', 'text-primary-color')}>?</span></h1>
        <div className={cn(styles.contentWrapper, 'flex h-full w-full justify-center items-center md:my-10 gap-4 md:px-10 xsm:flex-col-reverse md:!flex-row')}>
          {/* LEFT AREA */}
          <div className={cn(styles.left, 'h-full self-start xsm:w-full md:!w-2/5')}>
            <div className={cn(styles.textArea, 'w-full h-full flex flex-col relative justify-start items-center')}>
              <Seletores
                services={services}
                state={state}
                switchTab={switchTab}
                styles={styles}
                className={cn(styles.seletores, 'z-[90]')}
              />
              {/* TEXTO */}
              <div className={cn(
                styles.text,
                "bg-[#202020] w-full h-full md:min-h-[450px] xsm:min-h-[50%] max-w-[25rem] rounded-xl flex-1 flex flex-col justify-between",
              )}>
                {/* SUBTITULO */}
                <div className={cn(
                  'bg-primary-color rounded-full w-4/5 h-10 mx-auto relative -translate-y-1/2 justify-center items-center hidden xsm:flex',
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
          <div ref={animationAreaRef} className={cn(styles.right, 'relative h-full flex flex-col md:!flex-1 xsm:!w-full items-center sm:gap-12')}>
            {/* ANIMATION CONTAINER */}
            <div className={cn(
              styles.animationContainer,
              'w-full h-3/5 md:!min-h-[60%] xsm:max-h-[250px]',
            )}>
              <div title={state.selectedTab.subtitulo} className={cn(styles.animationArea, 'w-full h-full relative mx-auto')}>
                {animations.map((Animation, index) => (
                  index === state.actualIndex &&
                  (
                    <Animation
                      width={mobileState.isSmallScreen ? state.animationArea.width : state.animationArea.width * 0.95}
                      height={mobileState.isSmallScreen ? state.animationArea.height * 0.5 : state.animationArea.height * 0.5}
                      key={index}
                      className={cn(
                        'relative cursor-default overflow-hidden object-cover mx-auto xsm:min-h-[300px] xsm:min-w-full lg:min-h-[300px] max-w-[692px] max-h-[307px]',
                      )} />
                  )
                ))}
              </div>
            </div>
            {/* FOOTER TEXT AREA */}
            <div className={cn(styles.animationFooter, 'w-full h-max justify-between items-center relative mx-auto flex', 'xsm:hidden sm:flex-col lg:!flex-col md:!block xl:!flex-row xl:!flex-1')}>
              <div className={cn(styles.fraseStyle, 'w-full text-4xl', 'sm:w-[150px] !sm:flex-1 !sm:text-5xl lg:w-full xl:flex-1 xl:min-w-[480px] xl-max:h-[200px] xl:text-7xl border-2 border-yellow-500')}>
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
              <div className='flex-1 h-12 flex justify-center text-md'>
                <Link className={cn('w-4/5 relative')} href={'/contato'}>
                  <ButtonBackgroundShine text='Fale com a gente! 🤙🏼' className='rounded-3xl min-w-full h-full' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section >
  )
}
