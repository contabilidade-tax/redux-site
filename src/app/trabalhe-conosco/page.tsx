import Header from '@/components/Header'
import ContactForm from './Form'

export default function TrabalheConosco() {
  return (
    <main className='w-full h-full flex flex-col justify-center items-center'>
      <Header />
      <ContactForm className='flex flex-col justify-center my-10 border-[1px] border-black p-6 gap-4' />
    </main>
  )
}
