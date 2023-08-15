import React, { useEffect, useState } from 'react'

import styles from './ServiceNav.module.scss'
import { Icon } from '@/components/Tools'
import { ServiceNavProps } from '@/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

SwiperCore.use([Navigation])

export default function ServiceNav({
    navRef,
    state,
    services,
    switchTab,
}: ServiceNavProps) {
    const [isMobileDevice, setIsMobileDevice] = useState<boolean>(
        state.clientInnerWidth,
    )

    useEffect(() => {
        setIsMobileDevice(
            state.clientInnerWidth >= 400 && state.clientInnerWidth <= 640,
        )
    }, [state.clientInnerWidth])

    const handleSlide = (actions: any) => {
        let index: number = actions.actualSlide
        let lastServiceIndex: number = services.length - 1
        switch (actions.event) {
            case 'PREV':
                index === 0 ? index = lastServiceIndex : index--
                switchTab(index)
            case 'NEXT':
                index === lastServiceIndex ? index = 0 : index++
                switchTab(index)
            default:
                console.log("NENHUM DOS EVENTOS")
        }
    }

    return (
        <nav
            ref={navRef}
            className={`w-5/5 max-h-max ${styles.serviceNav} ${styles.notSelect}`}
        >
            {isMobileDevice ? (
                <div className='relative'>
                    <Swiper
                        rewind={true}
                        navigation={{
                            prevEl: '.SW_prevButton',
                            nextEl: '.SW_nextButton',
                        }}
                        className={"swiper" + ` ${styles.swiperModule}`}
                    >
                        {services.map((item, index) => (
                            <SwiperSlide key={index} className='flex justify-center border-2 border-primary-color'>
                                <div className={`mx-auto flex px-6 py-2 gap-4 justify-center items-center w-3/4 ${styles[`item-${index}`]}`}>
                                    <Icon src={`/assets/img/icons/${item.icon}`} width={45} height={45} />
                                    <span>{item.titulo}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className={"swiper-navigation" + ` ${styles.swiperNavigation}`}>
                        <FontAwesomeIcon icon={faAngleLeft} fontSize={30} className={"SW_prevButton" + ` ${styles.prevButton}`} onClick={() => { console.log("FUI CLICADO PREV"); handleSlide({ event: "PREV", actualSlide: state.actualIndex }) }} />
                        <FontAwesomeIcon icon={faAngleRight} fontSize={30} className={"SW_nextButton" + ` ${styles.nextButton}`} onClick={() => { console.log("FUI CLICADO NEXT"); handleSlide({ event: "NEXT", actualSlide: state.actualIndex }) }} />
                    </div>
                </div>
            ) : (
                <ul className={styles.navItens}>
                    {services.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => switchTab(index)}
                            className={`flex justify-start w-full h-auto ${styles[`li-${index}`]} ${item === state.selectedTab ? styles.selectedItem : ''
                                }`}
                        >
                            <Icon src={`/assets/img/icons/${item.icon}`} width={45} height={35} />
                            <span>{item.titulo}</span>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}
