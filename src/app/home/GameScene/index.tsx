"use client";
import { cn } from "@/lib/utils";
import "./style.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type Props = {
  classname: string;
};

export default function GameScene({ classname }: Props) {
  const [dinoX, setDinoX] = useState<number | undefined>(0);
  const bgRef = useRef<HTMLDivElement>(null);
  const dinoRef = useRef<HTMLImageElement>(null);
  const dinoCarRef = useRef<HTMLImageElement>(null);
  const peCiceroref = useRef<HTMLImageElement>(null);
  //
  const peCicero = "https://i.postimg.cc/WzwdGfSC/cicao.png";
  const dino = "https://i.postimg.cc/wM8NcNzy/Dino-de-Skate.png";
  const dinoCar = "https://i.postimg.cc/4ygKhTvp/Dino-no-carro.png";
  const bgImages = [
    "https://i.postimg.cc/NF6HN0GN/bg1.png",
    "https://i.postimg.cc/DwjbpHFK/bg2.png",
    "https://i.postimg.cc/T2gg2tjr/bg3.png",
    "https://i.postimg.cc/TwmLwPbR/bg4.png",
    "https://i.postimg.cc/jjDnpcdn/bg5.png",
    "https://i.postimg.cc/X7g5dXzq/bg6.png",
    "https://i.postimg.cc/sDzSM5Kb/bg7.png",
    "https://i.postimg.cc/YCqW3k53/bg8.png",
  ];

  useEffect(() => {
    if (bgRef.current && peCiceroref.current) {
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
    }
  }, [bgRef, peCiceroref]);

  return (
    <div className={cn("girosflin relative", classname)}>
      <img
        src={peCicero}
        ref={peCiceroref}
        loading="eager"
        title="peCicero_animation_backgound"
        alt="peCicero"
        width={1}
        height={1}
        className="absolute left-1 top-0 z-10 !h-full !w-max !min-w-[626px]"
      />
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
      <Image
        src={dino}
        ref={dinoRef}
        title="dino_animation"
        className="dino absolute left-[15%] z-50 opacity-0"
        width={90}
        loading="eager"
        height={95}
        alt="dino"
      />
      <Image
        src={dinoCar}
        ref={dinoCarRef}
        title="dinoCar_animation"
        className="dino absolute bottom-4 left-[15%] z-50 opacity-0"
        width={200}
        height={95}
        loading="eager"
        alt="dino"
      />
    </div>
  );
}
