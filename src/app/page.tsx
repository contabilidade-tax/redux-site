import { Suspense } from "react";
//
import { cn } from "@/lib/utils";
import "@/app/page.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InstaRecentPosts from "@/components/InstaRecentPosts";
import ServicosComponent from "@/components/Servicos";

export default function Page() {
  return (
    <Suspense>
      {/* Apresentação */}
      <section
        id="presentation"
        style={{
          backgroundImage: `image-set(
            url('${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/capa_redux.webp') 1x,
            url('${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/capa_redux_smaller.webp') 0.5x
          )`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className={cn(
          "h-[100svh] w-full lg:h-[75svh]",
          "flex flex-col items-center justify-evenly"
        )}
      >
        <div className="content flex h-full w-full flex-col items-center justify-evenly gap-0 text-white">
          <div className="text-center">
            <h1 className="mx-4 text-5xl font-normal">
              Não somos obrigação,{" "}
              <span className="font-extrabold text-primary-color">
                somos ferramenta
              </span>
              .
            </h1>
          </div>
          <Link href="/contato">
            <Button className="rounded-full bg-primary-color p-4 text-lg font-bold">
              Fale com a gente!
            </Button>
          </Link>
        </div>
      </section>
      {/* Sobre */}
      <section
        id="sobre"
        className={cn(
          "wrapper",
          "h-auto w-full max-w-[1500px] !py-[15svh]",
          "notSelected-G flex flex-col items-center justify-between px-4 md:flex-row"
        )}
      >
        <aside className="left flex flex-1 scale-90 flex-col flex-wrap items-center justify-around gap-8 md:scale-100 md:flex-nowrap">
          {/* MISSÃO */}
          <div className="flex items-start justify-center gap-4">
            <div className="flex h-max w-max justify-end">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/sobre/icone_missao.webp`}
                width={50}
                height={50}
                alt="Ícone Missão"
                title="Ícone Missão"
              />
            </div>
            <div className="flex w-[50%] flex-col gap-2">
              <h2 className="block text-3xl">
                Nossa{" "}
                <span className="font-bold">
                  missão
                  <span className="font-bold text-primary-color">:</span>
                </span>
              </h2>
              <p className="block text-base font-normal">
                Oferecer serviços contábeis precisos e acessíveis com soluções
                simples e atendimento excepcional.
              </p>
            </div>
          </div>
          {/* VISÃO */}
          <div className="flex items-start justify-center gap-4">
            <div className="flex h-max w-max justify-end">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/sobre/icone_visao.webp`}
                width={50}
                height={50}
                alt="Ícone Visão"
                title="Ícone Visão"
              />
            </div>
            <div className="flex w-[50%] flex-col gap-2">
              <h2 className="block text-3xl">
                Nossa{" "}
                <span className="font-bold">
                  visão<span className="font-bold text-primary-color">:</span>
                </span>
              </h2>
              <p className="block text-base font-normal">
                Ser reconhecida pela presteza na informação, excelência no
                atendimento e crescimento constante.
              </p>
            </div>
          </div>
          {/* VALORES */}
          <div className="flex items-start justify-center gap-4">
            <div className="flex h-max w-max justify-end">
              <Image
                src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/sobre/icone_valores.webp`}
                width={50}
                height={50}
                alt="Ícone Valores"
                title="Ícone valores"
              />
            </div>
            <div className="flex w-[50%] flex-col gap-2">
              <h2 className="block text-3xl">
                Nossos{" "}
                <span className="font-bold">
                  valores<span className="font-bold text-primary-color">:</span>
                </span>
              </h2>
              <p className="block text-base font-normal">
                Respeito, integridade, empatia, dedicação, clareza e
                responsabilidade.
              </p>
            </div>
          </div>
        </aside>
        <aside className="right mr-4 flex flex-1 flex-col items-end justify-center gap-10 text-center md:text-end">
          <h2 className="w-full text-4xl font-normal md:w-[95%] md:text-6xl">
            A <span className="font-bold">melhor solução</span> para sua
            empresa.
          </h2>
          <Link href="/contato">
            <Button className="rounded-full bg-primary-color p-6 text-xl font-bold text-white">
              Fale com a gente!
            </Button>
          </Link>
        </aside>
      </section>
      {/* Serviços */}
      <section
        id="servicos"
        className={cn(
          "h-auto w-full max-w-[1350px] !p-0",
          "servicos flex flex-col gap-14 text-center"
        )}
      >
        <ServicosComponent />
      </section>
      {/* Posts Recentes */}
      <section
        id="recents"
        className={cn(
          // "wrapper",
          "h-auto w-full max-w-[1400px] gap-14 !py-[10svh]",
          "notSelected-G flex flex-col justify-center"
        )}
      >
        <h2 className="text-center text-2xl font-medium text-black md:text-4xl">
          Publicações mais recentes
          <span className="font-bold text-primary-color">.</span>
        </h2>
        <section className="posts h-auto w-full scale-[.98] !p-0 md:scale-100">
          <InstaRecentPosts />
        </section>
      </section>
    </Suspense>
  );
}
