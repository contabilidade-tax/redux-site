import Image from 'next/image'
import { ButtonProps, IconProps } from '@/types'

import styles from './Tools.module.scss'

export function Icon({
  src,
  alt = 'icon',
  width = 50,
  height = 50,
  className
}: IconProps) {
  return (
    <Image src={src} loading="lazy" alt={alt} width={width} height={height} className={className} />
  )
}
export function ButtonBackgroundShine({
  text = 'Fale Conosco',
  className,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        {...rest}
        className={`${styles.animationBackgroundShine} text-zinc-100 focus:ring-slate-400 focus:ring-offset-slate-50 inline-flex h-12 items-center justify-center border bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      >
        {text}
      </button>
    </>
  )
}
