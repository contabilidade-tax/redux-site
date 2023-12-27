'use client'
import { gsap } from 'gsap'
import React, { useEffect, useRef } from 'react'

import styles from './Loading.module.scss'
import { cn } from '@/lib/utils'

// Variáveis de referência das imagens
const reduAnimatedSvg = '/assets/img/loading/REDU_ANIMATED.svg'
const reduSvg = '/assets/img/loading/REDU.svg'
const XAnimatedSvg = '/assets/img/loading/X_ANIMATED_EASE.svg'
const XSvg = '/assets/img/loading/X.svg'


// Controle da ordem das animações
export default function Loading() {
  const XRef = useRef<HTMLImageElement>(null)
  const XAnimatedRef = useRef<HTMLImageElement>(null)
  const reduRef = useRef<HTMLImageElement>(null)
  const reduAnimatedRef = useRef<HTMLImageElement>(null)
  const contabilidadeRef = useRef<HTMLImageElement>(null)
  const disclaimerRef = useRef<HTMLImageElement>(null)
  // Usado para prevenir caching das animações svg
  const { value } = { value: Math.random() }
  const xSize = 150

  useEffect(() => {
    const X = XRef?.current
    const logoAnimated = XAnimatedRef?.current
    const redu = reduRef?.current
    const reduAnimated = reduAnimatedRef?.current
    const contabilidade = contabilidadeRef?.current

    const tl = gsap.timeline()

    tl.to([logoAnimated, reduAnimated], { opacity: 0, duration: 1.5 }, 0)

    tl.to([X, redu], { opacity: 1, duration: 1, delay: 0.85 }, 0)

    tl.to(contabilidade, { opacity: 1, duration: 0.8 })

    tl.to(disclaimerRef.current, { opacity: 1, duration: 0.8, delay: 0.2 })

  }, [])


  return (
    <section className={`__variable_f2c080 absolute top-0 flex min-h-screen w-full items-center justify-center overflow-hidden bg-bg-color z-[9999]`}>
      <section
        className={
          `${styles.wrapper} ` +
          'relative flex h-max w-fit flex-wrap items-center justify-center'
        }
      >
        {/* REDU */}
        <div className={cn("relative w-max", styles.REDU)}>
          <img
            className={`${styles.animated} max-h-[78.5px] max-w-[300px]`}
            src={reduAnimatedSvg + `?v=${value}`}
            alt="Redu"
            width={0}
            height={0}
            ref={reduAnimatedRef}
          />
          <img
            className={`${styles.notAnimated} max-h-[78.5px] max-w-[300px]`}
            src={reduSvg}
            width={0}
            height={0}
            alt="Redu SOLID"
            ref={reduRef}
          />
        </div>
        {/* X */}
        <div className={cn("relative -left-5 -top-[0.10rem]", styles.X)}>
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
        <div className={cn("absolute max-h-[20px] max-w-[382px] h-[5%] w-[2%]", styles.CONTABILIDADE)}>
          {/* <div className={cn("absolute -left-[0.95rem] bottom-1 max-h-[20px] max-w-[382px] h-[5%] w-[2%]", styles.CONTABILIDADE)}> */}
          <h4
            ref={contabilidadeRef}
            className={`${styles.contabilidade} absolute text-2xl font-bold text-primary-color`}
          // className={`${styles.contabilidade} absolute bottom-0 left-[1.1rem] text-2xl font-bold text-primary-color`}
          >
            contabilidade
          </h4>
        </div>
      </section>
      <div ref={disclaimerRef} className={cn(styles.DISCLAIMER, 'flex flex-col justify-center items-center gap-2 absolute bottom-20 ')}>
        <p className='font-semibold'>Produzido por: </p>
        <img
          src="https://redux.app.br/assets/img/logo-verde-cortada.png"
          alt="Logo TAX"
          width={0}
          height={0}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }} />
      </div>
    </section>
  )
}
