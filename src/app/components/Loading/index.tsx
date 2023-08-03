'use client'
import { gsap } from 'gsap'
import React, { useEffect, useRef } from 'react'
import styles from './loading.module.scss'

// Variáveis de referência das imagens
const reduAnimatedSvg = '/assets/img/loading/REDU_ANIMATED.svg'
const reduSvg = '/assets/img/loading/REDU.svg'
const XAnimatedSvg = '/assets/img/loading/X_ANIMATED_EASE.svg'
const XSvg = '/assets/img/loading/X.svg'

interface LoadingProps {
  XRef: React.RefObject<HTMLImageElement>
  XAnimatedRef: React.RefObject<HTMLImageElement>
  reduRef: React.RefObject<HTMLImageElement>
  reduAnimatedRef: React.RefObject<HTMLImageElement>
  contabilidadeRef: React.RefObject<HTMLImageElement>
}

// Controle de classes das animações
function MainLoading({
  XRef,
  XAnimatedRef,
  reduRef,
  reduAnimatedRef,
  contabilidadeRef,
}: LoadingProps) {
  // Usado para prevenir caching das animações svg
  const { value } = { value: Math.random() }

  const xSize = 150

  return (
    <section className="absolute top-0 flex min-h-screen w-full items-center justify-center overflow-hidden bg-bg-color">
      <section className="relative flex h-max w-fit flex-wrap items-center justify-center">
        {/* REDU */}
        <div className="relative">
          <img
            className={`${styles.animated} h-[78.5px]`}
            src={reduAnimatedSvg + `?v=${value}`}
            alt="Redu"
            width={300}
            height={0}
            ref={reduAnimatedRef}
          />
          <img
            className={`${styles.notAnimated} h-[78.5px]`}
            src={reduSvg}
            width={300}
            height={0}
            alt="Redu SOLID"
            ref={reduRef}
          />
        </div>
        {/* X */}
        <div className="relative -left-5 -top-[0.10rem]">
          <img
            className={`${styles.animated}`}
            src={XAnimatedSvg + `?v=${value}`}
            alt="X_Animated"
            width={xSize}
            height={xSize}
            ref={XAnimatedRef}
          />
          <img
            className={`${styles.notAnimated}`}
            src={XSvg}
            alt="X"
            width={xSize}
            height={xSize}
            ref={XRef}
          />
        </div>
        {/* CONTABILIDADE */}
        <div className="absolute -left-[0.95rem] bottom-1 h-[20px] w-[382px]">
          <h4
            ref={contabilidadeRef}
            className={`${styles.contabilidade} absolute bottom-0 left-[1.1rem] flex text-center text-2xl font-semibold text-primary-color`}
          >
            contabilidade
          </h4>
        </div>
      </section>
    </section>
  )
}

// Controle da ordem das animações
export default function Loading() {
  const XRef = useRef<HTMLImageElement>(null)
  const XAnimatedRef = useRef<HTMLImageElement>(null)
  const reduRef = useRef<HTMLImageElement>(null)
  const reduAnimatedRef = useRef<HTMLImageElement>(null)
  const contabilidadeRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const X = XRef?.current
    const logoAnimated = XAnimatedRef?.current
    const redu = reduRef?.current
    const reduAnimated = reduAnimatedRef?.current
    const contabilidade = contabilidadeRef?.current

    function show() {
      outAnimate()
      enter()
      enterContabilidade()
    }

    function enter(el = [X, redu]) {
      gsap.to(el, { delay: 1.7, opacity: 1, duration: 1.5 })
    }

    function enterContabilidade(el = contabilidade) {
      gsap.to(el, { delay: 1.9, opacity: 1, duration: 0.8 })
    }

    function outAnimate(el = [logoAnimated, reduAnimated]) {
      gsap.to(el, { delay: 1.6, opacity: 0, duration: 0.5 })
    }

    show()
  }, [])

  return (
    <MainLoading
      XRef={XRef}
      XAnimatedRef={XAnimatedRef}
      reduRef={reduRef}
      reduAnimatedRef={reduAnimatedRef}
      contabilidadeRef={contabilidadeRef}
    />
  )
}
