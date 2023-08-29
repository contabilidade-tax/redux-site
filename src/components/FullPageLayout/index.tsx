'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { FullPageLayoutProps } from '@/types'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Pagination, Mousewheel, EffectCreative } from 'swiper/modules'
import { gsap } from 'gsap'

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/mousewheel';
import 'swiper/scss/effect-creative';

import './FullPageLayout.scss'

import { useMobileContext } from '@/common/context/MobileDeviceContext'

function FullPageLayout({ className, children }: FullPageLayoutProps) {
  const { handleHomePageIndex } = useMobileContext()
  const isHomePage = usePathname() === '/home'

  useEffect(() => {
    // Converter children em um array real para usar forEach
    React.Children.toArray(children)

    gsap.fromTo('.Layout', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
  })

  return (
    <Swiper
      className={`Layout h-[90vh] w-full opacity-0 ${className} swiperWrapperRef`}
      pagination={{
        type: 'progressbar',
      }}
      slidesPerView={1}
      mousewheel={true}
      modules={[Mousewheel, Pagination, EffectCreative]}
      direction={'vertical'}
      spaceBetween={30}
      onSlideChange={(swiper) => (isHomePage) ? handleHomePageIndex(swiper.activeIndex) : null}
      effect='creative'
      creativeEffect={{
        prev: {
          opacity: 0,
          translate: [0, '-20%', -10],
        },
        next: {
          translate: [0, '100%', 0],
        },
      }}
    >
      {
        React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} className={'h-full w-full hidden mt-2'}>
            {child}
          </SwiperSlide>
        ))
      }
    </Swiper >
  )
}

export default FullPageLayout
