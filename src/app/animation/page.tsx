'use client'
import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Lottie from "react-lottie"
import animationData from '@/common/data/animation/cena.json'

import './animation.scss'
import { timeline } from "@material-tailwind/react"

export default function Animation() {
    const [state, setState] = useState({ isPaused: false, isStopped: false })
    const timeline = gsap.timeline({ repeat: -1 })
    const divRef = useRef<HTMLDivElement>(null)
    const p1Ref = useRef<HTMLDivElement>(null)
    const p2Ref = useRef<HTMLDivElement>(null)
    const p3Ref = useRef<HTMLDivElement>(null)
    const p4Ref = useRef<HTMLDivElement>(null)
    const p5Ref = useRef<HTMLDivElement>(null)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    }

    useEffect(() => {
        if (divRef.current) {
            const predios = [p1Ref.current!, p2Ref.current!, p3Ref.current!, p4Ref.current!, p5Ref.current!]

            predios.map((predio: any, index) => {
                const animation = gsap.fromTo(predio,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 2,
                        delay: 2.5 * index,
                        onComplete: () => {
                            gsap.to(predio, { opacity: 0 })
                        }
                    }
                )
                timeline.add(animation, 0)
            })

        }
    }, [])

    useEffect(() => {
        state.isPaused ? timeline.pause() : timeline.play()
    }, [state.isPaused])

    return (
        <section ref={divRef} className="animation center  w-[800px] h-[500px] flex flex-col items-center border-2 border-black">
            <div
                className="w-full h-full">
                <Lottie
                    options={defaultOptions}
                    isStopped={state.isStopped}
                    isPaused={state.isPaused}
                />
            </div>
            <section className="z-10 w-[80px] h-[80px] absolute top-[38%]">
                <div
                    ref={p1Ref}
                    className="w-full h-full absolute"
                    style={{
                        backgroundImage: 'url("/assets/img/animations/1/p1.png")',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0
                    }}
                />
                <div
                    ref={p2Ref}
                    className="w-full h-full absolute"
                    style={{
                        backgroundImage: 'url("/assets/img/animations/1/p2.png")',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center bottom',
                        opacity: 0
                    }}
                />
                <div
                    ref={p3Ref}
                    className="w-full h-full absolute"
                    style={{
                        backgroundImage: 'url("/assets/img/animations/1/p3.png")',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0
                    }}
                />
                <div
                    ref={p4Ref}
                    className="w-full h-full absolute"
                    style={{
                        backgroundImage: 'url("/assets/img/animations/1/p4.png")',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0
                    }}
                />
                <div
                    ref={p5Ref}
                    className="w-full h-full absolute"
                    style={{
                        backgroundImage: 'url("/assets/img/animations/1/p5.png")',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0
                    }}
                />
            </section>
        </section>
    )
}