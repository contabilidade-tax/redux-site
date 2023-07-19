'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Main from '../MainLoading'

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
      // hide(X)
      // hide(redu)
      // hide(contabilidade)

      outAnimate()
      enter()
      enterContabilidade()
    }

    // function hide(el: any) {
    //   el.style.opacity = '0'
    // }

    function enter(el = [X, redu]) {
      gsap.to(el, { delay: 1.7, opacity: 1, duration: 1.5 })
    }

    function enterContabilidade(el = contabilidade) {
      gsap.to(el, { delay: 1.8, opacity: 1, duration: 0.8 })
    }

    function outAnimate(el = [logoAnimated, reduAnimated]) {
      gsap.to(el, { delay: 1.6, opacity: 0, duration: 0.5 })
    }

    show()
  }, [])

  return (
    <Main
      XRef={XRef}
      XAnimatedRef={XAnimatedRef}
      reduRef={reduRef}
      reduAnimatedRef={reduAnimatedRef}
      contabilidadeRef={contabilidadeRef}
    />
  )
}
