import React, { HTMLAttributes } from 'react'

import services from '@/common/data/services.json'
import { Tab } from '@material-tailwind/react'

type Service = (typeof services)[0]

type Tab = {
  label: string
  src: string
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  id?: string,
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
  state: any,
  mobileState: any,
  services: typeof services
  className?: string
  switchTab: (index: number) => void
}

interface MenuItensProps {
  tabs: Tab[]
  state: any
  setCurrentPage: (action: { type: string; value: Tab }) => void
  setMenuOpen: (value: boolean) => void
  style?: any
  ref?: React.LegacyRef<HTMLUListElement>
  className?: string
}

export type {
  ButtonProps,
  IconProps,
  FullPageLayoutProps,
  Service,
  ServiceProps,
  LoadingProps,
  ServiceNavProps,
  MenuItensProps,
  Tab,
}
