import styles from '@/components/Tools/Tools.module.scss'
import Image from 'next/image'

interface ButtonProps {
  text?: string
  className?: string
}

interface IconProps {
  src: string
  alt?: string
  width?: number
  height?: number
}

export function Icon({
  src,
  alt = 'icon',
  width = 50,
  height = 50,
}: IconProps) {
  return <Image src={src} alt={alt} width={width} height={height} />
}

export function ButtonBackgroundShine({
  text = 'Fale Conosco',
  className,
}: ButtonProps) {
  return (
    <>
      <button
        className={`${styles.animationBackgroundShine} inline-flex h-12 items-center justify-center border bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium text-zinc-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
      >
        {text}
      </button>
    </>
  )
}
