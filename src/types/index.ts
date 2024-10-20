import React, { CSSProperties, ComponentProps, HTMLAttributes, ReactNode } from 'react'

import { Tab } from '@material-tailwind/react'
import { StaticImageData } from 'next/image'


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

type MenuItensProps = {
  tabs: Tab[]
  state: any
  fullPath: string
  setCurrentPage: (action: { type: string; value: Tab }) => void
  setMenuOpen: (value: boolean) => void
  getGreeting: () => string
  style?: any
  ref?: React.LegacyRef<HTMLUListElement>
  className?: string
}

type InstaPostData = {
  id: string
  caption: string | null
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string
  media_url: string | null
  permalink: string | null
  timestamp: string | null | Date
  username: string | null
}

interface VideoPlayerProps extends ComponentProps<'video'> {
  className?: string
  src: string
  // width?: number
  // height?: number
}

type InstaTokenData = {
  access_token: string
  token_type: string
  expires_in: number | string | Date | bigint
  generated_at: number | string | Date
  permissions?: string | null
}

interface ButtonProps extends ComponentProps<'button'> {
  text?: string
  className?: string
}

interface IconProps extends ComponentProps<'image'> {
  src: string | StaticImageData
  alt?: string
  width?: number
  height?: number
  className?: string
  styles?: object
}

type InstaPostsProps = {
  tokenData?: InstaTokenData
  postsData?: InstaPostData
  children: ReactNode
}

type EmailProps = {
  name: string,
  email: string,
  whatsapp: string,
  cidade: string,
  estado: string,
  message: string,
}

export type {
  ButtonProps,
  IconProps,
  Tab,
  InstaPostData,
  InstaTokenData,
  VideoPlayerProps,
  InstaMidiaProps,
  InstaPostsProps,
  EmailProps,
  MenuItensProps
}
