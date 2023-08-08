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

export type {
  ButtonProps,
  IconProps,
  FullPageLayoutProps,
  Service,
  ServiceProps,
}
