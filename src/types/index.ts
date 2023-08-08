import React from 'react'

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

export type { ButtonProps, IconProps, FullPageLayoutProps }
