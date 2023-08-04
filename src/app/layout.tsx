import './globals.scss'
import Header from './components/Header'
import { Montserrat_Alternates } from 'next/font/google'
import { ReactNode } from 'react'

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
    <html lang="pt-BR">
      <body className={`${inter.className} screen`}>
        <Header />
        <main className="min-h-screeen flex w-full flex-1 items-center justify-center">
          {/* <FullPageLayout> */}
          {children}
          {/* </FullPageLayout> */}
        </main>
      </body>
    </html>
  )
}
