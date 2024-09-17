import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { ReactNode } from "react";
import type { Viewport, Metadata as Meta } from "next";
import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.minimal.css";

import { MobileContextProvider } from "@/common/context/MobileDeviceContext";
import { ToastContainer } from "react-toastify";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
const font = Montserrat({
  subsets: ["latin"],
  weight: ["900", "800", "700", "600", "500", "400", "300"],
  variable: "--font-montserrat",
  preload: true,
});

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

const descriptionText =
  "Oferecemos serviços para empresas e profissionais, incluindo consultoria fiscal, contabilidade geral e planejamento tributário. Precisa abrir o MEI, reduzir impostos ou declarar imposto de renda? Venha conhecer a Redux Contabilidade em Juazeiro do Norte! Não somos obrigação, somos ferramenta para seu sucesso!";

export const metadata: Meta = {
  title: {
    default:
      "Redux Contabilidade Simplificada p/ MEI e Pequenos Empreendedores",
    template: "%s | Redux Contabilidade",
  },
  description: descriptionText,
  keywords: [
    "empresa de contabilidade",
    "contabilidade mei",
    "contabilidade juazeiro do norte",
    "contador em juazeiro",
    "tax contabilidade",
    "contabilidade impostos",
    "assessoria contábil",
    "contabilidade fiscal",
    "contabilidade tributária",
    "consultoria empresarial",
    "declarar imposto de renda",
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

export const ldJson = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Redux Contabilidade",
  description: descriptionText,
  url: "https://contabilidade.gruporedux.com.br",
  logo: "https://contabilidade.gruporedux.com.br/assets/img/redux-logo.svg",
  image: "https://contabilidade.gruporedux.com.br/favicon.ico",
  telephone: "+55-88-2178-7987",
  email: "adm@contabilidade-tax.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av Gov. Virgílio Távora - Fátima, 11",
    addressLocality: "Juazeiro do Norte",
    addressRegion: "CE",
    postalCode: "63020-735",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "Place",
    name: "Juazeiro do Norte, CE, Brasil",
  },
  priceRange: "$$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  openingHours: ["Mo-Fr 08:00-12:00", "Mo-Fr 13:15-18:00"],
  sameAs: [
    "https://www.facebook.com/taxcontabilidade",
    "https://www.instagram.com/reduxcontabilidade",
    "https://www.linkedin.com/company/tax-assessoria-cont%C3%A1bil/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-88-2178-7987",
    contactType: "Customer Support",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  },
  founder: {
    "@type": "Person",
    name: "Redux Contabilidade by Grupo Redux",
    jobTitle: "CEO",
  },
  keywords: [
    "empresa de contabilidade",
    "contabilidade mei",
    "contabilidade juazeiro do norte",
    "contador em juazeiro",
    "tax contabilidade",
    "contabilidade impostos",
    "assessoria contábil",
    "contabilidade fiscal",
    "contabilidade tributária",
    "consultoria empresarial",
    "declarar imposto de renda",
  ],
  author: {
    "@type": "Organization",
    name: "Redux Contabilidade by Grupo Redux",
  },
  publisher: {
    "@type": "Organization",
    name: "Redux Contabilidade",
  },
  verification: {
    google: "gFLlRnT1yQns0_synm8jvFQgqN1cC5eJYz89upK4JZw",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta http-equiv="Cache-Control" content="max-age=7200" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          property="og:image"
          content="https://contabilidade.gruporedux.com.br/favicon.ico"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </head>
      <body
        className={`${font.variable} flex min-h-screen flex-col items-center justify-between`}
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
