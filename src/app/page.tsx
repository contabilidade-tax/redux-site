/* eslint-disable no-unused-vars */
'use client'
import React from 'react'
import Image from 'next/image'

import { Zoom } from 'react-slideshow-image'

import 'react-slideshow-image/dist/styles.css'
import Servicos from './components/Servicos'
import { ButtonBackgroundShine } from '../app/components/Tools'

export default function Home() {
  const images = [
    'https://img.freepik.com/fotos-gratis/mulher-de-negocios-usando-um-tablet-para-analisar-o-conceito-de-sucesso-de-estatisticas-de-estrategia-de-financas-de-empresa-e-planejamento-para-o-futuro-na-sala-de-escritorio_74952-1410.jpg?w=1060&t=st=1688670368~exp=1688670968~hmac=a6b603f6482e5dcbcc57660905124c2b22ce63d4d8da102cb4ebcb04c7a05382',
    'https://images.pexels.com/photos/6863244/pexels-photo-6863244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/5196821/pexels-photo-5196821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://img.freepik.com/fotos-gratis/trabalhadores-de-escritorio-usando-graficos-de-financas_23-2150408642.jpg?w=996&t=st=1688670788~exp=1688671388~hmac=5fb3c06391504607b4c6c9d980515a35c3bce0395ece6181e2462c742dc232d5',
  ]

  const properties = {
    indicators: true,
    scale: 1.4,
    arrows: false,
    duration: 3000,
    transitionDuration: 1000,
    autoplay: true,
    pauseOnHover: true,
    canSwipe: true,
    cssClass: 'slide',
  }

  return (
    <div className="z-10 flex h-full w-full flex-col px-24 pt-28">
      <section className="first-visualization flex flex-1">
        <section className="left-area w-2/4">
          <div className="home-text w-5/5 text-7xl leading-none">
            <h1 className="w-full">Não somos obrigação,</h1>
            <h1 className="w-full font-extrabold">
              somos ferramenta
              <span className="text-yellow">.</span>
            </h1>
          </div>
          <div className="flex flex-col">
            <div className="mt-28">
              <h2 className="text-3xl">
                Soluções contábeis personalizadas <br />
                para simplificar sua rotina.
              </h2>
            </div>
            <ButtonBackgroundShine
              text="Fale com a gente! 🤙🏼"
              className="mt-8 w-2/4 rounded-full px-4 py-2 text-zinc-100"
            />
          </div>
        </section>
        <section className="right-area relative -left-10 -top-14 h-2/6 w-1/2 scale-90 p-2">
          {/* <Zoom {...properties}>
            {images.map((image, index) => (
              <div className="each-slide-effect" key={index}>
                <div style={{ backgroundImage: `url(${image})` }}>
                  <span>Slide {index + 1}</span>
                </div>
              </div>
            ))}
          </Zoom> */}
          <div className="flex flex-col">
            <Image
              className="relative h-72 rounded-full p-4"
              src="/assets/video.gif"
              width={600}
              height={0}
              alt="bsayhdb"
            />
          </div>
        </section>
      </section>
      <div className="divisor"></div>
      <Servicos className="servicos relative" />
      <section className="my-8">A</section>
    </div>
  )
}
