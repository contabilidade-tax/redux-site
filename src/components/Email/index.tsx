'use client'
import { useSearchParams } from 'next/navigation'
import { Input } from '../ui/input'
import { EmailProps } from '@/types'
import { Html } from "@react-email/html";
import { render as Render } from '@react-email/render';

export function render(data: any) {
  const htmlContent = Render(<Email {...data} />);
  return htmlContent
}


export default function Email({ name, cidade, email, message, estado, whatsapp }: EmailProps) {

  return (
    <section className="w-full bg-white flex flex-1 h-full p-6">
      <section className="w-full border-2 border-gray-600/80 flex flex-col gap-4">
        {/* HEADER */}
        <header className="flex justify-center h-16 w-full p-2"><img src="/assets/img/logo-verde-cortada.png" alt="Logo TAX" className="object-center object-contain" /></header>
        {/* BODY */}
        <div className="flex flex-col justify-between items-center flex-1 px-4 gap-4">
          <h1 className="text-4xl text-center"><strong className="font-bold">{name}</strong>, nos enviou seu currículo para trabalhar conosco através do site!</h1>
          <div className='flex flex-col justify-start gap-6 p-6 border-2 border-blue-gray-200'>
            <h2 className='text-xl self-start font-semibold text-primary-color'>Resumo de seus dados: </h2>
            {/* FIELDS */}
            <div className='dataFields flex flex-col gap-3'>
              <div className='email flex items-center gap-2'>
                <span>Nome: </span>
                <Input type="email" placeholder="Nome" className='border-2 border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={name} />
              </div>
              <div className='email flex items-center gap-2'>
                <span>Email: </span>
                <Input type="text" placeholder="Email" className='border-2 border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={email} />
              </div>
              <div className='email flex items-center gap-2'>
                <span>Whatsapp: </span>
                <Input type="text" placeholder="Whatsapp" className='border-2 border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={whatsapp} />
              </div>
              <div className='email flex items-center gap-2'>
                <span>Cidade: </span>
                <Input type="text" placeholder="Cidade" className='border-2 border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={cidade} />
              </div>
              <div className='email flex items-center gap-2'>
                <span>Estado: </span>
                <Input type="text" placeholder="Estado" className='border-2 border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={estado} />
              </div>
              <div className='email flex items-center gap-2'>
                <span>Mensagem: </span>
                <Input type="text" placeholder="Mensagem" className='border-2 border-black/70 text-black min-w-[250px] font-semibold' disabled={true} defaultValue={message} />
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER  */}
        <footer>
          {/* <p className="text-center text-2xl">Obrigado por nos enviar seu currículo!</p>
          <p className="text-center text-2xl">Apreciamos seu interesse em fazer parte da nossa equipe!</p>
          <p className="text-center text-2xl">Até mais! 👋🏼</p>
          <p className="text-center text-2xl">Equipe TAX Contabilidade</p> */}
          <div className="bg-gray-200 p-5 flex justify-between text-gray-800">
            <div className="mb-6 flex-1 max-w-[50%]">
              <h3 className="text-lg font-semibold mb-2">Sobre</h3>
              <p className="text-sm">Este e-mail é uma comunicação automática gerada no processo de candidatura de um interessado na empresa  através da seção "Trabalhe Conosco" no site da Redux.</p>
            </div>
            {/* <div className="mb-6 flex-1">
              <h3 className="text-lg font-semibold mb-2">Contato</h3>
              <p className="text-sm">203 Fake St. Mountain View, San Francisco, California, USA</p>
              <p className="text-sm">+2 392 3929 210</p>
            </div> */}
            <div>
              <h3 className="text-lg font-semibold mb-2 flex-1">Links Úteis</h3>
              <a href="https://redux.app.br/home" className="block mb-1 text-sm hover:underline">Home</a>
              <a href="https://redux.app.br/home#servicos" className="block mb-1 text-sm hover:underline">Serviços</a>
              <a href="https://redux.app.br/trabalhe-conosco" className="block text-sm hover:underline">Trabalhe conosco</a>
            </div>
          </div>
        </footer>
      </section>
    </section>
  )
}
