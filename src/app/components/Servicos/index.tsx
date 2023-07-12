/* eslint-disable no-unused-vars */
import { HTMLAttributes, useState } from 'react'
import Image from 'next/image'

import { Icon, ButtonBackgroundShine } from '../Tools'
import style from './Servicos.module.scss'

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

const services: Service[] = [
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

export default function Servicos({ className, ...rest }: ServiceProps) {
  const [selected, setSelected] = useState<number>(0)

  return (
    <section className={className} {...rest}>
      <div className="w-28 rounded-3xl bg-yellow-600 text-center">
        <span className="bg-yellow theme rounded-full p-10">Serviços</span>
      </div>
      <div className="my-8">
        <h1 className="text-5xl font-bold">Como podemos ajudar?</h1>
      </div>
      <nav className={`${style['service-nav']} w-5/5 max-h-max`}>
        <ul className="flex justify-start">
          {services.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setSelected(index)
              }}
              className={selected === index ? style.selectedItem : ''}
            >
              <Icon src={`/assets/img/icons/${item.icon}`} />
              <span>{item.titulo}</span>
            </li>
          ))}
        </ul>
      </nav>
      <section className="infos relative my-8 flex max-h-max flex-1">
        <aside className="left w-1/2">
          <div className="text-area">
            <h3 className="font-semibold">{services[selected].subtitulo}</h3>
            <div className="desc my-4 flex w-3/4 flex-col gap-10">
              {services[selected].texto}
              <ButtonBackgroundShine />
            </div>
          </div>
        </aside>
        <aside className="right mr-10">
          <Image
            src={services[selected].image}
            width={400}
            height={400}
            alt="Monitor-Image"
            className="w-full"
          />
        </aside>
      </section>
    </section>
  )
}
