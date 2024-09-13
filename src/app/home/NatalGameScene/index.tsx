"use client";
import { cn } from "@/lib/utils";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type Props = {
  classname: string;
};

export default function NatalGameScene({ classname }: Props) {
  const [dinoX, setDinoX] = useState<number | undefined>(0);
  const bgRef = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLImageElement>(null);
  const dinoCarRef = useRef<HTMLImageElement>(null);
  const peCiceroref = useRef<HTMLImageElement>(null);
  //
  const peCicero = "https://i.postimg.cc/HszLD2cH/Fundo-Pixel-PE-CICERO.png";
  const dino = "https://i.postimg.cc/MTxS2GDC/dino-Patins.png";
  const dinoCar = "https://i.postimg.cc/3wJQ4kP3/dino-Treno.png";
  const bgImages = [
    "https://i.postimg.cc/zvWy76Mj/Fundo-Pixel-Natal-01-SEMNOEL.png",
    "https://i.postimg.cc/50y0ym1F/Fundo-Pixel-Natal-02.png",
    "https://i.postimg.cc/Lsn5V1sS/Fundo-Pixel-Natal-03.png",
    "https://i.postimg.cc/B6zvK1Q7/Fundo-Pixel-Natal-04.png",
    "https://i.postimg.cc/Y0fCSNd6/Fundo-Pixel-Natal-05.png",
    "https://i.postimg.cc/ncgLzmwX/Fundo-Pixel-Natal-06.png",
    "https://i.postimg.cc/x1sqHRng/Fundo-Pixel-Natal-07.png",
    "https://i.postimg.cc/NMZtC37k/bg8.png",
  ];
  useEffect(() => {
    if (bgRef.current && peCiceroref.current) {
      // const totalWidth = bgRef.current.children[0].clientWidth * 5 - 50;
      // const totalWidth = 3430;
      // const timeoutIds: any = []
      const triggers = document.getElementsByClassName("triggerJump");
      //
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      setDinoX(dinoRef.current?.x);
      //

      const jump = () => {
        gsap.to(dinoRef.current, {
          duration: 0.3,
          y: "-=120",
          x: "+=20",
          ease: "power2.out",
          onComplete: () => {
            gsap.to(dinoRef.current, {
              duration: 0.3,
              // BUG LEGAL
              // yPercent: -10,
              // y: 7,
              y: 0,
              x: "-=20",
              ease: "power2.in",
            });
          },
        });
      };

      // const createTimeout = (callback: any, delay: number) => {
      //   const timeoutId = setTimeout(callback, delay)
      //   timeoutIds.push(timeoutId)
      // }

      // const clearAllTimeoutsAndReset = () => {
      //   timeoutIds.forEach((timeoutId: any) => {
      //     clearTimeout(timeoutId)
      //   })

      //   timeoutIds.splice(0, timeoutIds.length)
      // }

      // COMEÇO ANIMAÇÃO
      // Animação GSAP
      const tl = gsap.timeline({
        defaults: {
          ease: "none", // Tipo de easing, 'none' para uma animação linear
        },
        repeat: -1, // Repetir a animação infinitamente
        onComplete: () => {
          gsap.set(bgRef.current, { x: 0 }); // Retorna à posição inicial imediatamente
          gsap.set(peCiceroref.current, { x: 0 }); // Retorna à posição inicial imediatamente
          gsap.set(dinoRef.current, { opacity: 1 }); // Retorna à posição inicial imediatamente
          // Retorna à posição inicial imediatamente
          // clearAllTimeoutsAndReset()
        },
        onUpdate: () => {
          Array.from(triggers).forEach((trigger, triggerIndex) => {
            const triggerRect = trigger.getClientRects()[0];
            const dinoRect = dinoRef.current?.getClientRects()[0];

            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            if (triggerIndex === 4) {
              return;
            }

            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            if (Math.abs(triggerRect.left - dinoRect?.right!) <= 3.5) {
              // if (Math.abs(triggerRect.left - dinoRect?.right!) <= 2.5) {
              // console.log(`Trigger ${triggerIndex} está próximo ao DinoX:`, triggerRect);
              jump();
            }
          });
        },
      });

      // Dino FALL
      tl.fromTo(
        dinoRef.current,
        {
          yPercent: -100,
        },
        {
          yPercent: 262,
          opacity: 1,
          duration: 1.1,
          ease: "bounce",
        }
      );

      // Adiciona a animação do peCicero diretamente na timeline
      tl.to(peCiceroref.current, {
        xPercent: -30,
        duration: 12,
        delay: 1.5,
        // duration: 60,
      });

      // // Adiciona a primeira animação do fundo diretamente na timeline
      const limit = document.getElementsByClassName("t-5")[0];
      // const dino = dinoRef.current?.getClientRects()[0]
      // tl.to(bgRef.current, {
      //   x: -limit.getClientRects()[0].x,
      //   duration: 13.5,
      // }, 1.5)

      const limitRect = limit.getBoundingClientRect();
      const dinoRect = dinoRef.current?.getBoundingClientRect();

      if (dinoRect) {
        // Calcular a distância para mover o fundo, de modo que o 'right' do dino esteja próximo ao 'left' do limit.
        // Isso será a posição 'left' do limit menos a posição 'right' do dino.
        // Ajuste conforme necessário para definir o quão "próximo" você quer que eles estejam.
        const buffer = 280; // Quantidade de pixels para parar antes do 'limit'.
        const xPosition = limitRect.right - dinoRect.x + buffer;
        // Se a posição calculada for positiva, isso significaria mover o fundo para a direita, o que não é desejado,
        // então certifique-se de que a posição é negativa, pois queremos mover o fundo para a esquerda.
        tl.to(
          bgRef.current,
          {
            x: `-=${Math.abs(xPosition)}`, // Garante que o valor é negativo.
            duration: 13.5,
          },
          1.5
        );
      }

      // Adiciona a segunda animação do fundo após a primeira ter terminado
      tl.to(bgRef.current, {
        xPercent: "-=12",
        duration: 2.2,
        delay: 1.5,
        onComplete: () => {
          gsap.to(dinoRef.current, { opacity: 0 });
          // Então começa
          gsap.to(dinoCarRef.current, {
            opacity: 1,
            ease: "none",
            delay: 1,
          });
          // Adiciona o Pe Cicero novamente
          gsap.to(peCiceroref.current, {
            xPercent: "-=5",
            duration: 1.5,
            delay: 1.5,
          });
        },
      }); // Isso irá adicionar a animação após 5 segundos da última animação terminar

      // RUN FINAL
      tl.to(bgRef.current, {
        xPercent: "-=60",
        duration: 4,
        delay: 1.5,
        onComplete: () => {
          gsap.set(dinoCarRef.current, { opacity: 0, ease: "none" });
          gsap.set(dinoRef.current, { opacity: 1 });
        },
      });

      // tl.add(jumps, 0.4)
    }
  }, [bgRef, peCiceroref]);

  return (
    <div className={cn("girosflin relative", classname)}>
      {/* <p className='absolute top-2 left-2 font-bold'>Total Width: {totalWidth}, Total Height: {totalHeight}</p> */}
      {/* <p className='absolute top-8 left-2 font-bold'>DinoX: {dinoX}</p> */}
      <Image
        title="peCicero_animation_bg"
        src={peCicero}
        ref={peCiceroref}
        alt="peCicero"
        loading="eager"
        className="absolute left-1 top-0 z-10 h-full w-max min-w-[626px]"
      />
      {/* <section ref={bgRef} className='bgRef absolute h-full flex z-30 bottom-0'>
        {bgImages.map((image, index) => {
          return (
            <img src={image} key={index} className="bg" alt="bg" />
          )
        })
        }
      </section> */}
      <section ref={bgRef} className="bgRef absolute bottom-0 z-30 flex h-full">
        {bgImages.map((image, index) => {
          return (
            <div
              key={index}
              className="bg relative"
              style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              {index >= 1 && index <= 5 && (
                <div className={cn("triggerJump", `t-${index}`, "opacity-0")} />
              )}
            </div>
          );
        })}
      </section>
      {/* dino */}
      <Image
        src={dino}
        ref={dinoRef}
        title="dino_animation"
        className="dino absolute left-[15%] z-50 opacity-0"
        width={90}
        height={95}
        loading="eager"
        alt="dino"
      />
      {/* <img src={dino} ref={dinoRef} className="dino absolute bottom-4 left-[15%] z-50" width={90} height={95} alt="dino" /> */}
      <Image
        src={dinoCar}
        ref={dinoCarRef}
        title="dinoCar_animation"
        className="dino absolute bottom-4 left-[15%] z-50 opacity-0"
        width={270}
        height={95}
        loading="eager"
        alt="dino"
      />
    </div>
  );
}
