// import { Montserrat } from 'next/font/google'
import localFont from "next/font/local";
import { ReactNode } from "react";
import type { Metadata as Meta } from "next";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.minimal.css";

import { MobileContextProvider } from "@/common/context/MobileDeviceContext";
// import { Toaster } from "@/components/ui/toaster"
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// const inter = Montserrat({
//   subsets: ['latin'],
//   weight: '400',
// })

export const montserrat = localFont({
  src: [
    {
      path: "./fonts/body/Montserrat-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/body/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/body/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/body/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/body/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/body/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/body/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/body/Montserrat-Italic.ttf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata: Meta = {
  title: {
    default:
      "Contabilidade Simplificada para MEI e Pequenos Empreendedores | Redux Contabilidade",
    template: "%s | Redux Contabilidade",
  },
  description:
    "Precisa abrir o MEI, reduzir impostos, ou imposto de renda? Venha conhecer a Redux Contabilidade! Não somos obrigação, somos ferramenta!",
  keywords: [
    "empresa de contabilidade",
    "contabilidade mei",
    "contabilidade juazeiro do norte",
    "escrituração contábil",
    "contabilidade impostos",
    "assessoria contábil",
    "contabilidade fiscal",
    "contabilidade tributária",
    "consultoria empresarial",
    "imposto de renda",
  ],
  appleWebApp: true,
  authors: { name: "Redux Contabilidade by Grupo Redux" },
  publisher: "/",
  verification: { google: "gFLlRnT1yQns0_synm8jvFQgqN1cC5eJYz89upK4JZw" },
  openGraph: {
    type: "website",
    description:
      "Precisa abrir o MEI, reduzir impostos, ou imposto de renda? Venha conhecer a Redux Contabilidade! Não somos obrigação, somos ferramenta.",
    url: "/",
    emails: ["adm@contabilidade-tax.com.br"],
  },
  formatDetection: { address: true, email: true, telephone: true, url: true },
  robots: { follow: true, index: true, "max-snippet": -1 },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta http-equiv="Cache-Control" content="max-age=36000" />
        <meta charSet="utf-8" />
      </head>
      <body
        className={`${montserrat.variable} flex min-h-screen flex-col items-center justify-between`}
      >
        <Header />
        <MobileContextProvider>
          <main className="Wrapper relative flex w-full flex-1 flex-col items-center justify-between bg-[#fafafa] font-montserrat">
            {children}
            <ToastContainer />
          </main>
        </MobileContextProvider>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
      {/* <!-- GTAG --> */}
      <div id="gtag">
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TAG}`}
        ></Script>
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', ${process.env.NEXT_PUBLIC_GA_TAG});
              `}
        </Script>
      </div>
      {/* <!-- End GTAG --> */}
      {/* <!-- Meta Pixel Code --> */}
      <Script id="meta-pixel">
        {`
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
                fbq('init', ${String(process.env.NEXT_PUBLIC_FB_PIXEL_ID)});
                fbq('track', 'PageView');
                <noscript>
                  <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${String(
                    process.env.NEXT_PUBLIC_FB_PIXEL_ID
                  )}&ev=PageView&noscript=1"/>
                </noscript>
              `}
      </Script>
      {/* <!-- End MetaPixelCode--> */}
    </html>
  );
}
