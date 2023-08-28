'use client'
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'

import { FullPageLayoutProps } from '@/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Mousewheel } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function FullPageLayout({ className, id, children }: FullPageLayoutProps) {

  useLayoutEffect(() => {
    //Converter children em um array real para usar forEach
    React.Children.toArray(children)
  })


  return (
    <Swiper
      id={id}
      className={`h-[90vh] ${className}`}
      pagination={{
        type: 'progressbar',
      }}
      slidesPerView={1}
      mousewheel={true}
      modules={[Mousewheel, Pagination]}
      direction={'vertical'}
      spaceBetween={30}
      onAnimationStart={() => console.log("Animou")}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index} className='overflow-hidden'>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default FullPageLayout
