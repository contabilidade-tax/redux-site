'use client'
import { cn } from '@/lib/utils'
import './style.scss'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  classname: string
}

export default function GameSceneCss({ classname }: Props) {
  const bgRef = useRef<HTMLDivElement>(null)
  const dinoRef = useRef<HTMLImageElement>(null)
  const dinoCarRef = useRef<HTMLImageElement>(null)
  const peCiceroref = useRef<HTMLImageElement>(null)
  // 
  const peCicero = 'https://i.postimg.cc/HszLD2cH/Fundo-Pixel-PE-CICERO.png'
  const dino = 'https://i.postimg.cc/MTxS2GDC/dino-Patins.png'
  const dinoCar = 'https://i.postimg.cc/3wJQ4kP3/dino-Treno.png'
  const bgImages = [
    'https://i.postimg.cc/zvWy76Mj/Fundo-Pixel-Natal-01-SEMNOEL.png',
    'https://i.postimg.cc/L4ZgmgX1/Fundo-Pixel-Natal-02-SEMNOEL.png',
    // 'https://i.postimg.cc/rsLpcZNy/Fundo-Pixel-Natal-01.png',
    // 'https://i.postimg.cc/Ss9KBb8t/Fundo-Pixel-Natal-02.png',
    'https://i.postimg.cc/Lsn5V1sS/Fundo-Pixel-Natal-03.png',
    'https://i.postimg.cc/cJ2HkLKn/Fundo-Pixel-Natal-04.png',
    'https://i.postimg.cc/Y0fCSNd6/Fundo-Pixel-Natal-05.png',
    'https://i.postimg.cc/BZx6NsJj/Fundo-Pixel-Natal-06.png',
    'https://i.postimg.cc/x1sqHRng/Fundo-Pixel-Natal-07.png',
    'https://i.postimg.cc/NMZtC37k/bg8.png'
  ]


  useEffect(() => {
    if (bgRef.current && peCiceroref.current) {
      const totalWidth = bgRef.current.children[0].clientWidth * 5 - 50;
      const timeoutIds: any = []

      const jump = () => {
        gsap.to(dinoRef.current, {
          duration: 0.3,
          y: '-=120',
          x: '+=20',
          ease: 'power2.out',
          onComplete: (() => {
            gsap.to(dinoRef.current, {
              duration: 0.3,
              y: 280,
              x: '-=20',
              ease: 'power2.in',
            })
          })
        })
      }

      const createTimeout = (callback: any, delay: number) => {
        const timeoutId = setTimeout(callback, delay)
        timeoutIds.push(timeoutId)
      }

      const clearAllTimeoutsAndReset = () => {
        timeoutIds.forEach((timeoutId: any) => {
          clearTimeout(timeoutId)
        })

        timeoutIds.splice(0, timeoutIds.length)
      }

      const jumps = () => {
        // Pulos
        createTimeout(() => {
          jump()
          createTimeout(() => {
            jump()
            createTimeout(() => {
              jump()
              createTimeout(() => {
                jump()
              }, 2750) // quarto pulo
            }, 2550) // terceiro pulo
          }, 3050) // segundo pulo
        }, 3900) // primeiro pulo
      }

      // COMEÇO ANIMAÇÃO
      // Animação GSAP
      const tl = gsap.timeline({
        defaults: {
          ease: 'none', // Tipo de easing, 'none' para uma animação linear
        },
        repeat: -1, // Repetir a animação infinitamente
        onComplete: () => {
          gsap.set(bgRef.current, { x: 0 }); // Retorna à posição inicial imediatamente
          gsap.set(dinoRef.current, { opacity: 1, }); // Retorna à posição inicial imediatamente
          // Retorna à posição inicial imediatamente
          clearAllTimeoutsAndReset()
        },
      });

      // Dino FALL
      tl.fromTo(dinoRef.current,
        {
          y: -250
        },
        {
          y: 280,
          opacity: 1,
          duration: 1.1,
          ease: 'bounce',
        })

      // Adiciona a animação do peCicero diretamente na timeline
      tl.to(peCiceroref.current, {
        x: -1000,
        duration: 5,
        // duration: 60,
      }, 1.5);

      // Adiciona a primeira animação do fundo diretamente na timeline
      tl.to(bgRef.current, {
        x: -totalWidth,
        duration: 13.5,
        // duration: 26.5,
      }, 1.5);

      // Adiciona a segunda animação do fundo após a primeira ter terminado
      tl.to(bgRef.current, {
        x: '-=180',
        duration: 2.2,
        delay: 1.5,
        onComplete: () => {
          gsap.to(dinoRef.current, { opacity: 0 })
          gsap.to(dinoCarRef.current, {
            opacity: 1, ease: 'none', delay: 1
          })
        }
      }); // Isso irá adicionar a animação após 5 segundos da última animação terminar

      // RUN FINAL
      tl.to(bgRef.current, {
        x: '-=700',
        duration: 2,
        delay: 1.5,
        onComplete: () => {
          gsap.set(dinoCarRef.current, { opacity: 0, ease: 'none' });
          gsap.set(dinoRef.current, { opacity: 1, });
        }
      })

      tl.add(jumps, 0.4)
    }


  }, [bgRef, peCiceroref]);

  return (
    <div className={cn('girosflin relative', classname)}>
      <img src={peCicero} ref={peCiceroref} alt="peCicero" className='w-max h-full absolute top-0 left-1 z-10' />
      <section ref={bgRef} className='bgRef absolute w-full h-full flex z-30'>
        {bgImages.map((image, index) => {
          return (
            <img src={image} className="bg" key={index} alt="bg" />
          )
        })
        }
        {/* dino */}
      </section>
      <img src={dino} ref={dinoRef} className="dino absolute left-[15%] z-50 opacity-0" width={90} height={95} alt="dino" />
      {/* <img src={dino} ref={dinoRef} className="dino absolute bottom-4 left-[15%] z-50" width={90} height={95} alt="dino" /> */}
      <img src={dinoCar} ref={dinoCarRef} className="dino absolute bottom-4 left-[15%] z-50 opacity-0" width={270} height={95} alt="dino" />
    </div>
  )
}