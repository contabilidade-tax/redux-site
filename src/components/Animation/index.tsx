'use client'
import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Lottie from "react-lottie"
import animation from '@/common/data/animation/whells.json'
import animationData1 from '@/common/data/animation/criarempresaSemBalao.json'

import './animation.scss'
import { AnimationProps, GameSceneProps } from "@/types"
import { cn } from "@/lib/utils"
import PixiPlugin from "gsap/PixiPlugin"
import { timeline } from "@material-tailwind/react"

gsap.registerPlugin(PixiPlugin)

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
    const newArray = [...array].sort(compareRandom)
    // Return the shuffled array
    return newArray
}

const size = {
    innerHeight: 500,
    innerWidth: 800,
}

function CriarEmpresa({ className, title, height: heightProp = size.innerHeight, width: widthProp = size.innerWidth }: AnimationProps) {
    const [state, setState] = useState({ isPaused: false, isStopped: false })
    const divRef = useRef<HTMLDivElement>(null)
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
        ]
    }
    const refArray = [p1Ref, p2Ref, p3Ref, p4Ref, p5Ref];
    const icons = [
        'icone-1', 'icone-2', 'icone-3', 'icone-4', 'icone-5', 'icone-6', 'icone-7', 'icone-8'
    ];

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData1,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    useEffect(() => {
        const iconDuration = 1
        const predioDuration = 1.8
        if (divRef.current) {
            const timeline = gsap.timeline({
                repeat: -1,
            })
            const timeline2 = gsap.timeline({
                repeat: -1,
            })
            // Use o método map para acessar o valor atual (.current) de cada referência.
            let predios = refArray.map(ref => ref.current)
            let ballonsLeft = iconRefs.left.map(ref => ref.current)
            let ballonsRight = iconRefs.right.map(ref => ref.current)

            ballonsLeft = shuffleArray(ballonsLeft)
            ballonsRight = shuffleArray(ballonsRight)
            predios = shuffleArray(predios)

            // Função para criar uma animação individual para um prédio
            const createPredioAnimation = (predio: any, delay: number) => {
                return gsap.fromTo(predio,
                    {
                        opacity: 0,
                        scaleY: 0,
                        transformOrigin: 'bottom',
                    },
                    {
                        opacity: 1,
                        scaleY: 1,
                        ease: 'power4.out',
                        duration: predioDuration,
                        delay,
                        onComplete: () => {
                            gsap.to(predio, {
                                opacity: 0,
                            });
                        },
                    }
                );
            }
            // Adicione os balloens na timeline
            const ballonsAnimation = (ballon: any, delay: number, duration: number = iconDuration) => {
                return gsap.to(ballon,
                    {
                        opacity: 1,
                        duration,
                        delay,
                        ease: 'elastic.out(1, 0.3)',
                        onComplete: () => {
                            gsap.to(ballon, {
                                opacity: 0,
                            });
                        },
                    }
                )
            }

            // Crie uma sequência de animações para os prédios usando map
            const animations = predios.map((predio, index) => createPredioAnimation(predio, index * (predioDuration + 0.5)));
            const ballonsLeftAnimations = ballonsLeft.map((ballon, index) => ballonsAnimation(ballon, index * (iconDuration + 0.5)));
            const ballonsRightAnimations = ballonsRight.map((ballon, index) => ballonsAnimation(ballon, index * (iconDuration + 0.8)));

            // Adicione as animações à linha do tempo
            timeline.add(animations, 0); // 2.5 segundos de atraso entre cada prédio
            timeline.add(ballonsLeftAnimations, 0); // 2.5 segundos de atraso entre cada prédio
            timeline2.add(ballonsRightAnimations, 0); // 2.5 segundos de atraso entre cada prédio

        }
    }, [])

    return (
        <section
            style={{
                backgroundImage: `url('/assets/img/animations/1/piso.png')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center 80%',
                backgroundRepeat: 'no-repeat',
            }}
            ref={divRef}
            className={cn("animation flex flex-col items-center", className)}>
            <div
                className="w-full h-full">
                <Lottie
                    options={defaultOptions}
                    isStopped={state.isStopped}
                    isPaused={state.isPaused}
                    isClickToPauseDisabled={true}
                    title={title || ''}
                />
            </div>
            <div className="predios z-10 w-full h-full absolute flex justify-center items-center">
                {refArray.map((ref, index) => {
                    return (
                        <div
                            key={index}
                            ref={ref}
                            className="w-[80px] h-[80px] absolute -translate-y-5 translate-x-4"
                            style={{
                                backgroundImage: `url('/assets/img/animations/1/p${index + 1}.png')`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: 'bottom',
                                opacity: 0,
                            }}
                        />
                    )
                })}
            </div>
            <section className="absolute -top-1/2 -translate-y-[10%] w-[70%] h-[400px]">
                <div
                    className="baloes absolute mx-auto w-full h-full"
                    style={{
                        backgroundImage: `url('/assets/img/animations/balao/balao.png')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPositionY: 'bottom',
                        opacity: 1
                    }}
                >
                </div>
                <section style={{ height: heightProp / 8, opacity: 1 }} className="icones absolute bottom-8 px-12 flex w-full justify-between items-center">
                    <div style={{ width: widthProp / 15 }} className={cn(
                        "ballons flex justify-center items-center",
                        "h-full"
                    )} >
                        {icons.map((icon, index) =>
                            <div key={index} ref={iconRefs.left[index]} className="-translate-x-2 -translate-y-3 w-full h-full absolute flex justify-center items-center" style={{
                                backgroundImage: `url('/assets/img/animations/balao/${icon}.svg')`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: 'center',
                                opacity: 0,
                                width: widthProp / 15
                            }} />
                        )}
                    </div>
                    <div style={{ width: widthProp / 20 }} className={cn(
                        "ballon flex justify-center items-center",
                        "h-full"
                    )} >
                        {icons.map((icon, index) =>
                            <div key={index} ref={iconRefs.right[index]} className="-translate-y-1 w-full h-full absolute flex justify-center items-center" style={{
                                backgroundImage: `url('/assets/img/animations/balao/${icon}.svg')`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: 'center',
                                opacity: 0,
                                width: widthProp / 15
                            }} />
                        )}
                    </div>
                </section>

            </section>
        </section >
    )
}

