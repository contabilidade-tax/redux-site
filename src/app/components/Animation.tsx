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
        { img: new Image(), x: cw / 2 },
        { img: new Image(), x: cw + 1000 },
        { img: new Image(), x: cw + 2000 },
        { img: new Image(), x: cw + 3000 },
        { img: new Image(), x: cw + 4000 },
        { img: new Image(), x: cw + 5000 },
        { img: new Image(), x: cw + 6000 },
      ]
      const dino = { img: new Image(), spriteOffsetX: 0, x: cw / 5, top: 250 }
      const dinoPaused = {
        img: new Image(),
        spriteOffsetX: 0,
        x: cw / 5,
        top: 250,
      }

      bg[0].img.src = 'https://i.postimg.cc/0ySBb4f4/bg-1.png'
      bg[1].img.src = 'https://i.postimg.cc/G2YMpg1Q/bg-2.png'
      bg[2].img.src = 'https://i.postimg.cc/hPKCS0ZL/bg-3.png'
      bg[3].img.src = 'https://i.postimg.cc/T16t5jdX/bg-4.png'
      bg[4].img.src = 'https://i.postimg.cc/1RGChdBR/bg-5.png'
      bg[5].img.src = 'https://i.postimg.cc/TYQthWBZ/bg-6.png'
      bg[6].img.src = 'https://i.postimg.cc/6qfYr7q4/bg-7.png'
      dino.img.src = 'https://i.postimg.cc/BZNyfc0w/3.png'
      dinoPaused.img.src = 'https://i.postimg.cc/x1NB2PWQ/1.png'

      const timeline = gsap.timeline({ repeat: -1 })
      let imageSpeed = 200 // velocidade das imagens
      const scale = 0.6 // escala da imagem
      const scaledImageWidth = imageWidth * scale // largura da imagem reescalonada
      const totalWidth = bg.length * scaledImageWidth // largura total do cenário

      // Ajuste a posição inicial das imagens de acordo com a nova escala
      bg.forEach((bgImage, index) => {
        if (index === 0) {
          // Posicione a primeira imagem no início do canvas
          bgImage.x = 0
        } else {
          // Posicione as outras imagens de acordo com a largura da imagem reescalada
          bgImage.x = index * scaledImageWidth
        }
      })

      timeline.set(bg, { x: '+=0' }) // Mantém todas as animações de fundo na mesma posição inicial
      bg.forEach((bgImage, index) => {
        const time = totalWidth / imageSpeed // tempo que levará para a imagem passar completamente pelo quadro

        // Adiciona cada animação ao timeline
        timeline.to(
          bgImage,
          {
            x: '-=' + totalWidth,
            duration: time,
            ease: 'none',
            repeat: -1, // faz com que a animação se repita indefinidamente
            onRepeat: function () {
              // reposiciona a imagem no final do cenário uma vez que ela tenha passado completamente pelo quadro
              this.targets()[0].x = (bg.length - 1) * scaledImageWidth
            },
          },
          0,
        ) // Começa todas as animações simultaneamente
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
            // Desenha a imagem com um tamanho escalonado.
            ctx.drawImage(
              bgImage.img,
              bgImage.x,
              0,
              scaledImageWidth,
              ch * scale,
            )
          } else {
            bgImage.img.onload = () => {
              // Desenha a imagem com um tamanho escalonado.
              ctx.drawImage(
                bgImage.img,
                bgImage.x,
                0,
                scaledImageWidth,
                ch * scale,
              )
            }
          }
        })

        if (timeline.paused()) {
          ctx.drawImage(
            dinoPaused.img,
            dinoPaused.spriteOffsetX,
            0,
            74,
            78,
            dino.x,
            dino.top - 39,
            74,
            78,
          )
        } else {
          ctx.drawImage(
            dino.img,
            dino.spriteOffsetX + 1,
            0,
            74,
            78,
            dino.x,
            dino.top - 39,
            74,
            78,
          )
        }
      })

      setTimeout(() => {
        timeline.pause() // Pausar após 15.25s

        setTimeout(() => {
          imageSpeed = 100 // Alterar a velocidade

          timeline.clear() // Limpar as animações existentes

          // Criar novas animações com a nova velocidade
          bg.forEach((bgImage, index) => {
            const time = totalWidth / imageSpeed // Novo tempo
            timeline.to(
              bgImage,
              {
                x: '-=' + totalWidth,
                duration: time,
                ease: 'none',
                repeat: -1,
                onRepeat: function () {
                  this.targets()[0].x = (bg.length - 1) * scaledImageWidth
                },
              },
              0,
            )
          })

          timeline.play() // Dar play

          setTimeout(() => {
            timeline.pause() // Pausar após 1s

            setTimeout(() => {
              imageSpeed = 200 // Voltar para a velocidade original

              timeline.clear() // Limpar as animações existentes

              // Criar novas animações com a velocidade original
              bg.forEach((bgImage, index) => {
                const time = totalWidth / imageSpeed // Tempo com a velocidade original
                timeline.to(
                  bgImage,
                  {
                    x: '-=' + totalWidth,
                    duration: time,
                    ease: 'none',
                    repeat: -1,
                    onRepeat: function () {
                      this.targets()[0].x = (bg.length - 1) * scaledImageWidth
                    },
                  },
                  0,
                )
              })

              // Garantir que o play da animação comece do mesmo ponto onde foi pausada
              const progress = timeline.progress()
              timeline.play()
              timeline.progress(progress)
            }, 1500)
          }, 1700) // animação da frente da tax
        }, 1500)
      }, 15250)

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

  return (
    <div className="relative h-[300px] w-[500px] border-collapse overflow-hidden border-2 border-slate-950">
      <canvas ref={canvasRef} className="gameScene absolute -top-[1.1rem]" />
    </div>
  )
}

export default GameScene
