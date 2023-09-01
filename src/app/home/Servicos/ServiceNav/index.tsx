import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import { ServiceNavProps } from '@/types'
import { Icon } from '@/components/Tools'
import styles from './ServiceNav.module.scss'


SwiperCore.use([Navigation])

export default function ServiceNav({
  navRef,
  state,
  mobileState,
  services,
  switchTab,
  className,
}: ServiceNavProps) {
  const SERVICES_LEN = services.length - 1

  const handleSlide = (actions: any) => {
    let index: number = actions.actualSlide
    const lastServiceIndex: number = SERVICES_LEN
    switch (actions.event) {
      case 'PREV':
        index === 0 ? (index = lastServiceIndex) : index--
        return switchTab(index)
      case 'NEXT':
        index === lastServiceIndex ? (index = 0) : index++
        return switchTab(index)
      case 'SWIPER_ON_CHANGE':
        return switchTab(actions.actualSlide)
    }
  }


  return (
    <nav ref={navRef} id='navRef' className={`w-5/5 max-h-max ${styles.serviceNav} ${className}`}>
      {mobileState.isMobileDevice ? (
        <div className="relative">
          <Swiper
            rewind={true}
            navigation={{
              prevEl: '.SW_prevButton',
              nextEl: '.SW_nextButton',
            }}
            className={'swiper' + ` ${styles.swiperModule}`}
            onSlidePrevTransitionStart={(swiper) => {
              handleSlide({
                event: 'SWIPER_ON_CHANGE',
                actualSlide: swiper.activeIndex,
              })
            }}
            onSlideNextTransitionStart={(swiper) => {
              handleSlide({
                event: 'SWIPER_ON_CHANGE',
                actualSlide: swiper.activeIndex,
              })
            }}
          >
            {services.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center border-2 border-primary-color"
              >
                <div
                  className={`mx-auto flex w-3/4 min-w-[60px] items-center justify-center gap-3 px-5 py-2 ${styles[`item-${index}`]
                    }`}
                >
                  <Icon
                    src={`/assets/img/icons/${item.icon}`}
                    width={40}
                    height={40}
                  />
                  <span>{item.titulo}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={'swiper-navigation' + ` ${styles.swiperNavigation}`}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              fontSize={30}
              className={'SW_prevButton' + ` ${styles.prevButton}`}
              onClick={() => {
                handleSlide({ event: 'PREV', actualSlide: state.actualIndex })
              }}
            />
            <FontAwesomeIcon
              icon={faAngleRight}
              fontSize={30}
              className={'SW_nextButton' + ` ${styles.nextButton}`}
              onClick={() => {
                handleSlide({ event: 'NEXT', actualSlide: state.actualIndex })
              }}
            />
          </div>
        </div>
      ) : (
        <ul className={styles.navItens}>
          {services.map((item, index) => (
            <li
              key={index}
              onClick={() => switchTab(index)}
              className={`flex h-auto w-full justify-start ${styles[`li-${index}`]
                } ${item === state.selectedTab ? styles.selectedItem : ''}`}
            >
              <Icon
                src={`/assets/img/icons/${item.icon}`}
                width={45}
                height={35}
              />
              <span>{item.titulo}</span>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
