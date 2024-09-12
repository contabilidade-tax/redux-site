'use client'
import ContactForm from './Form'

export default function TrabalheConosco() {

  return (
    <div style={{
      backgroundImage: 'url(/assets/img/bg/dinoTrabalheConoscoNatal.png)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: 'center',
      backgroundPositionY: '80%',
    }}
      className='flex justify-center items-center flex-1 w-full p-6'>
      <ContactForm className='bg-[#fff] border-2 drop-shadow-custom border-gray-400 p-6 rounded-2xl flex flex-col z-50 max-h-[52rem] xsm:min-w-[50%] md:!min-w-[30rem]' />
    </div >
  )

}