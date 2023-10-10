import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

import '@/styles/globals.scss'

import { LoadingProvider } from '@/common/context/LoadingContext'
import { MobileContextProvider } from '@/common/context/MobileDeviceContext'
import { Toaster } from "@/components/ui/toaster"
const inter = Montserrat({
  subsets: ['latin'],
  weight: '400',
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
            <main className="min-h-screeen flex w-full flex-col items-center justify-center">
              {children}
            </main>
            <Toaster />
          </body>
        </html>
      </LoadingProvider>
    </MobileContextProvider>
  )
}
