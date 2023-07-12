import React from 'react'
import Image from 'next/image'

import '../common/utils/loading.css'

// const reduAnimatedSvg = '/assets/img/loading/redu_animated.svg'
const reduAnimatedSvg = '/assets/img/loading/REDU_VETORIZADO_animated.svg'
const reduSvg = '/assets/img/loading/REDU.svg'
const XAnimatedSvg = '/assets/img/loading/animated_final.svg'
const XSvg = '/assets/img/loading/redux_x_branco.svg'
// const contabilidadeSvg = '/assets/img/loading/name.svg'

type Props = {
  XRef: React.RefObject<HTMLImageElement>
  XAnimatedRef: React.RefObject<HTMLImageElement>
  reduRef: React.RefObject<HTMLImageElement>
  reduAnimatedRef: React.RefObject<HTMLImageElement>
  contabilidadeRef: React.RefObject<HTMLImageElement>
}

export default function Main({
  XRef,
  XAnimatedRef,
  reduRef,
  reduAnimatedRef,
  contabilidadeRef,
}: Props) {
  const { value } = { value: Math.random() }

  return (
    <>
      <section className="absolute top-1/2 flex h-screen w-full -translate-y-1/2 flex-col items-center justify-center bg-bg-color">
        <section id="wrapper" className="relative flex items-center">
          <div className="relative left-4">
            <Image
              id="redu_vetor"
              className="animated"
              src={reduAnimatedSvg + `?v=${value}`}
              width={300}
              height={300}
              alt="Redu"
              ref={reduAnimatedRef}
            />
            <Image
              id="redu"
              className="notAnimated"
              src={reduSvg}
              width={300}
              height={300}
              alt="Redu"
              ref={reduRef}
            />
          </div>
          <div className="relative -top-6 right-2">
            <Image
              id="svg1"
              className="animated"
              src={XAnimatedSvg + `?v=${value}`}
              alt="X"
              width={175}
              height={225}
              ref={XAnimatedRef}
            />
            <Image
              id="svg2"
              className="notAnimated"
              src={XSvg}
              alt="X_logo"
              width={175}
              height={225}
              ref={XRef}
            />
          </div>
          <div id="contabilidadeContainer absolute">
            <h4
              id="contabilidade"
              ref={contabilidadeRef}
              className="absolute bottom-0 left-[1.1rem] flex text-center text-2xl font-semibold text-primary-color"
            >
              contabilidade
            </h4>
          </div>
          {/* <Image
            id="contabilidade"
            className="max-w-72 absolute bottom-24 left-5 md:w-40"
            src={contabilidadeSvg}
            width={300}
            height={50}
            alt="Contabilidade"
            ref={contabilidadeRef}
          /> */}
        </section>
      </section>
    </>
  )
}
