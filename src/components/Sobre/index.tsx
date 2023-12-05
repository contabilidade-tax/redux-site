'use client'

import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { FigureProps } from '@/types'
import styles from './Sobre.module.scss'

function Figure({ image, name, description, className, style: styleProps }: FigureProps) {
  return (
    <div style={styleProps} className={cn("flex flex-col items-center justify-center", className)}>
      <img src={image} alt={name} className="object-contain max-h-[300px]" />
      <h3 className="md:!text-2xl font-semibold xsm:text-sm">{name}</h3>
      <h4 className="md:!text-xl xsm:text-base">{description}</h4>
    </div>
  )
}


export default function Sobre() {
  const figureContents = [
    { image: 'isaac', name: 'Isaac Pinheiro', description: 'CFO' },
    { image: 'thales', name: 'Thales Andrey', description: 'CEO' },
    { image: 'neto', name: 'Clodomiro Neto', description: 'COO' },
    { image: 'fran', name: 'Francylanio Araújo', description: 'Tributarista' },
    { image: 'richard', name: 'Richard Oliveira', description: 'Tributarista' },
    { image: 'junior', name: 'Junior Luiz', description: 'Tributarista' },
    { image: 'aline', name: 'Aline Belarmino', description: 'Analista Societário' },
    { image: 'joao', name: 'João Ferreira', description: 'Analista Contábil' },
    { image: 'sarah', name: 'Sarah Farias', description: 'Analista Pessoal' },
    { image: 'lucas', name: 'José Lucas', description: 'Desenvolvedor FullStack' },
    { image: 'alisson', name: 'Alisson Santos', description: 'Marketing' },
    { image: 'jose', name: 'José Pinheiro', description: 'Desenvolvedor FullStack' },
  ]

  return (
    <section className="flex flex-wrap justify-center items-center md:!gap-5 md:!py-5 xsm:gap-12 xsm:py-3">
      {figureContents.map((figure, index) => (
        <Figure
          key={index}
          image={`/assets/img/sobre/${figure.image}.png`}
          name={figure.name}
          description={figure.description}
          className={cn(styles.figure, 'xsm:scale-110 md:!scale-100')}
          style={{ flexBasis: '30%' }}
        />
      ))}
    </section>
  )
}