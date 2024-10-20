import '@/components/404/404.scss'
import { MoveLeft } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Nada por aqui',
}

export default function Page404() {
  return (
    <section className="bg-[#eee] h-[100svh] pt-[10vh] w-full overflow-hidden z-[9999]">
      <div className="container">
        <Link className='absolute top-8 left-8' href="/" title='Voltar para o início'><Button variant='outline' className='bg-[#181818] text-white flex gap-2'><MoveLeft /> Voltar para o início</Button></Link>
        <div className="error404page">
          <div className="newcharacter404">
            <div className="chair404"></div>
            <div className="leftshoe404"></div>
            <div className="rightshoe404"></div>
            <div className="legs404"></div>
            <div className="torso404">
              <div className="body404"></div>
              <div className="leftarm404"></div>
              <div className="rightarm404"></div>
              <div className="head404">
                <div className="eyes404"></div>
              </div>
            </div>
            <div className="laptop404"></div>
          </div>
        </div>
        <div className="relative top-40 text-6xl font-extrabold">
          <h1>Página não encontrada :(</h1>
        </div>
      </div>
    </section>
  )
}
