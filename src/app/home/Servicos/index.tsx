/* eslint-disable no-unused-vars */
import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import Link from 'next/link'

import { ServiceProps } from '@/types'
import { ButtonBackgroundShine } from 'src/components/Tools'
import services from '@/common/data/services.json'
import ServiceNav from '@/app/home/Servicos/ServiceNav'
import styles from './Servicos.module.scss'

// Import Swiper React components
// import required modules
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'

gsap.registerPlugin(ScrollTrigger)
SwiperCore.use([FreeMode, Scrollbar, Mousewheel])

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
    case 'CURRENT_CLIENT_SIZE':
      return {
        ...state,
        isSmallScreen: action.value
          ? action.value >= 300 && action.value <= 1024
          : false,
        isMobileDevice: action.value
          ? action.value >= 300 && action.value <= 640
          : false,
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
    isSmallScreen: false,
    isMobileDevice: false,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const textAreaRef = useRef<HTMLDivElement>(null)
  const textAreaTituloRef = useRef<HTMLParagraphElement>(null)
  const textAreaTextRef = useRef<HTMLParagraphElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const macRef = useRef<HTMLImageElement>(null)
  const contentWrapperRef = useRef<HTMLImageElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // const currentWidth = window?.innerWidth || document.documentElement.clientWidth
  const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 0

  const switchTab = (newTabIndex: number) => {
    if (state.isAnimating) return // Ignore se já estiver animando
    if (state.selectedTab === services[newTabIndex]) return // Ignore se for a mesma aba

    dispatch({
      type: 'ANIMATE_START',
    })

    // Iniciar a animação de transição na imagem atual
    animateTransition(imageRef, newTabIndex)
  }

  const handleCurrentSize = () => {
    dispatch({
      type: 'CURRENT_CLIENT_SIZE',
      value: currentWidth,
    })
  }

  // LayoutEffect para mudança no tamanho de tela
  useLayoutEffect(() => {
    // Listener do tamanho da tela
    handleCurrentSize()

    // Adiciona o EventListener
    window.addEventListener('resize', handleCurrentSize)

    // Remove o EventListener
    return () => {
      window.removeEventListener('resize', handleCurrentSize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWidth])

  // animação dos menus de navegação e seleção da área
  useEffect(() => {
    // Verifica se é dispositivo móvel assim que é montado
    handleCurrentSize()

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
          // Área do titulo do texto
          gsap.fromTo(
            textAreaTituloRef.current,
            { x: -100, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.3,
              delay: 0.55,
            },
          )

          // Animação do texto
          gsap.fromTo(
            textAreaTextRef.current,
            { y: 100, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, delay: 0.7 },
          )

          // Animação do MAC
          gsap.fromTo(
            macRef.current,
            { y: 100, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, delay: 0.15 },
          )
          // Imagem
          gsap.fromTo(
            contentWrapperRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5, delay: 0.65 },
          )
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animateTransition = (
    target: RefObject<HTMLDivElement>,
    newTabIndex: number,
  ) => {
    const titulo = textAreaTituloRef.current
    const texto = textAreaTextRef.current

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
    if (texto) {
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
        className={`${styles.infoSection} relative mb-12 mt-8 flex h-auto min-h-[15rem] w-full flex-1 flex-col gap-6`}
      >
        {/* TextArea com conteúdo */}
        <aside className="relative h-[5rem] w-full">
          <div
            className={
              `${styles.textArea} ` +
              'relative flex justify-between bg-[#20202010] p-5 backdrop-blur-md'
            }
          >
            <div
              ref={textAreaRef}
              className={
                `${styles.text} ` +
                'flex items-center justify-between overflow-hidden'
              }
            >
              <h3 ref={textAreaTituloRef} className="text-xl font-semibold">
                {state.selectedTab.subtitulo}
              </h3>
              {!state.isSmallScreen && (
                <p hidden ref={textAreaTextRef} className={styles.desktopText}>
                  {state.selectedTab.texto}
                </p>
              )}
            </div>
            <Link href="/contato">
              <ButtonBackgroundShine className="w-full self-end px-1 py-5" />
            </Link>
          </div>
        </aside>

        <aside className={`${styles.imageArea} ` + 'relative h-auto w-full'}>
          <section
            className={
              `${styles.screen} ` + 'relative flex h-full w-full justify-center'
            }
          >
            <div
              className={
                `${styles.wrapper} ` + 'flex h-[18rem] w-full flex-1 flex-row'
              }
            >
              {state.isSmallScreen ? (
                <div
                  className={
                    `${styles.Text} ` +
                    'h-full w-1/3 min-w-[195px] gap-4 overflow-hidden border-2 border-dashed border-black bg-[#202020]/10 p-4 backdrop-blur-md'
                  }
                >
                  <div ref={textAreaRef} className={styles.text}>
                    <p ref={textAreaTextRef}>{state.selectedTab.texto}</p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div
                ref={macRef}
                style={{
                  backgroundImage: `url(${
                    state.isSmallScreen
                      ? '/assets/img/tablet.png'
                      : '/assets/img/mac.png'
                  })`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
                className={
                  `${styles.Image} ` +
                  'relative z-10 mx-auto h-full w-3/5 scale-105'
                }
              >
                <section
                  ref={contentWrapperRef}
                  className={
                    `${styles.contentWrapper} ` +
                    'top-[2%] mx-auto mt-[28.5px] h-[14.4rem] w-auto max-w-[173px] -translate-x-[0.4rem] overflow-hidden'
                  }
                >
                  <div
                    ref={imageRef}
                    className={
                      `${styles.content} ` + 'relative z-[-1] h-full w-full'
                    }
                    style={{
                      backgroundImage: `url(${state.selectedTab.image})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                </section>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </section>
  )
}
