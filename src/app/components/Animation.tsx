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
      const cw = (canvas.width = 560)
      const ch = (canvas.height = 500)
      const bgImageWidth = 1000
      const bg = [
        { img: new Image(), x: cw / 2 },
        { img: new Image(), x: cw + 1000 },
        { img: new Image(), x: cw + 2000 },
        { img: new Image(), x: cw + 3000 },
        { img: new Image(), x: cw + 4000 },
        { img: new Image(), x: cw + 5000 },
        { img: new Image(), x: cw + 6000 },
        { img: new Image(), x: cw + 7000 },
      ]
      const peCicero = { img: new Image(), x: 0, y: -5 } // Defina a posição y de acordo com a posição onde você quer desenhar o carro
      const dinoCar = {
        img: new Image(),
        x: cw / 5 - 30,
        y: 195,
        visible: false,
      }
      const dino = {
        img: new Image(),
        spriteOffsetX: 0,
        x: cw / 5,
        y: 248,
        visible: true,
        isJumping: false,
      }
      const dinoPaused = {
        img: new Image(),
        spriteOffsetX: 0,
        x: cw / 5,
        y: 250,
      }

      // Links das imagens
      bg[0].img.src = 'https://i.postimg.cc/P5YRpYk6/bg1.png'
      bg[1].img.src = 'https://i.postimg.cc/RV4b2Nry/bg2.png'
      bg[2].img.src = 'https://i.postimg.cc/FzyFz1Gw/bg3.png'
      bg[3].img.src = 'https://i.postimg.cc/4xtPdGTV/bg4.png'
      bg[4].img.src = 'https://i.postimg.cc/CKSGxf7p/bg5.png'
      bg[5].img.src = 'https://i.postimg.cc/m262mchN/bg6.png'
      bg[6].img.src = 'https://i.postimg.cc/593ccMtN/bg7.png'
      bg[7].img.src = 'https://i.postimg.cc/NMZtC37k/bg8.png'
      peCicero.img.src = 'https://i.postimg.cc/9Mxvc76L/cicao.png'
      dino.img.src = 'https://i.postimg.cc/BZNyfc0w/3.png'
      dinoCar.img.src = 'https://i.postimg.cc/gj5hNWcD/dino-no-carro.png'
      dinoPaused.img.src = 'https://i.postimg.cc/x1NB2PWQ/1.png'

      // Função do pulo do dino
      const dinoJump = () => {
        dino.isJumping = true
        gsap
          .to(dino, {
            duration: 0.3,
            y: '-=120',
            x: '+=20',
            ease: 'power2.out',
          })
          .then(() => {
            gsap.to(dino, {
              duration: 0.3,
              y: '+=120',
              x: '-=20',
              ease: 'power2.in',
            })
            setTimeout(() => {
              dino.isJumping = false
            }, 350)
          })
      }

      // Wrapper da animação
      const startAnimation = () => {
        const timeline = gsap.timeline()
        let imageSpeed = 200 // velocidade das imagens
        const scale = 0.6 // escala da imagem do fundo
        const scaledImageWidth = bgImageWidth * scale // largura da imagem reescalonada
        const totalWidth = bg.length * scaledImageWidth // largura total do cenário
        // Define a velocidade da imagem de teste
        const peCiceroSpeed = 8 // Ajuste esse valor para a velocidade desejada
        const timePeCicero = cw / peCiceroSpeed // Calcula o tempo necessário para a imagem de teste passar completamente pelo quadro
        // Define a velocidade da imagem de teste
        const dinoCarSpeed = 800 // Ajuste esse valor para a velocidade desejada
        const timeDinoCar = totalWidth / dinoCarSpeed // Calcula o tempo necessário para a imagem de teste passar completamente pelo quadro

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
          },
          0,
        ) // Começa a animação da imagem de teste simultaneamente com as imagens de fundo

        // Adiciona a animação da imagem do dinoCar ao timeline
        timeline.to(
          dinoCar,
          {
            x: '+=500', // Isso move dinoCar 500 unidades à direita da sua posição atual
            duration: timeDinoCar,
            // delay: 0.2,
            ease: 'none',
          },
          20,
        )

        // Crie uma função de animação personalizada
        const animateDino = () => {
          gsap.to(dino, {
            duration: 0.25,
            spriteOffsetX: 150,
            ease: 'steps(2)',
            repeat: -1,
          })
        }
        // Adicione a animação do dino ao timeline
        timeline.add(animateDino, 0)

        // função do gsap que é acionada a cada quadro do canvas desenhando os elementos em tela
        gsap.ticker.add(() => {
          ctx.clearRect(0, 0, cw, ch)

          // Desenha o Padre cícero
          if (peCicero.img.complete) {
            // Desenha a imagem com um tamanho escalonado.
            ctx.drawImage(
              peCicero.img,
              peCicero.x,
              peCicero.y,
              scaledImageWidth, // Largura da imagem do teste
              ch * scale, // Altura da imagem do teste
            )
          } else {
            peCicero.img.onload = () => {
              // Desenha a imagem com um tamanho escalonado.
              ctx.drawImage(
                peCicero.img,
                peCicero.x,
                peCicero.y,
                scaledImageWidth, // Largura da imagem do teste
                ch * scale, // Altura da imagem do teste
              )
            }
          }

          // Seta as imagens do fundo na tela
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

          // Seta o dino na tela
          if (timeline.paused() || dino.isJumping) {
            if (dinoPaused.img.complete) {
              ctx.drawImage(
                dinoPaused.img,
                dinoPaused.spriteOffsetX,
                0,
                78,
                78,
                dino.x - 4,
                dino.y - 39,
                78,
                78,
              )
            } else {
              dinoPaused.img.onload = () => {
                ctx.drawImage(
                  dinoPaused.img,
                  dinoPaused.spriteOffsetX,
                  0,
                  78,
                  78,
                  dino.x - 4,
                  dino.y - 39,
                  78,
                  78,
                )
              }
            }
          } else {
            if (
              (timeline.paused() && dino.visible) ||
              (!timeline.paused() && dino.visible)
            ) {
              if (dino.img.complete) {
                ctx.drawImage(
                  dino.img,
                  dino.spriteOffsetX + 1,
                  0,
                  74,
                  78,
                  dino.x,
                  dino.y - 39,
                  74,
                  78,
                )
              } else {
                dino.img.onload = () => {
                  ctx.drawImage(
                    dino.img,
                    dino.spriteOffsetX + 1,
                    0,
                    74,
                    78,
                    dino.x,
                    dino.y - 39,
                    74,
                    78,
                  )
                }
              }
            }
          }

          // Desenha o dino no carro por trás do cenário
          if (dinoCar.visible) {
            if (dinoCar.img.complete) {
              ctx.drawImage(
                dinoCar.img,
                bg[5].img.x,
                0,
                170,
                95,
                dinoCar.x,
                dinoCar.y,
                170,
                95,
              )
            } else {
              dinoCar.img.onload = () => {
                ctx.drawImage(
                  dinoCar.img,
                  bg[5].img.x,
                  0,
                  170,
                  95,
                  dinoCar.x,
                  dinoCar.y,
                  170,
                  95,
                )
              }
            }
          }
        })

        // Pulos
        setTimeout(() => {
          dinoJump()
          setTimeout(() => {
            dinoJump()
            setTimeout(() => {
              dinoJump()
              setTimeout(() => {
                dinoJump()
              }, 2950) // quarto pulo
            }, 2900) // terceiro pulo
          }, 3150) // segundo pulo
        }, 3600) // primeiro pulo

        // Controle da timeline
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

              dinoCar.visible = true
              console.log(
                dinoCar.visible,
                'Isso após tornar true no timeout e:',
                dinoCar.x,
                'posição atual',
              )
              dino.visible = false // Torna o dino invisível

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
              }, 1800) // timeout do play novamente
            }, 1700) // timeout do pause em frente à tax
          }, 1500) // timeout de alterar a velocidade
        }, 15250) // primeiro pause

        // Reiniciar a timeline após 24 segundos
        setTimeout(() => {
          // Limpar o contexto do canvas antes de reiniciar a animação
          ctx.clearRect(0, 0, cw, ch)

          // Reiniciar as configurações das imagens
          bg.forEach((bgImage, index) => {
            if (index === 0) {
              bgImage.x = 0
            } else {
              bgImage.x = index * scaledImageWidth
            }
          })

          // Reiniciar as configurações do dino
          dino.spriteOffsetX = 0
          dino.y = 248
          dino.visible = true

          // Reiniciar as configurações do dinoPaused
          dinoPaused.spriteOffsetX = 0
          dinoPaused.y = 250

          // Reiniciar as configurações do dinoCar
          dinoCar.x = cw / 5 - 30
          dinoCar.y = 195
          dinoCar.visible = false

          // Reiniciar as configurações do peCicero
          peCicero.x = 0
          peCicero.y = -5

          // Limpar a timeline e iniciar a animação novamente
          timeline.clear()
          startAnimation()
        }, 25000)

        // Controlar a animação com a tecla de espaço
        window.addEventListener('keydown', (event) => {
          console.log(event.code, 'is pressed')
          if (event.code === 'Space') {
            dinoJump()
          }
        })
      }
      startAnimation()
    }
  }, [])

  return (
    <div className="relative h-[300px] w-[560px] border-collapse overflow-hidden border-2 border-slate-950">
      <canvas ref={canvasRef} className="gameScene absolute -top-[1.1rem]" />
    </div>
  )
}

export default GameScene
