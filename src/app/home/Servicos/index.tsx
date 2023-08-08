/* eslint-disable no-unused-vars */
import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

import { Icon, ButtonBackgroundShine } from 'src/components/Tools'
import styles from '@/components/Servicos/Servicos.module.scss'

interface ServiceProps extends HTMLAttributes<HTMLElement> {
  className?: string | undefined
}

interface Service {
  titulo: string
  subtitulo: string
  texto: string
  icon: string
  image: string
}

const tabs: Service[] = [
  {
    titulo: 'Quer abrir sua empresa?',
    subtitulo: 'Abrir empresa',
    texto:
      'Abra sua empresa e transforme seu sonho em realidade. Seja seu próprio chefe, conquiste a independência financeira e deixe sua marca no mercado. Venha fazer parte do mundo empreendedor e abrir as portas para um futuro promissor!',
    icon: 'companhia.png',
    image:
      'https://images.unsplash.com/photo-1594402919317-9e67dca0a305?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  },
  {
    titulo: 'Relatórios Gerenciais',
    subtitulo: 'Relatórios',
    texto: `A gestão do Financeiro de forma profissional pode definir o futuro de sua empresa. Emissão de relatórios, notas fiscais, conciliação de contas, fluxo de caixa, fechamento de caixa e muito mais. 
    Terceirização do setor financeiro é uma tendência.`,
    icon: 'relatorio.png',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=815&q=80',
  },
  {
    titulo: 'Emissão de Notas',
    subtitulo: 'Notas',
    texto: `Agilize o processo de emissão, mantenha-se em conformidade com a legislação. Fácil, rápido e seguro. Deixe-nos cuidar das formalidades fiscais para que você possa se dedicar ao que mais importa: sua empresa. 
    Desfrute da praticidade que você merece.`,
    icon: 'nota.png',
    image:
      'https://images.unsplash.com/photo-1634733988138-bf2c3a2a13fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
  },
  {
    titulo: 'Contabilidade Tributária',
    subtitulo: 'Contabilidade Tributária',
    texto: `Abrange o planejamento estratégico acompanhando, de forma singular, cada segmento e atividade empresarial. Utiliza-se da Elisão Fiscal como forma de redução tributária de forma Licita.
    Organizando o pagamento de impostos e definindo as melhores estratégias para gerenciá-los`,
    icon: 'companhia-icon.png',
    image:
      'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
  },
]

gsap.registerPlugin(ScrollTrigger)

export default function Servicos({ className, ...rest }: ServiceProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const imageRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLDivElement>(null)
  const tituloRef = useRef<HTMLDivElement>(null)
  const infoButtonRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // animação dos menus de navegação e seleção da área
  useEffect(() => {
    const sectionElement = document.querySelector('.servicos')

    if (sectionElement && navRef.current) {
      // Adicionada verificação para navRef.current
      const navElement = navRef.current // Adicionada variável temporária
      ScrollTrigger.create({
        trigger: sectionElement,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            navElement.querySelectorAll('li'), // Usando a variável temporária aqui
            { x: '100%', opacity: 0 },
            {
              duration: 0.5,
              x: '0%',
              opacity: 1,
              ease: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
              stagger: 0.1,
            },
          )
          // Adicione mais animações aqui
        },
      })
    }
  }, [])

  useEffect(() => {
    gsap.fromTo(
      textAreaRef.current,
      { autoAlpha: 0, x: -100 },
      { autoAlpha: 1, delay: 0.2, x: 0, duration: 0.7 },
    )
    gsap.fromTo(
      tituloRef.current,
      { autoAlpha: 0, x: -250 },
      { autoAlpha: 1, x: 0, duration: 0.7 },
    )
    gsap.fromTo(
      imageRef.current,
      {
        rotateY: 20,
        rotateX: -35,
        x: 300,
        y: 300,
        skewX: 35,
        skewY: -10,
        opacity: 0,
      },
      {
        duration: 0.6,
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        skewX: 0,
        skewY: 0,
        opacity: 1,
        ease: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
      },
    )
  }, [selectedTab])

  return (
    <section className={className} {...rest}>
      <div className="w-28 rounded-3xl bg-yellow-600 text-center">
        <span className="bg-yellow theme rounded-full p-10">Serviços</span>
      </div>
      <div className="my-8">
        <h1 className="text-5xl font-bold">Como podemos ajudar?</h1>
      </div>
      <nav ref={navRef} className={`${styles['service-nav']} w-5/5 max-h-max`}>
        <ul className="flex justify-start">
          {tabs.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedTab(item)
              }}
              className={item === selectedTab ? styles.selectedItem : ''}
            >
              <Icon src={`/assets/img/icons/${item.icon}`} />
              <span>{item.titulo}</span>
            </li>
          ))}
        </ul>
      </nav>
      <section className="infos relative my-8 flex max-h-max flex-1 gap-20">
        <aside className="left w-1/3">
          <div className="text-area bg-[#20202010] p-5 backdrop-blur-md">
            <h3 ref={tituloRef} className="text-xl font-semibold">
              {selectedTab.subtitulo}
            </h3>
            <div ref={textAreaRef} className="w-4/4 my-4 flex flex-col gap-10">
              {selectedTab.texto}
              <div ref={infoButtonRef}>
                <ButtonBackgroundShine className="w-full" />
              </div>
            </div>
          </div>
        </aside>
        <aside className="right mr-10" ref={imageRef}>
          <Image
            src={selectedTab.image}
            width={400}
            height={400}
            alt="Nav Big Image"
            className="w-full"
          />
        </aside>
      </section>
    </section>
  )
}
