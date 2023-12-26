// import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

import '@/styles/globals.scss'
import "react-toastify/dist/ReactToastify.minimal.css";

import { LoadingProvider } from '@/common/context/LoadingContext'
import { MobileContextProvider } from '@/common/context/MobileDeviceContext'
// import { Toaster } from "@/components/ui/toaster"
import { ToastContainer } from 'react-toastify';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
// const inter = Montserrat({
//   subsets: ['latin'],
//   weight: '400',
// })

const montserrat = localFont({
  src: [
    {
      path: './fonts/body/Montserrat-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/body/Montserrat-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/body/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/body/Montserrat-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/body/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/body/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/body/Montserrat-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/body/Montserrat-Italic.ttf',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-montserrat',
})

export const metadata = {
  title: 'Redux Contabilidade',
  description: 'Não somos obrigação. Somos ferramenta!',
  favicon: '/src/app/x.png',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <MobileContextProvider>
      <LoadingProvider>
        <html lang="pt-BR">
          <head>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1HJLSSGPVP"></Script>
            <Script id='google-analytics'>
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-1HJLSSGPVP');
              `}
            </Script>
          </head>
          {/* <body className={inter.className}> */}
          <body className={`${montserrat.variable} flex justify-between flex-col min-h-screen items-center`}>
            <Header />
            <main className="flex-1 flex w-full flex-col items-center justify-between relative Wrapper bg-[#fafafa] font-montserrat">
              {children}
              <ToastContainer />
            </main>
            <Footer />
            <SpeedInsights />
            <Analytics />
            {/* <Toaster /> */}
          </body>
        </html>
      </LoadingProvider>
    </MobileContextProvider>
  )
}
