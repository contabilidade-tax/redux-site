// import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

import '@/styles/globals.scss'

import { LoadingProvider } from '@/common/context/LoadingContext'
import { MobileContextProvider } from '@/common/context/MobileDeviceContext'
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
// const inter = Montserrat({
//   subsets: ['latin'],
//   weight: '400',
// })

export const metadata = {
  title: 'TAX Contabilidade',
  description: 'Não somos obrigação. Somos ferramenta!',
  favicon: '/src/app/x.png',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <MobileContextProvider>
      <LoadingProvider>
        <html lang="pt-BR">
          {/* <body className={inter.className}> */}
          <body className='h-screen w-full flex flex-col'>
            <main className="min-h-screeen flex-1 flex w-full flex-col items-center justify-between relative Wrapper bg-[#fafafa]">
              {/* <Header /> */}
              {children}
              <Footer />
            </main>
            <Toaster />
          </body>
        </html>
      </LoadingProvider>
    </MobileContextProvider>
  )
}
