import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

import '@/styles/globals.scss'

import Header from 'src/components/Header'
import { LoadingProvider } from '@/common/context/LoadingContext'
import { MobileContextProvider } from '@/common/context/MobileDeviceContext'

const inter = Montserrat({
  subsets: ['latin'],
  weight: '300',
})

export const metadata = {
  title: 'Redux Contabilidade',
  description: 'Não somos obrigação. Somos ferramenta!',
  favicon: '/src/app/favicon.ico',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <MobileContextProvider>
      <LoadingProvider>
        <html lang="pt-BR">
          <body className={inter.className}>
            <Header />
            <main className="min-h-screeen flex w-full flex-col items-center justify-center">
              {children}
            </main>
          </body>
        </html>
      </LoadingProvider>
    </MobileContextProvider>
  )
}
