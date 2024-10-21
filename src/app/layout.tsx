import { Montserrat } from "next/font/google";
import { ReactNode } from "react";
import Script from "next/script";
import type { Viewport, Metadata as Meta } from "next";

import { SpeedInsights as VercelSpeedInsights } from "@vercel/speed-insights/next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { GoogleAnalytics, Gtag, MetaPixel } from "@/components/ThirdParty";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "@/styles/globals.scss";

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
  "Precisa abrir o MEI, reduzir impostos ou declarar imposto de renda? Venha para a Redux Contabilidade em Juazeiro do Norte. Oferecemos serviços para empresas e profissionais, incluindo consultoria fiscal, contabilidade geral e planejamento tributário. Não somos obrigação, somos ferramenta para seu sucesso!";
const keywords = [
  "Contabilidade em Juazeiro do Norte e Região",
  "Declarar Imposto de Renda",
  "Contabilidade MEI",
  "Contabilidade Crajubar",
  "Redução de impostos",
  "Contabilidade",
  "Tax",
];

export const metadata: Meta = {
  // title: "Redux Contabilidade Simplificada p/ MEI e Pequenos Empreendedores",
  title: "Redux Contabilidade: Soluções p/ MEI e Pequenos Empreendedores",
  description: descriptionText,
  keywords: keywords,
  authors: { name: "Contabilidade by Grupo Redux" },
  publisher: "https://www.gruporedux.com.br",
  openGraph: {
    type: "website",
    description: descriptionText,
    url: "/",
    emails: ["adm@contabilidade-tax.com.br"],
  },
  formatDetection: { address: true, email: true, telephone: true },
  robots: {
    follow: true,
    index: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

export const ldJson = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Redux Contabilidade",
  description: descriptionText,
  url: "https://contabilidade.gruporedux.com.br",
  logo: `${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/logo_preta.webp`,
  image: `${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/logo_preta.webp`,
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
    name: "Thales Andrey",
    jobTitle: "CEO",
  },
  keywords: keywords,
  author: {
    "@type": "Organization",
    name: "Grupo Redux",
  },
  publisher: {
    "@type": "Organization",
    name: "Redux Contabilidade",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta charSet="UTF-8" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/logo_preta.webp`}
        />
        <link rel="canonical" href="https://contabilidade.gruporedux.com.br" />
        <link
          rel="image_src"
          href={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/logo_preta.webp`}
        />
        <Script
          defer
          strategy="worker"
          id="ld+json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
        <Gtag />
      </head>
      <body
        className={`${font.variable} flex min-h-screen flex-col items-center justify-between`}
      >
        {/* NOSCRIPT GOOGLE */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG_MANAGER}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* Init Content */}
        <Header />
        <main className="Wrapper relative flex w-full flex-1 flex-col items-center justify-between bg-[#fafafa] font-montserrat">
          {children}
        </main>
        <Footer />
        {/* End Content */}
        <GoogleAnalytics />
        <MetaPixel />
        {/* Vercel Analytics */}
        <VercelSpeedInsights />
        <VercelAnalytics />
      </body>
    </html>
  );
}
