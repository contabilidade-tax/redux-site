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
          <body className='flex justify-between flex-col min-h-screen items-center'>
            <Header />
            <main className="flex-1 flex w-full flex-col items-center justify-between relative Wrapper bg-[#fafafa]">
              {children}
            </main>
            <Footer />
            <Toaster />
          </body>
        </html>
      </LoadingProvider>
    </MobileContextProvider>
  )
}
