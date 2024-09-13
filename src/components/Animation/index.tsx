"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Lottie, { Options } from "react-lottie";
import animation from "@/common/data/animation/whells.json";
import animationData1 from "@/common/data/animation/criarEmpresas.json";
import graph from "@/common/data/animation/graph.json";
import chart from "@/common/data/animation/chart.json";
import fogos from "@/common/data/animation/fogos.json";

import "./animation.scss";
import { AnimationProps } from "@/types";
import { cn } from "@/lib/utils";
import PixiPlugin from "gsap/PixiPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useMobileContext } from "@/common/context/MobileDeviceContext";
import Image from "next/image";

gsap.registerPlugin(PixiPlugin, ScrollTrigger);

/**
 * Shuffles an array in a random order.
 *
 * @param {T[]} array - The array to be shuffled.
 * @return {T[]} The shuffled array.
 */
function shuffleArray<T>(array: T[]): T[] {
  function compareRandom() {
    return Math.random() - 0.5; // Retorna um número aleatório entre -0.5 e 0.5
  }
  // Create a new array with the same elements as the original array
  const newArray = [...array].sort(compareRandom);
  // Return the shuffled array
  return newArray;
}

function generateLootieOptions(data: any, autoplay = true): Options {
  const defaultOptions = {
    loop: true,
    autoplay,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return { ...defaultOptions };
}

function getLottie(data: any, autoplay?: boolean | undefined, title?: string) {
  return (
    <Lottie
      style={{ width: "100%", height: "100%" }}
      options={generateLootieOptions(data, autoplay ?? true)}
      isClickToPauseDisabled={true}
      title={title || ""}
    />
  );
}

function CriarEmpresa({
  className,
  title,
  height: heightProp,
  width: widthProp,
}: AnimationProps) {
  const [state, setState] = useState({ isPaused: false, isStopped: false });
  const divRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<HTMLDivElement>(null);
  const iconRefs = {
    left: [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ],
    right: [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ],
  };
  const refArray = [p1Ref, p2Ref, p3Ref, p4Ref, p5Ref];
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fogosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iconDuration = 1.5;
    const predioDuration = 1.8;
    if (divRef.current) {
      const timeline = gsap.timeline({
        repeat: -1,
      });
      const timeline2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#wrapper",
          start: "top 80%", // when the top of the trigger hits the top of the viewport
        },
        onComplete: () => {
          setState({ ...state, isPaused: true });
        },
      });
      // Use o método map para acessar o valor atual (.current) de cada referência.
      let predios = refArray.map((ref) => ref.current);
      // Extrair os valores das refs
      // let leftArray = Object.values(iconRefs.left).map(obj => obj.current);
      let leftArray = iconRefs.left.map((obj) => obj.current);
      let rightArray = iconRefs.right.map((obj) => obj.current);

      // leftArray = gsap.utils.shuffle(leftArray)
      leftArray = shuffleArray(leftArray);
      rightArray = gsap.utils.shuffle(rightArray);
      predios = gsap.utils.shuffle(predios);
      //
      const ballons = document.getElementById("baloesWrapper");
      // Função para criar uma animação individual para um prédio
      const createPredioAnimation = (
        predio: any,
        delay: number,
        hiddenOnEnd: boolean
      ) => {
        return gsap.fromTo(
          predio,
          {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "bottom",
          },
          {
            opacity: 1,
            scaleY: 1,
            ease: "power4.out",
            duration: predioDuration,
            delay,
            onComplete: () => {
              hiddenOnEnd &&
                gsap.to(predio, {
                  opacity: 0,
                });
            },
          }
        );
      };

      // Adicione os ballons na timeline
      const ballonsAnimation = (ballon: any, delay: number, dd = 0) => {
        return gsap.to(ballon, {
          opacity: 1,
          duration: iconDuration,
          delay: delay + dd,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            gsap.to(ballon, {
              opacity: 0,
            });
          },
        });
      };

      // Crie uma sequência de animações para os prédios usando map
      const animations = predios.map((predio, index) =>
        createPredioAnimation(
          predio,
          index * (predioDuration + 0.5),
          index !== 4
        )
      );
      const ballonsLeftAnimations = leftArray.map((ballon, index) =>
        ballonsAnimation(ballon, index * iconDuration, 0.5)
      );
      const ballonsRightAnimations = rightArray.map((ballon, index) =>
        ballonsAnimation(ballon, index * iconDuration, 0.2)
      );

      // Adicione as animações à linha do tempo
      timeline2.add(animations, 0); // 2.5 segundos de atraso entre cada prédio
      timeline2.to(
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        ballons,
        {
          opacity: 0,
          delay: 1,
          onComplete: () => {
            gsap.to("#ok", { opacity: 1 });
          },
        }
      );
      timeline.add(ballonsLeftAnimations, 0); // 2.5 segundos de atraso entre cada prédio
      timeline.add(ballonsRightAnimations, 0); // 2.5 segundos de atraso entre cada prédio

      return () => {
        timeline.kill();
        timeline2.kill();
      };
    }
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url('/assets/img/animations/1/piso.png')`,
        backgroundSize: "contain",
        backgroundPosition: "center 80%",
        backgroundRepeat: "no-repeat",
        width: widthProp,
        height: heightProp,
      }}
      ref={divRef}
      id="wrapper"
      className={cn("animation flex flex-col items-center", className)}
    >
      <div className="h-full w-full">
        <Lottie
          options={defaultOptions}
          isStopped={state.isStopped}
          isPaused={state.isPaused}
          isClickToPauseDisabled={true}
          title={title || ""}
        />
      </div>
      <div className="predios absolute z-10 flex h-full w-full items-center justify-center">
        {refArray.map((ref, index) => {
          return (
            <div
              key={index}
              ref={ref}
              // className="w-[80px] h-[80px] absolute -translate-y-5 translate-x-4"
              className="absolute h-[25%] translate-x-4 md:!w-[12%] md:!-translate-y-5 xsm:w-[15%] xsm:-translate-y-7"
              style={{
                backgroundImage: `url('/assets/img/animations/1/p${
                  index + 1
                }.png')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "bottom",
                opacity: 0,
              }}
            />
          );
        })}
      </div>
      <section
        id="baloesWrapper"
        className={cn(
          "baloesWrapper absolute h-fit w-full xsm:scale-75 ",
          "flex justify-between md:!px-[7%] xsm:px-[2%]",
          "top-[10%]"
        )}
      >
        <div className="balaoLeft relative">
          <div
            className={cn(
              "icons",
              "relative top-[8px] mx-auto h-[65px] w-[100px]"
            )}
          >
            {iconRefs.left.map((ref, index) => (
              <div
                key={index + 1}
                ref={ref}
                className={cn(
                  `${index}`,
                  "absolute z-50 h-full w-1/2",
                  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                  backgroundImage: `url('/assets/img/animations/balao/icone-${
                    index + 1
                  }.svg')`,
                  backgroundColor: "#FAFAFA",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionY: "center",
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
        <div className="balaoRight relative">
          <div className={cn("relative top-[8px] mx-auto h-[65px] w-[100px]")}>
            {iconRefs.right.map((ref, index) => (
              <div
                key={index + 1}
                ref={ref}
                className={cn(
                  `${index}`,
                  "absolute z-50 h-full w-1/2",
                  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                  backgroundImage: `url('/assets/img/animations/balao/icone-${
                    index + 1
                  }.svg')`,
                  backgroundColor: "#FAFAFA",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionY: "center",
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>
      {/* FOGOS */}
      <div
        ref={fogosRef}
        id="ok"
        className="absolute top-[20%] z-[888] mx-auto h-[15%] w-[20%] opacity-0"
      >
        {getLottie(fogos)}
      </div>
      {/* <img src="/assets/img/NOFILL_animated.svg"  /> */}
    </section>
  );
}

function Societario({ className, title }: AnimationProps) {
  const [raioXAnimation, setRaioXAnimation] = useState(false);
  const refs = {
    dino: {
      desempregado: useRef<HTMLDivElement>(null),
      raioX: useRef<HTMLDivElement>(null),
      regularizado: useRef<HTMLDivElement>(null),
    },
    cena: useRef<HTMLDivElement>(null),
  };
  const animationDelayPosition = {
    entry: {
      duration: 0.5,
      delay: 0,
    },
    jump: {
      duration: 0.4,
      delay: 0,
    },
    runEsteira: {
      duration: 2,
      delay: 0,
    },
    regularizado: {
      duration: 3,
      delay: 0,
    },
    jumpRegularizado: {
      duration: 0.4,
      delay: 0,
    },
  };
  const { mobileState } = useMobileContext();

  function dinoEntry(dino: HTMLDivElement | null) {
    const wrapper = document.getElementById("wrapper");
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const animation = gsap.fromTo(
      dino,
      {
        x: -150,
        y: mobileState.isSmallScreen ? -15 : 0,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        x: mobileState.isSmallScreen ? 160 : () => wrapper?.clientLeft! + 300,
        duration: animationDelayPosition.runEsteira.duration,
        // onComplete: () => {
        //     const outAnimation = gsap.to(dino, { opacity: 0, ease: 'none' });

        //     outAnimation.eventCallback('onStart', () => {
        //         setRaioXAnimation(true);
        //     });
        // }
      }
    );

    return animation;
  }

  function dinoJump(dino: HTMLDivElement | null) {
    const animation = gsap.to(dino, {
      y: "-=100px",
      x: mobileState.isSmallScreen ? "+=20" : "+=60",
      // xPercent: 70,
      duration: animationDelayPosition.jump.duration,
      // delay: animationDelayPosition.jump.delay,
      ease: "Power1.easeIn",
      onComplete: () => {
        gsap.to(dino, {
          x: "+=40px",
          // y: -38,
          yPercent: mobileState.isSmallScreen ? 86 : 65,
          duration: animationDelayPosition.jump.duration - 0.1,
          // ease: 'Power4.easeOut',
          ease: 'CustomEase.create("custom", "M0,1,C0,1,0.332,0.845,0.52,0.657,0.809,0.368,1,0,1,0")',
        });
      },
    });

    return animation;
  }

  function dinoJumpRegularizado(dino: HTMLDivElement | null) {
    const animation = gsap.to(dino, {
      y: mobileState.isSmallScreen ? "-=25" : "-=50",
      // x: '+=50px',
      x: mobileState.isSmallScreen ? "+=25" : "+=50",
      duration: animationDelayPosition.jump.duration,
      delay: animationDelayPosition.jumpRegularizado.delay,
      ease: "Power1.easeIn",
      onComplete: () => {
        gsap.to(dino, {
          x: mobileState.isSmallScreen ? "+=30" : "+=60",
          yPercent: mobileState.isSmallScreen ? 0 : 60,
          duration: animationDelayPosition.jump.duration - 0.1,
          ease: 'CustomEase.create("custom", "M0,1,C0,1,0.332,0.845,0.52,0.657,0.809,0.368,1,0,1,0")',
          onComplete: () => {
            gsap.to(dino, {
              x: "+=206px",
              duration: 3,
            });
          },
        });
      },
    });

    return animation;
  }

  const runDinoNaEsteira = (dino: any) => {
    const wrapper = document.getElementById("wrapper")?.getBoundingClientRect();
    const limit = document.getElementById("limit")?.getBoundingClientRect();

    // A posição deve ser a diferença entre o left do wrapper e o left do limit.
    // Como queremos mover o dino para a direita, subtraímos o left do limit do left do wrapper.
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const xPosition = limit?.left! - wrapper?.left! - 10;

    const animation = gsap.to(dino, {
      x: xPosition,
      duration: animationDelayPosition.runEsteira.duration,
      onComplete: () => {
        const outAnimation = gsap.to(dino, { opacity: 0, ease: "none" });

        outAnimation.eventCallback("onStart", () => {
          setRaioXAnimation(true);
        });
      },
    });

    return animation;
  };

  function dinoRegularizado(dino: HTMLDivElement | null) {
    const wrapper = document.getElementById("wrapper");
    const limit = document.getElementById("limit")?.getBoundingClientRect();

    // A posição deve ser a diferença entre o left do wrapper e o left do limit.
    // Como queremos mover o dino para a direita, subtraímos o left do limit do left do wrapper.
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const xPosition = limit?.left! - wrapper?.getBoundingClientRect().left! - 8;

    const animation = gsap.fromTo(
      dino,
      {
        x: xPosition,
        yPercent: mobileState.isSmallScreen ? -65 : -54,
        opacity: 1,
      },
      {
        x: mobileState.isSmallScreen ? "+=140" : "+=240",
        duration: animationDelayPosition.regularizado.duration,
        delay: 1,
        // delay: animationDelayPosition.regularizado.delay,
        ease: "power4.out",
      }
    );
    return animation;
  }

  function startAnimation(
    dino: any,
    dinoRegularizadoRef: any,
    timeline: gsap.core.Timeline
  ) {
    timeline.add(dinoEntry(dino), animationDelayPosition.entry.delay);
    timeline.add(dinoJump(dino), animationDelayPosition.jump.delay);
    timeline.add(
      runDinoNaEsteira(dino),
      animationDelayPosition.runEsteira.delay
    );
    timeline.add(
      dinoRegularizado(dinoRegularizadoRef),
      animationDelayPosition.regularizado.delay
    );
    timeline.add(
      dinoJumpRegularizado(dinoRegularizadoRef),
      animationDelayPosition.jumpRegularizado.delay
    );
    timeline.play();
  }

  function resetAnimation(
    dino: HTMLDivElement | null,
    dinoRegularizadoRef: HTMLDivElement | null,
    timeline: gsap.core.Timeline
  ) {
    setRaioXAnimation(false);

    const wrapper = document.getElementById("wrapper")?.getBoundingClientRect();
    const limit = document.getElementById("limit")?.getBoundingClientRect();
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const xPosition = limit?.left! - wrapper?.left! + 150;

    // Defina as posições iniciais e outras configurações iniciais aqui
    gsap.set(dino, { x: -150, yPercent: -10, opacity: 1 });
    gsap.set(dinoRegularizadoRef, {
      x: xPosition,
      yPercent: mobileState.isSmallScreen ? -65 : -60,
      opacity: 1,
    });

    // Reinicie a timeline
    timeline.restart();

    // Configure o loop infinito
    timeline.repeat(-1); // -1 indica um loop infinito
  }

  useEffect(() => {
    animationDelayPosition.jump = {
      ...animationDelayPosition.jump,
      delay: animationDelayPosition.entry.duration,
    };
    animationDelayPosition.runEsteira = {
      ...animationDelayPosition.runEsteira,
      delay: animationDelayPosition.jump.duration * 2,
    };
    animationDelayPosition.regularizado = {
      ...animationDelayPosition.regularizado,
      delay: animationDelayPosition.runEsteira.duration,
    };
    animationDelayPosition.jumpRegularizado = {
      ...animationDelayPosition.jumpRegularizado,
      delay: animationDelayPosition.runEsteira.duration,
    };

    if (refs.cena) {
      const dino = refs.dino.desempregado.current;
      const dinoRegularizadoRef = refs.dino.regularizado.current;
      const timeline = gsap.timeline({});

      startAnimation(dino, dinoRegularizadoRef, timeline);

      // Após a conclusão das animações existentes, chame a função resetAnimation
      timeline.call(() => {
        resetAnimation(dino, dinoRegularizadoRef, timeline);
      });
    }
  }, []);

  return (
    <section
      ref={refs.cena}
      style={{
        backgroundImage: `url('/assets/img/animations/2/esteira2.png')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        zIndex: 50,
      }}
      title={title ?? ""}
      id="wrapper"
      className={cn(
        "flex h-[330px] items-end justify-center md:!w-[814.41px] xsm:w-[300px]",
        className
      )}
    >
      {/* DINOS */}
      <section className="dinosArea absolute -z-30 flex h-full w-full">
        <div
          ref={refs.dino.desempregado}
          style={{
            backgroundImage: `url('/assets/img/animations/2/dino.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "10%",
            height: "25%",
            // width: '5rem',
            // height: '5.5rem'
          }}
          className="desempregado absolute bottom-0"
        />
        <div
          ref={refs.dino.regularizado}
          style={{
            backgroundImage: `url('/assets/img/animations/2/dinoReg${
              Math.floor(Math.random() * 3) + 1
            }.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "10%",
            height: "25%",
            opacity: 0,
            zIndex: -20,
          }}
          className="regularizado absolute bottom-0"
        />
      </section>
      {/* Portal */}
      <div className="portalWrapper absolute flex h-full w-full justify-center">
        <div
          style={{
            backgroundImage: `url('/assets/img/animations/2/portal.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          // className="portal w-2/5 h-[42%] relative flex items-end translate-y-[38%]"
          className={cn(
            "portal relative top-[9rem] flex w-2/5 items-end md:top-[9.1rem] md:!h-[42%]",
            "xsm:h-[24%]"
          )}
        >
          <div
            className={cn(
              "blockRaioX lg!h-[76%] mx-auto w-1/4 translate-y-[1%] bg-black",
              "xsm:h-[75%]"
              // "border border-green-500"
            )}
          >
            <div
              style={{
                backgroundImage: `url('/assets/img/animations/2/${
                  raioXAnimation ? "greenButton" : "redButton"
                }.png')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                scale: 1,
              }}
              className="button relative top-0 mx-auto h-[30%] w-[30%] -translate-y-[55%] cursor-pointer"
            />
          </div>
        </div>
      </div>
      {/* Wheels */}
      <div
        className={cn(
          "wheels absolute h-full",
          "md:!w-[66%] md:!-translate-y-0 xsm:w-[81.5%] xsm:-translate-y-[17%]"
        )}
      >
        <div
          className={cn(
            // "w-full md:!w-[60%] h-[5%] max-h-[20px]",
            "h-[5%] md:!max-h-[20px] xsm:max-h-[12px] xsm:min-w-full",
            "container relative -bottom-[87.8%] bg-opacity-80 bg-gradient-to-t from-[#A1C3C9] to-[#C4D6DC]",
            "z-[999] flex items-center justify-center ",
            "mx-auto translate-x-[0.81%] overflow-hidden rounded-full",
            "border border-teal-700"
            // "min-w-[395px]"
          )}
        >
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <Image
                className="animate-wheel h-full w-full object-contain"
                src="/assets/img/animations/3/wheel.png"
                alt="wheel"
                key={index}
              />
            ))}
        </div>
      </div>
      <section
        id="limit"
        className="absolute z-[999] mx-auto h-full w-4 bg-black/60 opacity-0"
      />
    </section>
  );
}

function Fiscal({ className, title }: AnimationProps) {
  const ref = {
    dinoRef: useRef<HTMLDivElement>(null),
    spriteRef: useRef<HTMLDivElement>(null),
    laserRef: useRef<HTMLDivElement>(null),
    dinoParado: useRef<HTMLDivElement>(null),
    balaoRef: useRef<HTMLDivElement>(null),
    balaoRef2: useRef<HTMLDivElement>(null),
    balaoRef3: useRef<HTMLDivElement>(null),
    carteira: useRef<HTMLDivElement>(null),
    fogos: useRef<HTMLDivElement>(null),
    text: useRef<HTMLDivElement>(null),
  };
  const frases = ["Redução Tributária Concluída"];
  const { mobileState } = useMobileContext();

  function dinoEntry(
    dino: HTMLDivElement | null,
    sprite: HTMLDivElement | null
  ) {
    const trigger = document.getElementById("trigger");
    const wrapper = document.getElementById("wrapper");
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    const xPosition = trigger?.clientLeft! - wrapper?.clientLeft!;

    const animation = gsap.fromTo(
      dino,
      {
        x: -200,
        y: 0,
      },
      {
        // x: mobileState.isSmallScreen ? trigger?.offsetLeft : 240,
        x: mobileState.isSmallScreen ? xPosition + 25 : xPosition + 150,
        opacity: 1,
        duration: 3,
        onComplete: () => {
          gsap.fromTo(sprite, { opacity: 1 }, { opacity: 0, duration: 0.6 });
          gsap.fromTo(
            ref.dinoParado.current,
            { opacity: 0 },
            { opacity: 1, delay: 0.15, duration: 0 }
          );
        },
      }
    );

    return animation;
  }

  function greetings() {
    const tl = gsap.timeline({ delay: 9.3 });

    tl.to(ref.fogos.current, { opacity: 1 });
    tl.fromTo(
      ref.text.current,
      { y: "+=100" },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      }
    );
    tl.to([ref.text.current, ref.fogos.current], {
      opacity: 0,
      duration: 1.5,
      delay: 0.5,
    });

    return tl.play();
  }

  function laserEntry(laser: any) {
    const baloes = [
      ref.balaoRef.current,
      ref.balaoRef2.current,
      ref.balaoRef3.current,
    ];
    const tl = gsap.timeline({
      delay: 3.2,
      // onStart: () => {
      //     gsap.to(
      //         ref.carteira.current,
      //         {
      //             opacity: 1,
      //             duration: 5.5,
      //             delay: 2,
      //             onComplete: () => {
      //                 gsap.to(
      //                     ref.carteira.current,
      //                     {
      //                         opacity: 0,
      //                         duration: .5,
      //                         delay: .5,
      //                     }
      //                 )
      //             }
      //         }
      //     )
      // },
    });

    const laserAnim = gsap.timeline({
      repeat: 2, // Repete a animação 5 vezes
    });

    laserAnim
      .to(laser, {
        duration: 0.5, // Duração total da animação (1.5 segundos)
        rotation: 0,
        transformOrigin: "0 39%",
        ease: "linear", // Função de temporização linear para manter a mesma velocidade
      })
      .to(laser, {
        duration: 0.5, // Duração total da animação (1.5 segundos)
        rotation: -45,
        transformOrigin: "0 39%",
        ease: "linear", // Função de temporização linear para manter a mesma velocidade
      })
      .to(laser, {
        duration: 0.5, // Duração total da animação (1.5 segundos)
        rotation: 0,
        transformOrigin: "0 39%",
        ease: "linear", // Função de temporização linear para manter a mesma velocidade
      });

    const entrance = gsap.to(laser, {
      opacity: 0.7,
      duration: 0.8,
    });

    const balaoEntrance = gsap.to(baloes, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
    });

    tl.add(entrance, 0);
    tl.add(laserAnim, 1);
    tl.add(balaoEntrance, 1.2);

    return tl.play();
  }

  function text() {
    const baloes = [
      ref.balaoRef.current,
      ref.balaoRef2.current,
      ref.balaoRef3.current,
    ];
    const tl = gsap.timeline({ delay: 9.2 });
    const animationBallon = tl.to(baloes, {
      opacity: 0,
    });

    tl.add(animationBallon, 0);

    return tl.play();
  }

  function startAnimation(
    timeline: gsap.core.Timeline,
    dino: any,
    sprite: any,
    laser: any
  ) {
    const entrance = dinoEntry(dino, sprite);
    const laserEntrance = laserEntry(laser);
    const ballonOut = text();
    const textAnimation = greetings();

    timeline.add(entrance, 0);
    timeline.add(laserEntrance, 0);
    timeline.add(ballonOut, 0);
    timeline.add(textAnimation, 0);
  }

  function resetAnimation(timeline: any, sprite: any, laser: any) {
    // Defina as posições iniciais e outras configurações iniciais aqui
    gsap.set(ref.dinoParado.current, { opacity: 0 });
    gsap.set(sprite, { opacity: 1 });
    gsap.set(laser, { opacity: 0 });
    gsap.set(ref.balaoRef.current, { opacity: 0 });
    gsap.set(ref.balaoRef2.current, { opacity: 0 });
    gsap.set(ref.balaoRef3.current, { opacity: 0 });
    gsap.set(ref.fogos.current, { opacity: 0 });
    gsap.set(ref.text.current, { opacity: 0 });

    // Reinicie a timeline
    timeline.restart();

    // Configure o loop infinito
    timeline.repeat(-1); // -1 indica um loop infinito
  }

  useEffect(() => {
    if (ref.dinoRef.current) {
      const timeline = gsap.timeline({});
      const dino = ref.dinoRef.current;
      const sprite = ref.spriteRef.current;
      const laser = ref.laserRef.current;

      startAnimation(timeline, dino, sprite, laser);

      // Após a conclusão das animações existentes, chame a função resetAnimation
      timeline.call(() => {
        resetAnimation(timeline, sprite, laser);
      });
    }
  });

  return (
    <div
      id="wrapper"
      style={{
        backgroundImage: `url('/assets/img/animations/3/predio.png')`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
      }}
      className={cn(
        className,
        " z-1 relative",
        "md:!w-[814.41px]' h-[150px] xsm:w-[300px]"
      )}
      title={title}
    >
      <div
        id="trigger"
        className={cn(
          "relative left-[20%] z-50 h-full w-4 bg-black/50 opacity-0"
        )}
      />
      {/* DINO */}
      <div
        ref={ref.dinoRef}
        className="absolute bottom-0 left-10 z-30 h-[81px] w-[85px]"
      >
        <div
          ref={ref.dinoParado}
          style={{
            backgroundImage: `url('/assets/img/animations/3/dino-parado.png')`,
            width: "75px",
            height: "81px",
            opacity: 0,
          }}
          className="absolute bottom-[2%] !z-10"
        />
        <div
          style={{
            backgroundImage: `url('/assets/img/animations/3/dino-predio.png')`,
            width: "75px",
            height: "81px",
          }}
          ref={ref.spriteRef}
          className="animate-sprite absolute !z-40 -translate-x-[3px]"
        />
        {/* LASER */}
        <div
          style={{
            backgroundImage: `url('/assets/img/animations/3/laser.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            width: "400px",
            height: "170px",
            opacity: 0,
          }}
          ref={ref.laserRef}
          // className="animate-lase z-50 absolute -right-[480%] -top-[65%] border-2 border-red-500"
          className="animate-laser absolute -top-[73%] left-[68%] z-50"
        >
          {/* <div className="origin-point"></div> */}
        </div>
        {/* BALÃO */}
        <div
          style={{ opacity: 0 }}
          ref={ref.balaoRef}
          className={cn(
            "balao relative",
            "-left-[120%] -top-[120%]",
            "md:!-left-[190%] md:!-top-[195%]",
            "md:!scale-100 xsm:scale-[.45]"
          )}
        >
          <div
            ref={ref.balaoRef2}
            style={{
              backgroundImage: `url('/assets/img/animations/3/balao-teste-2.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "32px",
              height: "32px",
              opacity: 0,
            }}
            className="balao1 absolute -bottom-7 right-0 z-50"
          />
          <div
            ref={ref.balaoRef3}
            style={{
              backgroundImage: `url('/assets/img/animations/3/balao-teste-3.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "20px",
              height: "20px",
              opacity: 0,
            }}
            className="balao2 absolute -bottom-10 -right-5 z-50"
          />
        </div>
        {/* FOGOS */}
        <div
          ref={ref.fogos}
          style={{ opacity: 0 }}
          className={cn(
            "absolute h-28 w-48",
            "md:!scale-100 xsm:scale-50",
            "md:!-right-[100%] md:!-top-[135%] xsm:-right-[80%] xsm:-top-[95%]"
          )}
        >
          {getLottie(fogos)}
          <p
            ref={ref.text}
            className="font-lg text-primary absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 transform text-center font-black"
          >
            {frases[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

function Contabil({
  className,
  title,
  height: heightProp,
  width: widthProp,
}: AnimationProps) {
  const graphArray = [graph, chart];
  const divRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<HTMLDivElement>(null);
  const iconRefs = {
    left: [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ],
    right: [
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
      useRef<HTMLDivElement>(null),
    ],
  };
  const prediosRef = [p1Ref, p2Ref, p3Ref, p4Ref, p5Ref];

  useEffect(() => {
    const iconDuration = 1.5;
    if (divRef.current) {
      // const randomPredio = prediosRef.map(obj => obj.current).find(numeroAleatorio)
      const timeline = gsap.timeline({ repeat: -1 });
      const timelinePredio = gsap.timeline({});
      // let leftArray = Object.values(iconRefs.left).map(obj => obj.current);
      let leftArray = iconRefs.left.map((obj) => obj.current);
      let rightArray = iconRefs.right.map((obj) => obj.current);

      // leftArray = gsap.utils.shuffle(leftArray)
      leftArray = shuffleArray(leftArray);
      rightArray = gsap.utils.shuffle(rightArray);

      // Função para criar uma animação individual para um prédio

      // Adicione os ballons na timeline
      const ballonsAnimation = (ballon: any, delay: number, dd = 0) => {
        return gsap.to(ballon, {
          opacity: 1,
          duration: iconDuration,
          delay: delay + dd,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            gsap.to(ballon, {
              opacity: 0,
            });
          },
        });
      };

      const predioAnimation = (predio: any) => {
        return gsap.fromTo(
          predio,
          {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "bottom",
          },
          {
            opacity: 1,
            scaleY: 1,
            ease: "power4.out",
            duration: 2,
            delay: 0,
          }
        );
      };

      // Crie uma sequência de animações para os prédios usando map
      const randomPredio = gsap.utils.random(
        prediosRef.map((obj) => obj.current)
      );
      console.log(randomPredio);
      const ballonsLeftAnimations = leftArray.map((ballon, index) =>
        ballonsAnimation(ballon, index * iconDuration, 0.5)
      );
      const ballonsRightAnimations = rightArray.map((ballon, index) =>
        ballonsAnimation(ballon, index * iconDuration, 0.2)
      );
      const predio = predioAnimation(randomPredio);
      // Adicione as animações à linha do tempo
      timeline.add(ballonsLeftAnimations, 0);
      timeline.add(ballonsRightAnimations, 0);
      timelinePredio.add(predio, 0);

      return () => {
        timeline.kill();
        timelinePredio.kill();
      };
    }
  }, []);

  return (
    <section
      style={{
        backgroundImage: `url('/assets/img/animations/1/piso.png')`,
        backgroundSize: "contain",
        backgroundPosition: "center 80%",
        backgroundRepeat: "no-repeat",
        width: widthProp,
        height: heightProp,
      }}
      title={title}
      ref={divRef}
      className={cn("animation relative flex flex-col items-center", className)}
    >
      <div className="z-50 h-full w-full translate-y-4">
        {getLottie(animationData1, false)}
      </div>
      <section
        className={cn(
          "baloesWrapper absolute h-fit w-full",
          "flex justify-between px-[10%]",
          "top-[5%] hidden"
        )}
      >
        <div className="balaoLeft relative">
          <div
            className={cn(
              "icons",
              "relative top-[8px] mx-auto h-[65px] w-[100px]"
            )}
          >
            {iconRefs.left.map((ref, index) => (
              <div
                key={index + 1}
                ref={ref}
                className={cn(
                  `${index}`,
                  "absolute z-50 h-full w-1/2",
                  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                  backgroundImage: `url('/assets/img/animations/balao/icone-${
                    index + 1
                  }.svg')`,
                  backgroundColor: "#FAFAFA",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionY: "center",
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
        <div className="balaoRight relative">
          <div className={cn("relative top-[8px] mx-auto h-[65px] w-[100px]")}>
            {iconRefs.right.map((ref, index) => (
              <div
                key={index + 1}
                ref={ref}
                className={cn(
                  `${index}`,
                  "absolute z-50 h-full w-1/2",
                  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                )}
                style={{
                  backgroundImage: `url('/assets/img/animations/balao/icone-${
                    index + 1
                  }.svg')`,
                  backgroundColor: "#FAFAFA",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPositionY: "center",
                  opacity: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="predio absolute top-[60%] flex h-auto w-full items-end justify-center">
        {prediosRef.map((_, index) => (
          <div
            key={index}
            ref={_}
            style={{
              backgroundImage: `url('/assets/img/animations/1/p${
                index + 1
              }.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "bottom",
              opacity: 0,
            }}
            className="absolute z-[1000] h-[80px] w-[80px]"
          />
        ))}
      </section>
      <section
        className={cn(
          "graphs flex flex-row-reverse items-start justify-center gap-16",
          "absolute -top-[11%] h-44 w-full"
          // "border-2 border-yellow-500"
        )}
      >
        {graphArray.reverse().map((graph, index) => (
          <div className="h-full" key={index}>
            {getLottie(graph)}
          </div>
        ))}
      </section>
    </section>
  );
}

export { CriarEmpresa, Societario, Fiscal, Contabil };
