'use client'

import { useLoading } from '@/common/context/LoadingContext'
import Loading from '@/components/Loading'
import { useEffect } from 'react'

export default function TrabalheConosco() {
  const { isLoading, setIsLoading } = useLoading()
  const waitDuration = 5000 // 5 segundos
  const animationDuration = 3800 // 3.5 segundos

  useEffect(() => {
    let timeRemaining = waitDuration
    // Loga a contagem regressiva a cada segundo
    const interval = setInterval(() => {
      timeRemaining -= 1000 // Reduz um segundo
      console.log(`Tempo até a animação: ${timeRemaining / 1000}s`)
    }, 1000)

    // Aguarde 5 segundos antes de iniciar a animação
    const waitTimer = setTimeout(() => {
      clearInterval(interval) // Limpa a contagem regressiva
      console.log('Iniciando animação...')

      setIsLoading(true)

      // Agende o término da animação após 3.5 segundos
      const animationTimer = setTimeout(() => {
        setIsLoading(false)
      }, animationDuration)

      return () => clearTimeout(animationTimer) // Limpe o timer da animação se o componente for desmontado antes do tempo acabar
    }, waitDuration)

    // Limpe o timer de espera e o intervalo se o componente for desmontado antes do tempo acabar
    return () => {
      clearTimeout(waitTimer)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-slate-950">
            Venha fazer parte desta equipe nota 10
          </h1>
        </div>
      )}
    </>
  )
}
