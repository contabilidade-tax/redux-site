'use client'
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Linkedin, Youtube, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import style from '@/components/Footer/Footer.module.scss';
import { useLoading } from "@/common/context/LoadingContext";

export default function Footer({ className }: { className?: string }) {
    const { isLoading, setIsLoading } = useLoading()
    const linkStyle = 'bg-[#fafafa] rounded-full p-2'
    return (
        <footer className={cn(
            style.footer,
            className,
            "h-[4%] lg:min-h-[160px] w-full text-white bg-[#202020] shadow-2xl shadow-black z-10 relative !bottom-0",
            "flex flex-col justify-around font-medium text-sm py-4 md:py-6",
            { 'hidden': isLoading }
        )}>
            {/* <div className="wrapper flex flex-col w-full h-full justify-center items-center gap-5"> */}
            <section className="w-full h-full flex justify-between items-start flex-col xl:flex-row flex-grow gap-6">
                <section className="flex-1 flex justify-around items-center gap-4">
                    <div className="logo_itens flex flex-col w-max gap-2 max-w-[350px] px-4 h-max justify-center items-start">
                        <Image src="/assets/img/logo-branca-cortada.svg" alt="logo-cortada" className="grayscale-0 w-inherit h-[50px] object-contain" width={100} height={100} />
                        <div className="links flex flex-wrap justify-center items-center w-max h-max gap-2">
                            <Link className={linkStyle} href="https://www.instagram.com/taxcontabilidade.adm/" target="_blank" rel="noreferrer">
                                <Instagram fill="#CCC" color="#000" />
                            </Link>
                            <Link className={linkStyle} href="https://www.facebook.com/taxcontabilidade/?locale=pt_BR" target="_blank" rel="noreferrer">
                                <Facebook fill="#CCC" color="#000" />
                            </Link>
                            <Link className={linkStyle} href="https://www.youtube.com/@taxcontabilidadde" target="_blank" rel="noreferrer">
                                <YoutubeIcon fill="#CCC" color="#000" />
                            </Link>
                        </div>
                    </div>
                    <div className="contato w-max">
                        <h3 className="font-bold text-lg">Contate-nos</h3>
                        <div className="space-y-1 mt-2">
                            <p>- Av. Virgílio Távora, 11 - Fátima, Juazeiro do Norte-CE</p>
                            <p>- comercial@contabilidade-tax.com.br</p>
                            {/* <li>1111</li> */}
                        </div>
                    </div>
                </section>
                <div className="copy flex-1 max-w-[390px] w-auto h-max self-end font-semibold"><p>© 2023 Tax Contabilidade. Todos os direitos reservados.</p></div>
            </section>
            {/* <div className= w-full h-[1.5px]"></div> */}
            {/* </div> */}
        </footer>
    )
}