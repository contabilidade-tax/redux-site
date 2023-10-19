'use client'
import Header from '@/components/Header'
import ContactForm from './Form'

import { useEffect } from 'react'

export default function TrabalheConosco() {

  useEffect(() => {
    document.getElementsByTagName('main')[0].style.backgroundColor = '#CCC'
    return () => {
      document.getElementsByTagName('main')[0].style.backgroundColor = '#FAFAFA'
    }
  })

  return (
    <>
      <Header />
      <ContactForm className='bg-[#ffffff] p-6 rounded-2xl drop-shadow-customPrimary' />
    </>
  )
}

// export default function TrabalheConosco() {
//   const extension = 'jpeg'
//   const image = 'assets/img/slide'

//   return (
//     <>
//       <Header className='!bg-[#ffffff20] backdrop-blur-md absolute top-0 text-white' />
//       <Swiper
//         spaceBetween={30}
//         centeredSlides={true}
//         speed={1000}
//         fadeEffect={{ crossFade: true }}
//         modules={[EffectFade, Autoplay]}
//         effect={"fade"}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false
//         }}
//         loop={true}
//         className='w-full h-screen absolute mx-auto bottom-0'
//       >
//         {Array.from({ length: 6 }).map((i, index) => {
//           return <SwiperSlide className='w-full h-full' key={index}><img src={`${image}/${index + 1}.${extension}`} alt='slide' className='w-full h-full brightness-[.4] object-cover' /></SwiperSlide>;
//         })}
//       </Swiper>
//       <div className="container drop-shadow-customPrimary bg-[#ffffff10] backdrop-blur-md max-w-[550px] right-20 rounded-xl absolute mx-auto z-50 my-10 border-[0.5px] w-1/4 max-h-2/3 min-h-1/2 px-6 py-2 border-white flex justify-between">
//         <ContactForm className="flex flex-col justify-center gap-1 text-white" />
//       </div>
//       <div className='h-max w-1/2 absolute left-20 my-auto z-50'>
//         <h1 className='font-bold text-8xl text-white'>Aqui é top! E isto é uma frase de efeito!!!</h1>
//       </div>
//     </>
//   )
// }
