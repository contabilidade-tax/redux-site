'use client'
import Header from '@/components/Header'
import Sobre from '@/components/Sobre/index'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

export default function SobrePage() {

    useEffect(() => {
        const footer = document.getElementsByTagName('footer')[0]
        footer.style.position = 'sticky'
        footer.style.bottom = '0'

        return () => {
            footer.style.position = 'relative'
            footer.style.bottom = '0'
        }
    })

    return (
        <>
            <Header />
            <h1 className='text-5xl font-semibold'>Nossa Equipe!!!</h1>
            <Sobre />
        </>
    )
}
