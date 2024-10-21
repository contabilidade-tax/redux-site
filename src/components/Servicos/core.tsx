import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function CoreServicos() {
    return (
        <>
            <h2 className="block text-4xl font-medium">
                Como podemos te ajudar hoje
                <span className="font-bold text-primary-color">?</span>
            </h2>
            <div className="serviceCard-Container !m-0 flex flex-wrap items-center justify-evenly gap-7 gap-x-7 md:gap-0">
                {/* Abertura de Empresa */}
                <div className="serviceCard-Wrapper h-[420px] max-w-[280px] rounded-3xl bg-[#eee] p-4">
                    <div className="serviceCard flex h-full w-full flex-col items-center justify-between">
                        <Image
                            className="rounded-2xl"
                            src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/servicos/small/inst_redux_1.webp`}
                            width={280}
                            height={224}
                            loading="lazy"
                            alt="Imagem institucional Redux"
                            title="Imagem institucional Redux"
                        />
                        <h3 className="mt-2 block text-base font-bold">
                            Abertura de empresa
                        </h3>
                        <div className="cta mt-2 flex w-full flex-1 flex-col items-center justify-between px-2 text-start font-semibold">
                            <p className="mx-auto block h-[80%] font-medium">
                                Está pensando em abrir sua empresa? Aqui, tornamos esse
                                processo simples e sem complicação.
                            </p>
                            <Link
                                href="/contato"
                                className="self-end"
                                target="_blank"
                                title="Fale com nossos especialistas"
                            >
                                <Button className="h-7 rounded-full bg-primary-color px-5 font-bold text-white">
                                    Saiba mais!
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Regularização */}
                <div className="serviceCard-Wrapper h-[420px] max-w-[280px] rounded-3xl bg-[#eee] p-4">
                    <div className="serviceCard flex h-full w-full flex-col items-center justify-between">
                        <Image
                            className="rounded-2xl"
                            src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/servicos/small/inst_redux_2.webp`}
                            width={280}
                            height={200}
                            loading="lazy"
                            alt="Imagem institucional Redux"
                            title="Imagem institucional Redux"
                        />
                        <h3 className="mt-2 block text-base font-bold">
                            Regularize seu colaborador
                        </h3>
                        <div className="cta mt-2 flex w-full flex-1 flex-col items-center justify-between px-2 text-start font-semibold">
                            <p className="mx-auto block h-[80%] font-medium">
                                Regularize seus colaboradores de forma rápida e segura com
                                nossa equipe especializada.
                            </p>
                            <Link
                                href="/contato"
                                className="self-end"
                                target="_blank"
                                title="Fale com nossos especialistas"
                            >
                                <Button className="h-7 rounded-full bg-primary-color px-5 font-bold text-white">
                                    Saiba mais!
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Redução de Impostos */}
                <div className="serviceCard-Wrapper h-[420px] max-w-[280px] rounded-3xl bg-[#eee] p-4">
                    <div className="serviceCard flex h-full w-full flex-col items-center justify-between">
                        <Image
                            className="max-h-[200px] rounded-2xl"
                            src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/servicos/small/inst_redux_3.webp`}
                            width={280}
                            height={200}
                            loading="lazy"
                            alt="Imagem institucional Redux"
                            title="Imagem institucional Redux"
                        />
                        <h3 className="mt-2 block text-base font-bold">
                            Redução de Impostos
                        </h3>
                        <div className="cta mt-2 flex w-full flex-1 flex-col items-center justify-between px-2 text-start font-semibold">
                            <p className="mx-auto block h-[80%] font-medium">
                                Otimize sua carga tributária e pague apenas o necessário com
                                nossas estratégias.
                            </p>
                            <Link
                                href="/contato"
                                className="self-end"
                                target="_blank"
                                title="Fale com nossos especialistas"
                            >
                                <Button className="h-7 rounded-full bg-primary-color px-5 font-bold text-white">
                                    Saiba mais!
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Assessoria Contábil */}
                <div className="serviceCard-Wrapper h-[420px] max-w-[280px] rounded-3xl bg-[#eee] p-4">
                    <div className="serviceCard flex h-full w-full flex-col items-center justify-between">
                        <Image
                            className="rounded-2xl"
                            src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/servicos/small/inst_redux_4.webp`}
                            style={{ aspectRatio: "auto" }}
                            width={280}
                            height={200}
                            loading="lazy"
                            alt="Imagem institucional Redux"
                            title="Imagem institucional Redux"
                        />
                        <h3 className="mt-2 block text-base font-bold">
                            Assessoria Contábil
                        </h3>
                        <div className="cta mt-2 flex w-full flex-1 flex-col items-center justify-between px-2 text-start font-semibold">
                            <p className="mx-auto block h-[80%] font-medium">
                                Conte com nossa assessoria contábil para garantir uma gestão
                                financeira eficiente e tranquila.
                            </p>
                            <Link
                                href="/contato"
                                className="self-end"
                                target="_blank"
                                title="Fale com nossos especialistas"
                            >
                                <Button className="h-7 rounded-full bg-primary-color px-5 font-bold text-white">
                                    Saiba mais!
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div></>
    )
}