function Societario({ className, title, height: heightProp = size.innerHeight, width: widthProp = size.innerWidth }: AnimationProps) {
    const [raioXAnimation, setRaioXAnimation] = useState(false);
    const refs = {
        dino: {
            desempregado: useRef<HTMLDivElement>(null),
            raioX: useRef<HTMLDivElement>(null),
            regularizado: useRef<HTMLDivElement>(null)
        },
        cena: useRef<HTMLDivElement>(null)
    }
    const animationDelayPosition = {
        entry: {
            duration: .8,
            delay: 0
        },
        jump: {
            duration: 0.4,
            delay: 0
        },
        runEsteira: {
            duration: 5,
            delay: 0
        },
        regularizado: {
            duration: 6,
            delay: 0
        },
        jumpRegularizado: {
            duration: 0.4,
            delay: 0
        }
    }

    function dinoEntry(dino: HTMLDivElement | null) {
        const animation = gsap.fromTo(dino,
            {
                x: '-=250px',
                y: 0
            },
            {
                x: 40,
                duration: animationDelayPosition.entry.duration,
                // delay: animationDelayPosition.entry.delay
            })

        return animation
    }

    function dinoJump(dino: HTMLDivElement | null) {
        const animation = gsap.to(dino,
            {
                y: '-=100px',
                x: '+=60px',
                duration: animationDelayPosition.jump.duration,
                // delay: animationDelayPosition.jump.delay,
                ease: 'Power1.easeIn',
                onComplete: () => {
                    gsap.to(dino, {
                        x: "+=40px",
                        y: -50,
                        duration: animationDelayPosition.jump.duration - 0.1,
                        // ease: 'Power4.easeOut',
                        ease: 'CustomEase.create("custom", "M0,1,C0,1,0.332,0.845,0.52,0.657,0.809,0.368,1,0,1,0")',
                    })
                }
            })

        return animation
    }

    function dinoJumpRegularizado(dino: HTMLDivElement | null) {
        const animation = gsap.to(dino,
            {
                y: '-=50px',
                x: '+=50px',
                duration: animationDelayPosition.jump.duration,
                delay: animationDelayPosition.jumpRegularizado.delay,
                ease: 'Power1.easeIn',
                onComplete: () => {
                    gsap.to(dino,
                        {
                            x: "+=60px",
                            y: 0,
                            duration: animationDelayPosition.jump.duration - 0.1,
                            ease: 'CustomEase.create("custom", "M0,1,C0,1,0.332,0.845,0.52,0.657,0.809,0.368,1,0,1,0")',
                            onComplete: () => {
                                gsap.to(dino, {
                                    x: '+=206px',
                                    duration: 3
                                })
                            }
                        })
                }
            })

        return animation
    }

    const runDinoNaEsteira = (dino: HTMLDivElement | null) => {
        const animation = gsap.to(dino, {
            x: 420,
            duration: animationDelayPosition.runEsteira.duration,
            // delay: animationDelayPosition.runEsteira.delay,
            onComplete: () => {
                const outAnimation = gsap.to(dino, { opacity: 0, ease: 'none' })

                outAnimation.eventCallback('onStart', () => {
                    setRaioXAnimation(true)
                })
            }
        })

        return animation;
    }

    function dinoRegularizado(dino: HTMLDivElement | null) {
        const animation = gsap.fromTo(dino,
            { x: 420, y: -50, opacity: 1 },
            {
                x: `+=320px`,
                duration: animationDelayPosition.regularizado.duration,
                delay: 1,
                // delay: animationDelayPosition.regularizado.delay,
                ease: 'power4.out',
            })
        return animation
    }

    function startAnimation(dino: any, dinoRegularizadoRef: any, timeline: gsap.core.Timeline) {
        timeline.add(dinoEntry(dino), animationDelayPosition.entry.delay)
        timeline.add(dinoJump(dino), animationDelayPosition.jump.delay)
        timeline.add(runDinoNaEsteira(dino), animationDelayPosition.runEsteira.delay)
        timeline.add(dinoRegularizado(dinoRegularizadoRef), animationDelayPosition.regularizado.delay)
        timeline.add(dinoJumpRegularizado(dinoRegularizadoRef), animationDelayPosition.jumpRegularizado.delay)
        timeline.play()
    }

    function resetAnimation(dino: HTMLDivElement | null, dinoRegularizadoRef: HTMLDivElement | null, timeline: gsap.core.Timeline) {
        setRaioXAnimation(false)

        // Defina as posições iniciais e outras configurações iniciais aqui
        gsap.set(dino, { x: -250, y: 0, opacity: 1 });
        gsap.set(dinoRegularizadoRef, { x: 360, y: -110, opacity: 1 });

        // Reinicie a timeline
        timeline.restart();

        // Configure o loop infinito
        timeline.repeat(-1); // -1 indica um loop infinito
    }

    const defaultWheelsOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    useEffect(() => {
        animationDelayPosition.jump = {
            ...animationDelayPosition.jump,
            delay: animationDelayPosition.entry.duration
        }
        animationDelayPosition.runEsteira = {
            ...animationDelayPosition.runEsteira,
            delay: animationDelayPosition.jump.duration * 2
        }
        animationDelayPosition.regularizado = {
            ...animationDelayPosition.regularizado,
            delay: animationDelayPosition.runEsteira.duration
        }
        animationDelayPosition.jumpRegularizado = {
            ...animationDelayPosition.jumpRegularizado,
            delay: animationDelayPosition.runEsteira.duration
        }

        if (refs.cena) {
            const dino = refs.dino.desempregado.current
            const dinoRegularizadoRef = refs.dino.regularizado.current
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
                backgroundImage: `url('/assets/img/animations/2/esteira.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                // width: widthProp,
                // height: heightProp,
                zIndex: 50,
                scale: 1
            }}
            title={title ?? ''}
            className={cn('flex items-end justify-center', className)}
        >
            {/* DINOS */}
            <section className="dinosArea absolute w-full h-full flex -z-30">
                <div
                    ref={refs.dino.desempregado}
                    style={{
                        backgroundImage: `url('/assets/img/animations/2/dino.png')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        width: '5em',
                        height: '5.5em'
                    }}
                    className="desempregado absolute bottom-0" />
                <div
                    ref={refs.dino.regularizado}
                    style={{
                        backgroundImage: `url('/assets/img/animations/2/dinoReg${Math.floor(Math.random() * 3) + 1}.png')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        width: '5em',
                        height: '5.5em',
                        opacity: 0,
                        zIndex: -20
                    }}
                    className="regularizado absolute bottom-0" />
            </section>
            {/* Portal */}
            <div className="portalWrapper absolute w-full h-full flex justify-center items-center">
                <div
                    style={{
                        backgroundImage: `url('/assets/img/animations/2/portal.png')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center 5px',
                        scale: 1
                    }}
                    className="portal w-2/5 h-[42%] relative flex items-end translate-y-[38%]"
                >
                    <div className="blockRaioX bg-black w-1/4 h-[76%] mx-auto translate-y-[1%]">
                        <div
                            style={{
                                backgroundImage: `url('/assets/img/animations/2/${raioXAnimation ? "greenButton" : "redButton"}.png')`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                width: '25%',
                                height: '25%',
                                scale: 1
                            }}
                            className="button mx-auto -translate-y-[56%] cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {/* Wheels */}
            <div className="wheels absolute w-full h-full border-2 border-orange-500">
                <div className={cn(
                    "container w-[80%] max-w-[680px] h-[6.5%] max-h-[20px] relative -bottom-[88%] bg-gradient-to-t from-[#A1C3C9] to-[#C4D6DC] bg-opacity-80",
                    "z-50 flex justify-center items-center ",
                    "rounded-full translate-x-[0.35rem] mx-auto",
                )}>
                    {Array(20).fill(0).map((_, index) => (
                        <img className="object-contain w-full h-full animate-wheel" src="/assets/img/animations/3/wheel.png" alt="wheel" key={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function Fiscal({ className, title, height: heightProp = size.innerHeight, width: widthProp = size.innerWidth }: AnimationProps) {
    const dinoRef = useRef<HTMLDivElement>(null);
    const spriteRef = useRef<HTMLDivElement>(null);
    const dinoParado = useRef<HTMLDivElement>(null);

    function dinoEntry(dino: HTMLDivElement | null, sprite: HTMLDivElement | null) {
        const tl = gsap.timeline()

        const animation = tl.fromTo(dino,
            { x: -150, y: 0, autoAlpha: 0 },
            {
                autoAlpha: 1,
                duration: 2,
                onComplete: () => {
                    gsap.to(
                        dino,
                        {
                            x: '+=28px',
                            y: '-=5px',
                            duration: 1
                        },
                    ).then(
                        () => gsap.to(dino,
                            {
                                x: '+=30px',
                            }
                        )
                    ).then(
                        () => {
                            gsap.fromTo(sprite, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6 })
                            gsap.fromTo(dinoParado.current, { opacity: 0 }, { opacity: 1, delay: 0.15, duration: 0 })
                        }
                    )
                }
            }
        )

        return animation
    }

    function startAnimation(timeline: gsap.core.Timeline, dino: any, sprite: any) {
        const entrance = dinoEntry(dino, sprite)

        timeline.add(entrance, 0)
    }

    useEffect(() => {
        if (dinoRef.current) {
            const timeline = gsap.timeline({})
            const dino = dinoRef.current
            const sprite = spriteRef.current

            startAnimation(timeline, dino, sprite)
        }
    })

    return (
        <div
            style={{
                backgroundImage: `url('/assets/img/animations/3/predio.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom center',
            }}
            className={cn(className, "w-full h-full animation z-1 relative", "border-2 border-amber-500")}
        >
            <div className={cn("stagger", "w-24 h-full bg-black z-50 absolute left-1/3")} />
            {/* DINO */}
            <div ref={dinoRef} className="absolute bottom-0 left-10 z-30 w-[73px] h-[81px] ">
                <div
                    ref={dinoParado}
                    style={{
                        backgroundImage: `url('/assets/img/animations/3/dino-parado.png')`,
                        width: '73px',
                        height: '81px',
                        opacity: 0
                    }}
                    className="!z-10 absolute"
                />
                <div
                    style={{
                        backgroundImage: `url('/assets/img/animations/3/dino-predio.png')`,
                        width: '73px',
                        height: '81px',
                    }}
                    ref={spriteRef}
                    className="animate-sprite -translate-x-[3px] !z-40 absolute" />
                {/* LASER */}
                <div style={{
                    backgroundImage: `url('/assets/img/animations/3/laser.png')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: '500%',
                    height: '500%',
                    opacity: 1
                }}
                    className="z-50 absolute w-full h-full -right-[480%] -top-[65%]"
                />
            </div>


        </div>


    )
}

export { CriarEmpresa, Societario, Fiscal }