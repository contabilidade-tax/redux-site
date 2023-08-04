'use client'
import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import styles from '@/components/FullPageLayout/fullPageLayout.module.scss'

gsap.registerPlugin(ScrollTrigger)

interface FullPageLayoutProps {
  className?: string
  children: React.ReactNode
}

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
    <div className={`${styles.scrollContainer} ${className}`}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          className={`${styles.fullPageSection} ${styles.scrollSection} section-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default FullPageLayout
