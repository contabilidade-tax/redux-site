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
      <section className={cn('max-h-[90vh] w-full flex flex-col justify-center items-center py-8')}>
        <h1 className={cn("font-semibold md:text-4xl lg:text-6xl text-center text-3xl", styles.title)}>Como podemos ajudar<span className={cn('font-black md:text-5xl lg:text-7xl text-3xl', 'text-primary-color')}>?</span></h1>
        <div className={cn(styles.contentWrapper, 'flex h-full w-full justify-center items-center my-10')}>
          {/* LEFT AREA */}
          <div className={cn(styles.left, 'w-2/5 h-full self-start')}>
            <div className={cn(styles.textArea, 'w-full h-full flex flex-col relative justify-start items-center')}>
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
                "bg-[#202020] w-full h-full min-h-[450px] max-w-[25rem] rounded-xl flex-1 flex flex-col justify-between",
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
              'w-full h-3/5'
            )}>
              <div className={cn(styles.animationArea, 'w-full h-full relative mx-auto')}>
                {animations.map((Animation, index) => (
                  index === state.actualIndex &&
                  (
                    <Animation
                      title={state.selectedTab.subtitulo}
                      width={mobileState.isSmallScreen ? 600 : 800}
                      height={mobileState.isSmallScreen ? 300 : 400}
                      key={index}
                      className={cn(
                        'relative cursor-default w-full h-full overflow-hidden object-cover mx-auto',
                      )} />
                  )
                ))}
              </div>
            </div>
            {/* FOOTER TEXT AREA */}
            <div className={cn(styles.animationFooter, 'w-full h-max justify-between items-center relative mx-auto', 'xl:flex xl:flex-1')}>
              <div className={cn(styles.fraseStyle, 'w-[65%] max-h-[200px] text-7xl')}>
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
              <div className='flex-1 h-12 flex justify-center'>
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
