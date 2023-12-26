import { redirect } from "next/navigation";
import Script from "next/script";

export default function Servicos() {
  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Bom dia";
    } else if (hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  }

  return (
    <>
      {/* GTAG */}
      <div id='gtag'>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TAG}`}></Script>
        <Script id='google-analytics'>
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', ${process.env.NEXT_PUBLIC_GA_TAG});
              `}
        </Script>
      </div>
      {/* GTAG END */}
      redirect(`https://api.whatsapp.com/send?phone=5588999660188&text=${encodeURIComponent(`Ola ${getGreeting()}, gostaria de saber mais sobre seus serviços`)}`)
    </>
  )

}
