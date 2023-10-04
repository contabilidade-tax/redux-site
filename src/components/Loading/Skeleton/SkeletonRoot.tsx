'use client'

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"

type SkeletonRootProps = {
    children: React.ReactNode
    className?: string
}

export default function SkeletonRoot({ children, className }: SkeletonRootProps) {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        return () => {
            gsap.fromTo(divRef,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 3 }
            )
        }
    })

    return (
        <div ref={divRef} className={cn(className)}>
            {children}
        </div>
    )
}