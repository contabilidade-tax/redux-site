import { Montserrat_Alternates } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

import Header from '@/components/Header'
import { LoadingProvider } from '@/common/context/LoadingContext'

const inter = Montserrat_Alternates({
  subsets: ['latin'],
  weight: '300',
})

export const metadata = {
  title: 'Redux Contabilidade',
  description: 'Generated by create next app',
  favicon: '/src/app/favicon.ico',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
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
  )
}
