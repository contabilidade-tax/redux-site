'use client'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { FullPageLayoutProps } from '@/types'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FullPageLayout.module.scss'

gsap.registerPlugin(ScrollTrigger)

const FullPageLayout: React.FC<FullPageLayoutProps> = ({
  className,
  children,
}) => {
  // Função para adicionar efeito parallax
  const addParallaxEffect = (index: number) => {
    gsap.to(`.section-${index}`, {
      y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: `.section-${index}`,
        scrub: true,
      },
    })
  }

  useEffect(() => {
    // Converter children em um array real para usar forEach
    React.Children.toArray(children).forEach((_, index) =>
      addParallaxEffect(index),
    )
  }, [children])

  return (
    <div className={`h-[90vh] ${styles.scrollContainer} ${className}`}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          className={`section-${index} ${styles.fullPageSection} ${styles.scrollSection}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default FullPageLayout
