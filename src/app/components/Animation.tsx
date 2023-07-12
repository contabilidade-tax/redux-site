'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export default function DinoAnimation() {
  const dinoRef = useRef<HTMLImageElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const bg = bgRef.current
    const dino = dinoRef.current
    const scrollWidth = bg?.scrollWidth || 0
    const speed = 300 // Ajuste a velocidade alterando o valor
    const numFrames = 5 // Número de quadros na animação do dinossauro
    const frameDuration = 0.15 // Duração de cada quadro da animação do dinossauro

    // Animação do fundo
    const bgTl = gsap.timeline({ repeat: -1 })
    bgTl.to(bg, {
      x: -scrollWidth,
      duration: scrollWidth / speed,
      ease: 'none',
      onComplete: () => {
        gsap.set(bg, { x: 0 })
      },
    })

    // Animação do dinossauro
    const dinoTl = gsap.timeline({ repeat: -1 })
    dinoTl.to(dino, {
      duration: 0.55,
      spriteOffsetX: 1250,
      ease: 'steps(3)',
    })

    return () => {
      bgTl.kill()
      dinoTl.kill()
    }
  }, [])

  return (
    <section className="absolute top-1/2 flex h-screen w-full -translate-y-1/2 flex-col items-center justify-center bg-bg-color">
      <div className="container h-max w-[40rem] overflow-hidden">
        <div className="image-container relative w-[6000px] overflow-hidden">
          <Image
            ref={bgRef}
            src="/assets/img/animation/bg2.png"
            alt="Imagem"
            width={6000}
            height={600}
          />
          <Image
            className="absolute bottom-4 left-10"
            ref={dinoRef}
            src="/assets/img/animation/dino.png"
            alt="Dinossauro"
            width={200}
            height={200}
          />
        </div>
      </div>
    </section>
  )
}
