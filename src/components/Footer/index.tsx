import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, YoutubeIcon } from "lucide-react";

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
      <section className="flex h-full w-full flex-grow flex-col flex-wrap items-start justify-between gap-6 md:flex-row">
        <section className="flex flex-1 items-center justify-around gap-4 md:!scale-100 xsm:scale-90 xsm:gap-5">
          <div className="logo_itens flex h-max w-max max-w-[350px] flex-col items-start justify-center gap-2 px-4">
            <Image
              src="/assets/img/redux/logo_branca.webp"
              title="Logo Redux"
              alt="Logo Redux"
              className="h-[100px] w-36 object-contain grayscale-0"
              quality={100}
              loading="lazy"
              width={144}
              height={100}
            />
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
            </div>
          </div>
        </section>
        <div className="copy flex h-max w-auto max-w-[390px] flex-1 flex-col justify-center gap-4 self-center md:self-auto">
          <Image
            alt="Localização redux"
            title="Localização redux"
            width={300}
            height={250}
            src="https://maps.googleapis.com/maps/api/staticmap?center=-7.20663595199585,-39.30320358276367&maptype=roadmap&zoom=15&scale=2&size=390x250&markers=size:mid%7Ccolor:green%7C-7.206551,%20-39.303191&key=AIzaSyDHMwnYDgd_fedJCX7JQUT3Z4NYccUCsjg"
          />
          <p className="self-center text-xs font-semibold md:text-sm">
            © 2024 Grupo Redux. Todos os direitos reservados.
          </p>
        </div>
      </section>
    </footer>
  );
}
