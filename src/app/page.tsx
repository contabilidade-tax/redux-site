import { Suspense } from "react";
//
import { cn } from "@/lib/utils";
import "@/app/page.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InstaRecentPosts from "@/components/InstaRecentPosts";

function Home() {
  return (
    <>
      {/* Apresentação */}
      <section
        id="presentation"
        style={{
          backgroundImage: "url('/assets/img/redux/capa_redux.webp')",
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
            <h1 className="mx-[1vw] text-5xl font-normal">
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
                src="/assets/img/redux/sobre/icone_missao.webp"
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
                src="/assets/img/redux/sobre/icone_visao.webp"
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
                src="/assets/img/redux/sobre/icone_valores.webp"
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
                src="/assets/img/redux/servicos/inst_redux_1.webp"
                width={280}
                height={200}
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
                src="/assets/img/redux/servicos/inst_redux_2.webp"
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
                src="/assets/img/redux/servicos/inst_redux_3.webp"
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
                src="/assets/img/redux/servicos/inst_redux_4.webp"
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
        </div>
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
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
