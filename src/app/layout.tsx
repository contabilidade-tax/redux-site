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
          {/* <!-- Meta Pixel Code --> */}
          <Script id='meta-pixel'>
            {
              `
              !function(f,b,e,v,n,t,s)
              {
                if(f.fbq) return; 
                n=f.fbq=function() {
                  n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
                  if (!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
                  n.queue=[]; t=b.createElement(e); t.async=!0;
                  t.src=v; s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }
                (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${process.env.NEXT_PUBLIC_FB_PIXEL_ID});
                fbq('track', 'PageView');
                <noscript>
                  <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1"/>
                </noscript>
              `
            }
          </Script>
          {/* <!-- End MetaPixelCode--> */}
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
