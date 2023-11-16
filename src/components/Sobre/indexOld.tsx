'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/effect-flip';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';


import { cn } from "@/lib/utils";

export default function SobrePage() {
    const nameMapping = ["isaac", "thales", "neto"]

    return (
        <section>
            <div className="gerencia flex w-full gap-10">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Swiper
                        key={index}
                        effect={'flip'}
                        grabCursor={true}
                        // pagination={true}
                        // navigation={true}
                        modules={[EffectFlip, Pagination, Navigation]}
                        className={cn("w-[280px] h-[450px]", "flex")}
                    >
                        <SwiperSlide>
                            <div style={{
                                backgroundImage: `url(/assets/img/sobre/card-${nameMapping[index]}.png)`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                width: "100%",
                                height: "100%",
                            }}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <div style={{
                                backgroundImage: `url(/assets/img/sobre/card-${nameMapping[index]}-verso.png)`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                width: "100%",
                                height: "100%",
                            }} className='flex flex-col justify-center'><p className='text-center'>NADA AINDA?</p></div>
                        </SwiperSlide>
                    </Swiper>
                ))}
            </div>
        </section >
    )
}