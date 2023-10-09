/* eslint-disable no-unused-vars */
import React, {
  Fragment,
  RefObject,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import Link from 'next/link'

import { ServiceProps } from '@/types'
import services from '@/common/data/services.json'
import ServiceNav from '@/app/home/Servicos/ServiceNav'
import styles from './Servicos.module.scss'
import { useMobileContext } from '@/common/context/MobileDeviceContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { CriarEmpresa, Societario } from '@/components/Animation'
import Seletores from '@/components/ui/seletores'

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

export default function Servicos({ scrollerRef, className, ...rest }: ServiceProps) {
  const initialState = {
    actualIndex: 0,
    selectedTab: services[0],
    isAnimating: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { mobileState } = useMobileContext();
  const animations = [CriarEmpresa, Societario]

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
    <section className={cn(styles.servicos, "py-2 w-full", className)} {...rest}>
      <section className={cn('space-y-20 h-full w-full my-4 mx-auto', styles.wrapper)}>
        <h1 className={cn("title-G font-black text-4xl text-center !mt-4 !mb-1", styles.title)}>Como podemos ajudar<span className={cn('font-black text-5xl', 'textYellow-G')}>?</span></h1>
        {mobileState.isMobileDevice &&
          <div className='relative flex flex-row justify-around items-center mx-auto !m-0'>
            <Seletores
              services={services}
              state={state}
              switchTab={switchTab}
              styles={styles}
              className='!m-0'
            />
            <div className={cn(
              'relative bg-primary-color flex items-center rounded-full w-1/5 h-10 mx-auto !m-0',
              styles.subtitle
            )}>
              <div className='w-full h-fit'><p className={cn('font-black text-base text-center text-white w-full')}>{state.selectedTab.titulo}!</p></div>
            </div>
          </div>
        }
        <div className={cn(styles.contentWrapper, 'flex flex-1 flex-col h-full w-full justify-center items-center')}>
          <aside className={cn(styles.textArea, 'w-3/5 flex flex-col', 'order-3')}>
            <Seletores
              services={services}
              state={state}
              switchTab={switchTab}
              styles={styles}
              className={cn(styles.seletoresDesktop, 'hidden')}
            />
            <div className={cn(
              'relative bg-primary-color rounded-full w-4/5 h-10 mx-auto -translate-y-1/2 justify-center hidden',
              styles.subtitle
            )}>
              <p className={cn('font-black text-base self-center text-white')}>{state.selectedTab.titulo}</p>
            </div>
            <div className={cn(
              "relative bg-[#202020] max-h-[300px] h-full w-full rounded-xl  flex flex-col justify-between",
              // 'min-h-[120px]',
              styles.text
            )}>
              <div className={cn(styles.selectedText, 'px-6 flex flex-col gap-6 text-white')}>
                {mobileState.isMobileDevice ?
                  <p className={cn('text-justify', styles.paragraph)}>{state.selectedTab.texto}</p>
                  :
                  formatTextToArray(state.selectedTab.texto).map((sentence, index) => (
                    <p key={index}>{sentence}.</p>
                  ))
                }
              </div>

            </div>
            <Link href={'/contato'} className={cn(styles.contactButton, 'mx-auto w-2/5')}>
              <Button className={cn('bg-white shadow-xl text-black w-full font-bold p-4 relative rounded-full -translate-y-1/2 !mx-auto', styles.textButton)}>
                Fale com a gente! 🤙🏼
              </Button>
            </Link>
          </aside>
          <aside style={state.actualIndex === 1 ? {
            backgroundImage: `url('/assets/img/animations/2/piso.png')`,
            backgroundSize: '150%',
            backgroundPosition: 'center 88.5%',
            backgroundOrigin: 'content-box',
            backgroundRepeat: 'no-repeat',
          } : {}}
            className={cn('w-full h-full flex overflow-hidden', styles.animationContainer)}
          >
            <div className={cn(styles.animationArea, 'w-max mx-auto')}>
              {animations.map((Animation, index) => (
                index === state.actualIndex &&
                (<Animation
                  title={state.selectedTab.subtitulo}
                  width={800}
                  height={index === 1 ? 400 : 400}
                  key={index}
                  className={cn(
                    'relative cursor-default scale-[.85]'
                  )}
                />
                )
              ))}
            </div>
          </aside>
        </div>
      </section>
    </section>
  )
}
