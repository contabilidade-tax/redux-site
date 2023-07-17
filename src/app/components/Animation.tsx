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
      const car = { img: new Image(), x: cw + 480, y: 220, jumped: false } // Defina a posição y de acordo com a posição onde você quer desenhar o carro
      const dinoCar = {
        img: new Image(),
        x: cw + 480,
        y: 220,
        isVisible: false,
      } // Defina a posição y de acordo com a posição onde você quer desenhar o carro
      const peCicero = { img: new Image(), x: cw - 150, y: 20 } // Defina a posição y de acordo com a posição onde você quer desenhar o carro
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
      car.img.src = 'https://i.postimg.cc/25LVxQdv/carro.png' // substitua pelo URL da imagem do carro
      dinoCar.img.src = 'https://i.postimg.cc/gj5hNWcD/dino-no-carro.png' // substitua pelo URL da imagem do carro
      peCicero.img.src = 'https://i.postimg.cc/t4903Xzd/coisa.png' // substitua pelo URL da imagem do carro
      dino.img.src = 'https://i.postimg.cc/BZNyfc0w/3.png'
      dinoPaused.img.src = 'https://i.postimg.cc/x1NB2PWQ/1.png'

      const timeline = gsap.timeline({ repeat: -1 })
      let imageSpeed = 200 // velocidade das imagens
      const scale = 0.6 // escala da imagem do fundo
      const scaledImageWidth = imageWidth * scale // largura da imagem reescalonada
      const totalWidth = bg.length * scaledImageWidth // largura total do cenário
      // Define a velocidade da imagem de teste
      const peCiceroSpeed = 5 // Ajuste esse valor para a velocidade desejada
      const timePeCicero = cw / peCiceroSpeed // Calcula o tempo necessário para a imagem de teste passar completamente pelo quadro
      // Define a velocidade da imagem de teste
      const dinoCarSpeed = 150 // Ajuste esse valor para a velocidade desejada
      const timeDinoCar = cw / dinoCarSpeed // Calcula o tempo necessário para a imagem de teste passar completamente pelo quadro

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

      // Adiciona a animação da imagem do padre cícero ao timeline
      timeline.to(
        peCicero,
        {
          x: '-=' + cw,
          duration: timePeCicero,
          ease: 'none',
          // repeat: -1, // faz com que a animação se repita indefinidamente
          // onRepeat: function () {
          //   // reposiciona a imagem de teste no início do quadro uma vez que ela tenha passado completamente pelo quadro
          //   this.targets()[0].x = cw
          // },
        },
        0,
      ) // Começa a animação da imagem de teste simultaneamente com as imagens de fundo

      // Adiciona a animação da imagem do dinoCar ao timeline
      if (dinoCar.isVisible) {
        timeline.to(
          dinoCar,
          {
            x: cw,
            duration: timeDinoCar,
            delay: 0.5,
            ease: 'none',
          },
          0,
        )
        // uma vez que a animação foi iniciada, marque o dino no carro como não visível para evitar que a animação seja iniciada novamente
        dinoCar.isVisible = false
      }

      gsap.to(dino, {
        duration: 0.25,
        spriteOffsetX: 150,
        ease: 'steps(2)',
        repeat: -1,
      })

      gsap.ticker.add(() => {
        ctx.clearRect(0, 0, cw, ch)

        // Adicione uma verificação para saber se o dino e o carro estão alinhados no eixo x e o dino ainda não pulou
        if (Math.abs(dino.x - bg[6].x) < 10 && !car.jumped) {
          car.jumped = true // Marque que o dino pulou
          gsap.to(dino, {
            y: '-=100', // Faça o dino pular 100 pixels
            duration: 0.2, // A duração do pulo
            ease: 'power2.out', // Use uma função de suavização para que o pulo pareça mais natural
            onComplete: function () {
              // Quando a animação do pulo terminar
              // Faça o dino cair
              gsap.to(dino, {
                y: '+=100', // Faça o dino cair 100 pixels
                duration: 0.2, // A duração da queda
                ease: 'power2.in', // Use uma função de suavização para que a queda pareça mais natural
                onComplete: function () {
                  // Quando a animação da queda terminar
                  // Troque a sprite do dino para a sprite do dino no carro
                  dino.img = dinoCar.img
                },
              })
            },
          })
        }

        // Primeiro, desenhe a imagem "Padre cícero".
        ctx.drawImage(
          peCicero.img,
          peCicero.x,
          peCicero.y,
          120, // Largura da imagem do teste
          120, // Altura da imagem do teste
        )

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

        if (Math.abs(bg[6].x - dino.x) < 5) {
          dinoCar.isVisible = true
          // 50 é a tolerância em pixels para o alinhamento. Ajuste conforme necessário.
          const carScale = 0.8
          const carScaledWidth = car.img.width * carScale
          const carScaledHeight = car.img.height * carScale
          // Desenha o dino no carro
          ctx.drawImage(
            dinoCar.img,
            dinoCar.x,
            dinoCar.y,
            carScaledWidth, // Largura da imagem do dinoCar
            carScaledHeight, // Altura da imagem do dinoCar
          )
        } else {
          if (timeline.paused()) {
            ctx.drawImage(
              dinoPaused.img,
              dinoPaused.spriteOffsetX,
              0,
              78,
              78,
              dino.x - 4,
              dino.top - 39,
              78,
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

          if (bg[6].x <= cw) {
            // Quando o fundo 6 estiver sendo mostrado
            const carScale = 0.8
            const carScaledWidth = car.img.width * carScale
            const carScaledHeight = car.img.height * carScale
            ctx.drawImage(
              car.img,
              bg[6].x, // A posição x do carro é ajustada com base na posição x do fundo 6
              car.y,
              carScaledWidth, // Largura da imagem do carro
              carScaledHeight, // Altura da imagem do carro
            )
          }
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
