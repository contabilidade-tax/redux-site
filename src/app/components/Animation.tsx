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

      let cw = (canvas.width = 500) // Largura do canvas
      let ch = (canvas.height = 500) // Altura do canvas

      const bg = { img: new Image(), x: 0 }
      const dino = { img: new Image(), spriteOffsetX: 0, x: cw / 3, top: 300 }
      bg.img.src = 'https://i.postimg.cc/fWqT7zSp/bg2.png'
      dino.img.src = 'https://i.postimg.cc/HkV0jQpT/dfhfgfghfghfghh.png'

      gsap.to(dino, {
        duration: 0.55,
        spriteOffsetX: 1250,
        ease: 'steps(3)',
        repeat: -1,
      })

      gsap.ticker.add(() => {
        cw = canvas.width = 500
        ch = canvas.height = 500

        ctx.clearRect(0, 0, cw, ch)

        ctx.drawImage(bg.img, bg.x, 0, bg.img.width, ch)
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
      // const speed =
      const bgTl = gsap.timeline({ repeat: -1 })
      bgTl.to(bg, {
        x: -bg.img.width + cw,
        duration: 20,
        ease: 'none',
      })
    }
  }, [])

  return <canvas className="gameScene" ref={canvasRef}></canvas>
}

export default GameScene
