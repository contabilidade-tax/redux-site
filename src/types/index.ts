import React, { HTMLAttributes } from 'react'

import services from '@/common/data/services.json'

type Service = (typeof services)[0]

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

interface FullPageLayoutProps {
  className?: string
  children: React.ReactNode
}

interface ServiceProps extends HTMLAttributes<HTMLElement> {
  className?: string | undefined
}

interface LoadingProps extends HTMLAttributes<HTMLElement> {
  XRef: React.RefObject<HTMLImageElement>
  XAnimatedRef: React.RefObject<HTMLImageElement>
  reduRef: React.RefObject<HTMLImageElement>
  reduAnimatedRef: React.RefObject<HTMLImageElement>
  contabilidadeRef: React.RefObject<HTMLImageElement>
}

interface ServiceNavProps {
  navRef: React.RefObject<HTMLDivElement>
  state: any
  services: typeof services
  switchTab: (index: number) => void
}

export type {
  ButtonProps,
  IconProps,
  FullPageLayoutProps,
  Service,
  ServiceProps,
  LoadingProps,
  ServiceNavProps,
}
