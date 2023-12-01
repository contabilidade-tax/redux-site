import React, { CSSProperties, ComponentProps, HTMLAttributes, ReactNode, Ref } from 'react'

import services from '@/common/data/services.json'
import { Tab } from '@material-tailwind/react'
import { SwiperRef } from 'swiper/react'
import Image, { StaticImageData } from 'next/image'
import { Prisma } from '@prisma/client'

type Service = (typeof services)[0]

type InstaMidiaProps = {
  // eslint-disable-next-line no-use-before-define
  post: InstaPostData;
  index: number
  styles?: any
  className?: string
}

type Tab = {
  label: string
  src: string
}

// type InstaPostData = {
//   data: {
//     id: string | null
//     caption: string | null
//     media_type: string | null
//     media_url: string | null
//     permalink: string | null
//     timestamp: string | null
//   }[]
// }

type InstaPostData = {
  id: string | null
  caption: string | null
  media_type: string | null
  media_url: string | null
  permalink: string | null
  timestamp: string | null
}

interface VideoPlayerProps extends ComponentProps<'video'> {
  className?: string
  src: string
  // width?: number
  // height?: number
}

type InstaTokenData = {
  access_token: string | null
  token_type: string | null
  expires_in: number | null
  generated_at: number | null
}

type SeletorProps = {
  className?: string
  styles?: any
  state: any
  services: typeof services
  switchTab: (index: number) => void
}

type AnimationProps = {
  className?: string
  title?: string
  width?: number
  height?: number
}

type AnimationTrigger = {
  points: {
    bgIndex: number
    trigger: number
  }[],
  action: () => void
  plusAction?: () => void
}

interface ButtonProps extends ComponentProps<'button'> {
  text?: string
  className?: string
}

interface GameSceneProps {
  className?: string,
  scaleProp: number,
  speedProp: number,
  cwProp: number,
  chProp: number,
  dino: { X: number, Y: number },
  dinoPaused: { X: number, Y: number },
  dinoCar: { X: number, Y: number },
  timeToReset: number
}

interface IconProps extends ComponentProps<'image'> {
  src: string | StaticImageData
  alt?: string
  width?: number
  height?: number
  className?: string
}

interface FullPageLayoutProps {
  className?: string
  id?: string,
  children: React.ReactNode
  homePageIndex?: number
}

interface ServiceProps extends HTMLAttributes<HTMLElement> {
  className?: string | undefined
  scrollerRef?: Ref<SwiperRef> | undefined
}

interface LoadingProps extends HTMLAttributes<HTMLElement> {
  XRef: React.RefObject<HTMLImageElement>
  XAnimatedRef: React.RefObject<HTMLImageElement>
  reduRef: React.RefObject<HTMLImageElement>
  reduAnimatedRef: React.RefObject<HTMLImageElement>
  contabilidadeRef: React.RefObject<HTMLImageElement>
}

interface ServiceNavProps {
  navRef?: React.RefObject<HTMLDivElement>
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

type FigureProps = {
  image: string;
  name: string;
  description: string;
  className?: string;
  style?: CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

type InstaPostsProps = {
  tokenData?: InstaTokenData
  postsData?: InstaPostData
  children: ReactNode
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
  GameSceneProps,
  AnimationTrigger,
  AnimationProps,
  SeletorProps,
  InstaPostData,
  InstaTokenData,
  VideoPlayerProps,
  InstaMidiaProps,
  FigureProps,
  InstaPostsProps
}
