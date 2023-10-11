'use client'
import React, { useEffect, useRef, useState } from 'react'
import { PixiPlugin } from 'gsap/PixiPlugin'
import gsap from 'gsap'
import { GameSceneProps, AnimationTrigger } from '@/types'

gsap.registerPlugin(PixiPlugin)

function GameScene({ className, chProp, cwProp, scaleProp, speedProp, ...props }: GameSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // Array para armazenar os IDs dos timeouts
  const timeoutIds: any = []

  // Monta e permanece em loop
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!
      const cw = (canvas.width = cwProp)
      const ch = (canvas.height = chProp)
      const peCicero = { img: new Image(), x: 0, y: -5 } // Defina a posição y de acordo com a posição onde você quer desenhar o carro
      const dino = {
        img: new Image(),
        spriteOffsetX: 0,
        x: props.dino.X,
        y: -props.dino.Y,
        visible: true,
        isJumping: false,
      }
      const dinoCar = {
        img: new Image(),
        x: props.dinoCar.X - 10,
        y: props.dinoCar.Y,
        visible: false,
      }
      const dinoPaused = {
        img: new Image(),
        spriteOffsetX: 0,
        x: props.dinoPaused.X,
        y: props.dinoPaused.Y,
      }
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

      // Links das imagens
      bg[0].img.src = 'https://i.postimg.cc/P5YRpYk6/bg1.png'
      bg[1].img.src = 'https://i.postimg.cc/RV4b2Nry/bg2.png'
      bg[2].img.src = 'https://i.postimg.cc/FzyFz1Gw/bg3.png'
      bg[3].img.src = 'https://i.postimg.cc/4xtPdGTV/bg4.png'
      bg[4].img.src = 'https://i.postimg.cc/CKSGxf7p/bg5.png'
      bg[5].img.src = 'https://i.postimg.cc/m262mchN/bg6.png'
      bg[6].img.src = 'https://i.postimg.cc/yxf51GVV/bg7.png'
      bg[7].img.src = 'https://i.postimg.cc/NMZtC37k/bg8.png'
      peCicero.img.src = 'https://i.postimg.cc/9Mxvc76L/cicao.png'
      dino.img.src = 'https://i.postimg.cc/BZNyfc0w/3.png'
      dinoCar.img.src = 'https://i.postimg.cc/VkP9SRd1/Dino-no-carro.png'
      dinoPaused.img.src = 'https://i.postimg.cc/x1NB2PWQ/1.png'

      // Wrapper da animação
      const startAnimation = (speed = speedProp, scale = scaleProp) => {
        const scaledImageWidth = 1000 * scale // largura da imagem reescalonada
        const scaledImageHeight = ch * scale
        const totalWidth = bg.length * scaledImageWidth // largura total do cenário
        const timeline = gsap.timeline({ delay: 1.5 })
        const bgSpeed = speed // velocidade das imagens
        // maior = mais rapido menor = mais lento
        const jumpTrigger = 600
        const dinoTrigger: AnimationTrigger = {
          points: [
            { bgIndex: 2, trigger: jumpTrigger },
            { bgIndex: 3, trigger: jumpTrigger },
            { bgIndex: 4, trigger: jumpTrigger },
            { bgIndex: 5, trigger: jumpTrigger },
          ],
          action: () => { },
        }
        const taxTrigger: AnimationTrigger = {
          points: [
            { bgIndex: 6, trigger: 722 }
          ],
          action: () => { },
        }

        setupDinoAnimation(timeline, dino, dinoCar, dinoTrigger)
        setupBackgroundAnimations(
          timeline,
          bg,
          bgSpeed,
          scaledImageWidth,
          totalWidth,
          [dinoTrigger, taxTrigger]
        )
        setupPeCiceroAnimation(timeline, peCicero, cw)
        setupTimelineControl(timeline, bg, bgSpeed, totalWidth, dino, dinoCar, taxTrigger)
        reset({ dino, dinoCar, peCicero, dinoPaused }, timeline, bg, ctx, cw, ch, scaledImageWidth, props.timeToReset)

        // setupResetAndRestart(
        //   timeline,
        //   bg,
        //   ctx,
        //   scaledImageWidth,
        //   cw,
        //   ch,
        //   { dino, dinoCar, peCicero, dinoPaused },
        //   startAnimation,
        //   props.timeToReset
        // )

        // função do gsap que é acionada a cada quadro do canvas desenhando os elementos em tela
        gsap.ticker.add(() => {
          drawCanvas(timeline, scaledImageWidth, scaledImageHeight)
        })

        // Após a conclusão das animações existentes, chame a função resetAnimation
        timeline.call(() => {
          resetAnimation(
            { dino, dinoCar, peCicero, dinoPaused },
            timeline,
            bg,
            ctx,
            cw,
            ch,
            scaledImageWidth
          )
        });
      }

      const drawCanvas = (
        timeline: gsap.core.Timeline,
        scaledImageWidth: number,
        scaledImageHeight: number,
      ) => {
        ctx.clearRect(0, 0, cw, ch)

        // Desenha o Padre cícero
        drawObjectToCanvas(
          ctx,
          peCicero,
          undefined,
          undefined,
          scaledImageWidth * 1.2,
          scaledImageHeight,
          false
        )

        // Seta as imagens do fundo na tela
        bg.forEach((bgImage) => {
          drawObjectToCanvas(
            ctx,
            bgImage,
            undefined,
            0,
            scaledImageWidth,
            scaledImageHeight,
            false
          )
        })

        // Seta o dino na tela
        if (
          (timeline.paused() || dino.isJumping) &&
          !dinoCar.visible &&
          dino.visible
        ) {
          drawDinoOnCanvas(
            ctx,
            dinoPaused,
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
          if (
            (timeline.paused() && dino.visible) ||
            (!timeline.paused() && dino.visible)
          ) {
            drawDinoOnCanvas(
              ctx,
              dino,
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

        // Desenha o dino no carro por trás do cenário
        if (dinoCar.visible) {
          drawDinoOnCanvas(
            ctx,
            dinoCar,
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

        // const step = 100; // a cada 100 pixels
        // for (let x = 0; x <= canvas.width; x += step) {
        //   ctx.beginPath();
        //   ctx.moveTo(x, 0);
        //   ctx.lineTo(x, canvas.height);
        //   ctx.stroke();
        //   ctx.strokeStyle = 'black'
        // }
        // for (let y = 0; y <= canvas.height; y += step) {
        //   ctx.beginPath();
        //   ctx.moveTo(0, y);
        //   ctx.lineTo(canvas.width, y);
        //   ctx.stroke();
        // }
      }
      startAnimation()
    }

  }, [])


  function setupBackgroundAnimations(
    timeline: gsap.core.Timeline,
    bg: {
      img: HTMLImageElement
      x: number
    }[],
    imageSpeed: number,
    scaledImageWidth: number,
    totalWidth: number,
    triggerList: AnimationTrigger[]
  ) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bg.forEach((bgImage, index) => {
      const time = totalWidth / imageSpeed // tempo que levará para a imagem passar completamente pelo quadro

      // Adiciona cada animação ao timeline
      timeline.to(
        bgImage,
        {
          x: '-=' + totalWidth,
          duration: time,
          ease: 'none',
          onUpdate: () => {
            // const isCloseToTrigger = dinoTrigger.points.some(point => {
            //   return index === point.bgIndex && Math.abs(point.trigger - bgImage.x) < 2.2;
            // });
            // if (isCloseToTrigger) {
            //   dinoTrigger.action();
            // }
            triggerList.forEach(trigger => {
              const isCloseToTrigger = trigger.points.some(point => {
                return index === point.bgIndex && Math.abs(point.trigger - bgImage.x) <= 2.2;
              });

              if (isCloseToTrigger) {
                if (trigger === triggerList[1]) {
                  trigger.action()
                  createTimeout(trigger.plusAction, 1500)
                }
                trigger.action();
              }
            });
          },
        },
        0,
      ) // Começa todas as animações simultaneamente
    })
  }

  function setupPeCiceroAnimation(
    timeline: gsap.core.Timeline,
    peCicero: any,
    cw: number,
    peCiceroSpeed = 20,
  ) {
    // Define a velocidade da imagem do Pe cicero
    const timePeCicero = cw / peCiceroSpeed // Calcula o tempo necessário para a imagem de teste passar completamente pelo quadro

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
  }

  function setupDinoAnimation(timeline: any, dino: any, dinoCar: any, dinoTrigger: AnimationTrigger) {
    // Crie uma função de animação personalizada
    const animateDino = () => {
      gsap.to(dino, {
        duration: 0.25,
        spriteOffsetX: 150.5,
        ease: 'steps(2)',
        repeat: -1,
      })
    }

    // Função do pulo do dino
    function dinoJump() {
      dino.isJumping = true
      if (dino.visible) {
        gsap
          .to(dino, {
            duration: 0.3,
            x: '+=40',
            y: '-=120',
            ease: 'power2.out',
          })
          .then(() => {
            gsap.to(dino, {
              duration: 0.3,
              y: props.dino.Y,
              x: '-=20',
              ease: 'power2.in',
              onComplete: () => {
                gsap.to(dino, {
                  x: '-=20',
                  duration: 0.3,
                })
                dino.isJumping = false
              }
            })
            // createTimeout(() => {
            // }, 350)
          })
      }
    }

    const dinoFall = () => {
      gsap.to(dino,
        {
          y: props.dino.Y,
          duration: 1.1,
          ease: 'bounce',
        }
      )
    }

    const setDinoTriggerPoints = (triggers: typeof dinoTrigger.points = [{ bgIndex: 5, trigger: 120 }]) => {
      dinoTrigger.points = !dinoTrigger.points ? triggers : dinoTrigger.points
      dinoTrigger.action = dinoJump
    }

    // Adicione a animação do dino ao timeline
    timeline.add(dinoFall, -.5)
    timeline.add(animateDino, 0)
    timeline.add(setDinoTriggerPoints, 0)
    // timeline.add(jumps, 0)
  }

  function setupTimelineControl(
    timeline: gsap.core.Timeline,
    bg: object[],
    bgSpeed: number,
    totalWidth: number,
    dino: any,
    dinoCar: any,
    taxTrigger: AnimationTrigger
  ) {
    const pauseTimeline = () => {
      timeline.pause()
    }

    const changeSpeedAndAnimations = () => {
      bgSpeed = 100
      timeline.clear()

      bg.forEach((bgImage, index) => {
        const time = totalWidth / bgSpeed
        timeline.to(
          bgImage,
          {
            x: '-=' + totalWidth,
            duration: time,
            ease: 'none',
          },
          0,
        )
      })

      timeline.play()

      createTimeout(() => {
        dino.visible = false
        pauseTimeline()

        createTimeout(() => {
          dinoCar.visible = true
        }, 1500)

        createTimeout(() => {
          bgSpeed = 200
          timeline.clear()

          bg.forEach((bgImage, index) => {
            const time = totalWidth / bgSpeed
            timeline.to(
              bgImage,
              {
                x: '-=' + totalWidth,
                duration: time,
                ease: 'none',
              },
              0,
            )
          })

          const progress = timeline.progress()
          timeline.play()
          timeline.progress(progress)
        }, 2500)
      }, 1700)
    }

    const startTimeline = () => {
      // createTimeout(pauseTimeline, 15250)
      // createTimeout(changeSpeedAndAnimations, 16750)
      taxTrigger.action = pauseTimeline
      taxTrigger.plusAction = changeSpeedAndAnimations
    }

    timeline.add(startTimeline, 0)
  }

  function drawObjectToCanvas(
    ctx: CanvasRenderingContext2D,
    objImg: any,
    x: number | undefined,
    y: number | undefined,
    width: number,
    height: number,
    drawBord?: boolean
  ) {
    const drawBorder = (x: number, y: number, width: number, height: number) => {
      const borderWidth = 5; // ajuste conforme necessário
      const borderColor = 'red'; // ajuste conforme necessário

      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(x, y, width, height);
    };

    // Desenha o Padre cícero
    if (objImg.img.complete) {
      // Desenha a imagem com um tamanho escalonado.
      ctx.drawImage(
        objImg.img,
        x ?? objImg.x,
        y ?? objImg.y,
        width,
        height,
      );
      if (drawBord) {
        drawBorder(
          x ?? objImg.x,
          y ?? objImg.y,
          width,
          height
        );
      }
    } else {
      objImg.img.onload = () => {
        // Desenha a imagem com um tamanho escalonado.
        ctx.drawImage(
          objImg.img,
          x ?? objImg.x,
          y ?? objImg.y,
          width,
          height,
        );
        if (drawBord) {

          drawBorder(
            x ?? objImg.x,
            y ?? objImg.y,
            width,
            height
          );
        }
      }
    }
  }

  function drawDinoOnCanvas(
    ctx: CanvasRenderingContext2D,
    objImg: any,
    x: number,
    y: number,
    width: number,
    height: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) {
    // Desenha o Padre cícero
    if (objImg.img.complete) {
      // Desenha a imagem com um tamanho escalonado.
      ctx.drawImage(
        objImg.img,
        x,
        y,
        width, // Largura da imagem do teste
        height, // Altura da imagem do teste
        dx,
        dy,
        dw,
        dh,
      )
    } else {
      objImg.img.onload = () => {
        // Desenha a imagem com um tamanho escalonado.
        ctx.drawImage(
          objImg.img,
          objImg.x,
          objImg.y,
          width, // Largura da imagem do teste
          height, // Altura da imagem do teste
        )
      }
    }
  }

  function setupResetAndRestart(
    timeline: any,
    bg: {
      img: HTMLImageElement
      x: number
    }[],
    ctx: any,
    scaledImageWidth: any,
    cw: number,
    ch: number,
    objects: any,
    startAnimation: () => void,
    timetoReset: number
  ) {
    const clearAllTimeoutsAndReset = (timeline: any) => {
      timeline.pause()
      timeline.clear()

      timeoutIds.forEach((timeoutId: any) => {
        clearTimeout(timeoutId)
      })

      timeoutIds.splice(0, timeoutIds.length)
    }

    const restart = () => {
      // Reiniciar a timeline após 24 segundos
      createTimeout(() => {
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
        objects.dino.spriteOffsetX = 0
        objects.dino.x = props.dino.X
        objects.dino.y = -props.dino.Y
        objects.dino.visible = true
        objects.dino.isJumping = false

        // Reiniciar as configurações do dinoPaused
        objects.dinoPaused.spriteOffsetX = 0
        objects.dinoPaused.y = props.dinoPaused.Y

        // Reiniciar as configurações do dinoCar
        objects.dinoCar.x = props.dinoCar.X - 30
        objects.dinoCar.y = props.dinoCar.Y
        objects.dinoCar.visible = false

        // Reiniciar as configurações do peCicero
        objects.peCicero.x = 0
        objects.peCicero.y = -5

        // Limpar a timeline e iniciar a animação novamente
        clearAllTimeoutsAndReset(timeline)

        // Iniciar a animação novamente
        // startAnimation()
        timeline.restart()
      }, timetoReset * 1000)
    }

    restart()
  }

  function reset(objects: any, timeline: any, bg: any, ctx: any, cw: any, ch: any, scaledImageWidth: any, timeToReset: any) {
    createTimeout(() => {
      // Após a conclusão das animações existentes, chame a função resetAnimation
      timeline.call(() => {
        resetAnimation(
          objects,
          timeline,
          bg,
          ctx,
          cw,
          ch,
          scaledImageWidth
        )
      });
    }, timeToReset * 1000)
  }

  function resetAnimation(
    objects: any,
    timeline: gsap.core.Timeline,
    bg: {
      img: HTMLImageElement
      x: number
    }[],
    ctx: any,
    scaledImageWidth: any,
    cw: number,
    ch: number,
  ) {

    const clearAllTimeoutsAndReset = (timeline: any) => {
      timeline.pause()
      timeline.clear()

      timeoutIds.forEach((timeoutId: any) => {
        clearTimeout(timeoutId)
      })

      timeoutIds.splice(0, timeoutIds.length)
    }

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
    objects.dino.spriteOffsetX = 0
    objects.dino.x = props.dino.X
    objects.dino.y = -props.dino.Y
    objects.dino.visible = true
    objects.dino.isJumping = false

    // Reiniciar as configurações do dinoPaused
    objects.dinoPaused.spriteOffsetX = 0
    objects.dinoPaused.y = props.dinoPaused.Y

    // Reiniciar as configurações do dinoCar
    objects.dinoCar.x = props.dinoCar.X - 30
    objects.dinoCar.y = props.dinoCar.Y
    objects.dinoCar.visible = false

    // Reiniciar as configurações do peCicero
    objects.peCicero.x = 0
    objects.peCicero.y = -5

    // Limpar a timeline e iniciar a animação novamente
    clearAllTimeoutsAndReset(timeline)

    // Iniciar a animação novamente
    // Reinicie a timeline
    timeline.restart();

    // Configure o loop infinito
    timeline.repeat(-1); // -1 indica um loop infinito
  }


  // Função para criar timeouts e armazenar seus IDs
  function createTimeout(callback: any, delay: number) {
    const timeoutId = setTimeout(callback, delay)
    timeoutIds.push(timeoutId)
  }

  return (
    <div className={`${className} h-${chProp}`}>
      <canvas
        width={cwProp}
        height={chProp}
        ref={canvasRef}
      />
    </div>
  )
}

export default GameScene