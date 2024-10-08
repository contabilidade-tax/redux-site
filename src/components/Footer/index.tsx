import { cn } from "@/lib/utils";
import { Facebook, Instagram, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import "@/components/Footer/footer.scss";

export default function Footer({ className }: { className?: string }) {
  const linkStyle = "bg-[#fafafa] rounded-full p-2";
  return (
    <footer
      className={cn(
        "footer",
        className,
        "relative !bottom-0 z-10 h-[4%] w-full bg-[#202020] text-white shadow-2xl shadow-black lg:min-h-[160px]",
        "flex flex-col justify-around py-4 text-sm font-medium md:py-6"
      )}
    >
      {/* <div className="wrapper flex flex-col w-full h-full justify-center items-center gap-5"> */}
      <section className="flex h-full w-full flex-grow flex-col items-start justify-between gap-6 xl:flex-row">
        <section className="flex flex-1 items-center justify-around gap-4 md:!scale-100 xsm:scale-90 xsm:gap-5">
          <div className="logo_itens flex h-max w-max max-w-[350px] flex-col items-start justify-center gap-2 px-4">
            <Image
              src="/assets/img/redux/logo_branca.webp"
              title="Logo Redux"
              alt="Logo Redux"
              className="h-[100px] w-36 object-contain grayscale-0"
              quality={100}
              loading="eager"
              width={144}
              height={100}
            />
            {/* <Image src="/assets/img/re" alt="logo-cortada" className="grayscale-0 w-inherit h-[50px] object-contain" width={100} height={100} /> */}
            <div className="links flex h-max w-max flex-wrap items-center justify-center gap-2">
              <Link
                className={linkStyle}
                href="https://www.instagram.com/reduxcontabilidade/"
                title="Visite nosso Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram fill="#CCC" color="#000" />
              </Link>
              <Link
                className={linkStyle}
                href="https://www.facebook.com/taxcontabilidade/?locale=pt_BR"
                target="_blank"
                rel="noreferrer"
                title="Estamos no Facebook"
              >
                <Facebook fill="#CCC" color="#000" />
              </Link>
              <Link
                className={linkStyle}
                title="Veja nosso youtube"
                href="https://www.youtube.com/@taxcontabilidadde"
                target="_blank"
                rel="noreferrer"
              >
                <YoutubeIcon fill="#CCC" color="#000" />
              </Link>
            </div>
          </div>
          <div className="contato flex-1 md:max-w-lg">
            <h3 className="font-bold md:!text-lg xsm:text-base">Contate-nos</h3>
            <div className="mt-2 space-y-1 md:!text-base xsm:text-sm">
              <p>- Av. Virgílio Távora, 11 - Fátima, Juazeiro do Norte-CE</p>
              <Link
                className="block"
                target="_blank"
                title="Mande uma mensagem para nosso time comercial"
                href="mailto:comercial@contabilidade-tax.com.br"
              >
                - comercial@contabilidade-tax.com.br
              </Link>
              <Link title="Fale conosco" target="_blank" href="/contato">
                - (88) 99696-0337
              </Link>
              {/* <li>1111</li> */}
            </div>
          </div>
        </section>
        <div className="copy h-max w-auto max-w-[390px] flex-1 font-semibold md:!self-end md:!text-sm xsm:self-center xsm:text-xs">
          <p>© 2024 Grupo Redux. Todos os direitos reservados.</p>
        </div>
      </section>
      {/* <div className= w-full h-[1.5px]"></div> */}
      {/* </div> */}
    </footer>
  );
}
