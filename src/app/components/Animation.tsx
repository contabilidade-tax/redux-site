'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)

const GameScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    // Dentro da função useEffect:
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!
      const cw = (canvas.width = 600)
      const ch = (canvas.height = 600)

      const bg = [
        { img: new Image(), x: 0 },
        { img: new Image(), x: 0 },
        { img: new Image(), x: 0 },
        { img: new Image(), x: 0 },
        { img: new Image(), x: 0 },
        { img: new Image(), x: 0 },
        { img: new Image(), x: 0 },
      ]

      bg[0].img.src = 'https://i.postimg.cc/0ySBb4f4/bg-1.png'
      bg[1].img.src = 'https://i.postimg.cc/G2YMpg1Q/bg-2.png'
      bg[2].img.src = 'https://i.postimg.cc/hPKCS0ZL/bg-3.png'
      bg[3].img.src = 'https://i.postimg.cc/T16t5jdX/bg-4.png'
      bg[4].img.src = 'https://i.postimg.cc/1RGChdBR/bg-5.png'
      bg[5].img.src = 'https://i.postimg.cc/TYQthWBZ/bg-6.png'
      bg[6].img.src = 'https://i.postimg.cc/6qfYr7q4/bg-7.png'

      const dino = { img: new Image(), spriteOffsetX: 0, x: cw / 3, top: 300 }
      dino.img.src = 'https://i.postimg.cc/HkV0jQpT/dfhfgfghfghfghh.png'

      gsap.to(dino, {
        duration: 0.55,
        spriteOffsetX: 1250,
        ease: 'steps(3)',
        repeat: -1,
      })

      gsap.ticker.add(() => {
        ctx.clearRect(0, 0, cw, ch)

        for (let i = 0; i < bg.length; i++) {
          const bgImage = bg[i]
          ctx.drawImage(bgImage.img, bgImage.x, 0, bgImage.img.width, ch)
        }

        const bgTl = gsap.timeline({ repeat: -1 })
        bgTl.to(bg, {
          x: `-=${cw}`,
          duration: 20,
          ease: 'none',
          repeatDelay: 1, // Intervalo entre cada repetição em segundos
        })

        ctx.drawImage(
          dino.img,
          dino.spriteOffsetX,
          0,
          100,
          140,
          dino.x,
          dino.top,
          85,
          150,
        )
      })
    }
  }, [])

  return <canvas className="gameScene" ref={canvasRef}></canvas>
}

export default GameScene
