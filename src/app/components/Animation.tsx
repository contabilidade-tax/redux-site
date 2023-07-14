'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { PixiPlugin } from 'gsap/PixiPlugin'

gsap.registerPlugin(PixiPlugin)

const GameScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!
      const cw = (canvas.width = 500)
      const ch = (canvas.height = 500)
      const imageWidth = 1000

      const bg = [
        { img: new Image(), x: cw },
        { img: new Image(), x: cw + 1000 },
        { img: new Image(), x: cw + 2000 },
        { img: new Image(), x: cw + 3000 },
        { img: new Image(), x: cw + 4000 },
        { img: new Image(), x: cw + 5000 },
        { img: new Image(), x: cw + 6000 },
      ]

      bg[0].img.src = 'https://i.postimg.cc/0ySBb4f4/bg-1.png'
      bg[1].img.src = 'https://i.postimg.cc/G2YMpg1Q/bg-2.png'
      bg[2].img.src = 'https://i.postimg.cc/hPKCS0ZL/bg-3.png'
      bg[3].img.src = 'https://i.postimg.cc/T16t5jdX/bg-4.png'
      bg[4].img.src = 'https://i.postimg.cc/1RGChdBR/bg-5.png'
      bg[5].img.src = 'https://i.postimg.cc/TYQthWBZ/bg-6.png'
      bg[6].img.src = 'https://i.postimg.cc/6qfYr7q4/bg-7.png'

      const dino = { img: new Image(), spriteOffsetX: 0, x: cw / 2, top: 250 }
      dino.img.src = 'https://i.postimg.cc/BZNyfc0w/3.png'

      const timeline = gsap.timeline({ repeat: -1 })

      bg.forEach((bgImage, index) => {
        timeline.to(bgImage, {
          duration: 2,
          x: -bgImage.img.width,
          ease: 'none',
        })
      })

      gsap.to(dino, {
        duration: 0.25,
        spriteOffsetX: 150,
        ease: 'steps(2)',
        repeat: -1,
      })

      gsap.ticker.add(() => {
        ctx.clearRect(0, 0, cw, ch)

        bg.forEach((bgImage) => {
          if (bgImage.img.complete) {
            ctx.drawImage(bgImage.img, bgImage.x, 0, imageWidth, ch)
          } else {
            bgImage.img.onload = () => {
              ctx.drawImage(bgImage.img, bgImage.x, 0, imageWidth, ch)
            }
          }
        })

        ctx.drawImage(
          dino.img,
          dino.spriteOffsetX + 1,
          0,
          74,
          78,
          dino.x,
          dino.top + 150,
          74,
          78,
        )
      })

      // Controlar a animação com a tecla de espaço
      window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
          if (timeline.paused()) {
            timeline.play()
          } else {
            timeline.pause()
          }
        }
      })
    }
  }, [])

  return <canvas ref={canvasRef} className="gameScene" />
}

export default GameScene
