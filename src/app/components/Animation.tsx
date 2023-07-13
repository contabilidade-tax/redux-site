'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const GameScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!

      let cw = (canvas.width = 800)
      let ch = (canvas.height = 800)

      const bg = new Image()
      bg.src = 'https://i.postimg.cc/fWqT7zSp/bg2.png'
      const bgPosition = { x: 0 }

      const dino = { img: new Image(), spriteOffsetX: 0, x: cw / 2, top: 402 }

      const dinoImg = new Image()
      dinoImg.onload = () => {
        // A imagem está agora totalmente carregada e pode ser usada sem qualquer atraso.
      }
      dinoImg.src = 'https://i.postimg.cc/HkV0jQpT/dfhfgfghfghfghh.png'

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

        ctx.drawImage(bg, bgPosition.x, 0)
        ctx.drawImage(
          dino.img,
          dino.spriteOffsetX,
          0,
          100,
          140,
          dino.x - 250,
          dino.top + 150,
          85,
          150,
        )
      })

      gsap.to(bgPosition, {
        x: -bg.width,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return <canvas className="gameScene" ref={canvasRef}></canvas>
}

export default GameScene
