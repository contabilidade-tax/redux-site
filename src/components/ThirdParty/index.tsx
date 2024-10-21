import Script from 'next/script';

function MetaPixel() {
    return (
        <>
            {/* Meta Pixel Code */}
            <Script
                id="meta-pixel"
                strategy="afterInteractive" // Usar 'afterInteractive' para garantir que o script seja carregado após a interação
            >
                {`
          !function(f,b,e,v,n,t,s) {
            if(f.fbq) return; 
            n=f.fbq=function() {
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq=n; 
            n.push=n; n.loaded=!0; n.version='2.0';
            n.queue=[]; 
            t=b.createElement(e); 
            t.async=!0;
            t.src=v; 
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', ${String(process.env.NEXT_PUBLIC_FB_PIXEL_ID)});
          fbq('track', 'PageView');
        `}
            </Script>

            {/* NOSCRIPT FB */}
            <noscript>
                <img
                    alt="fb-noscript"
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${String(process.env.NEXT_PUBLIC_FB_PIXEL_ID)}&ev=PageView&noscript=1`}
                />
            </noscript>
        </>
    );
}

function GoogleAnalytics() {
    return (
        //  Google Analytics
        <Script async id="analytics" >
            {`
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
     
                   gtag('config', 'AW-16721885854');
               `}
        </Script >
    )
}

function Gtag() {
    return (
        <>
            {/* <!-- GTAG --> */}
            <Script
                async
                id="g-tag"
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=AW-16721885854"
            ></Script>
            {/* <!-- Google Tag Manager --> */}
            <Script async id="gtm">
                {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer', '${String(
                    process.env.NEXT_PUBLIC_GTAG_MANAGER
                )}');
                `}
            </Script>
            {/* <!-- End Google Tag Manager --> */}
        </>
    )
}

export {
    MetaPixel, GoogleAnalytics, Gtag
}