import React, { HTMLAttributes } from 'react'

import services from '@/common/data/services.json'

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

type Service = (typeof services)[0]

interface LoadingProps extends HTMLAttributes<HTMLElement> {
  XRef: React.RefObject<HTMLImageElement>
  XAnimatedRef: React.RefObject<HTMLImageElement>
  reduRef: React.RefObject<HTMLImageElement>
  reduAnimatedRef: React.RefObject<HTMLImageElement>
  contabilidadeRef: React.RefObject<HTMLImageElement>
  propRef?: React.RefObject<HTMLDivElement>
}

export type {
  ButtonProps,
  IconProps,
  FullPageLayoutProps,
  Service,
  ServiceProps,
  LoadingProps,
}
