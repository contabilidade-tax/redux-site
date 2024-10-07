/* eslint-disable no-unused-vars */
"use client";
import React, { Suspense, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
//
import { useMobileContext } from "@/common/context/MobileDeviceContext";
import InstaRecentPosts from "@/components/InstaRecentPosts";
import { cn } from "@/lib/utils";
import "@/app/page.scss";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type handleCookieActions = {
  type: "SET" | "GET";
};

function Home() {
  const { mobileState } = useMobileContext();
  const params = useSearchParams();

  function welcomeCookie(action: handleCookieActions) {
    const { has_been_welcomed } = parseCookies();

    switch (action.type) {
      case "SET":
        setCookie(undefined, "has_been_welcomed", "true", {
          path: "/",
          maxAge: 24 * 60 * 60 * 1000, // 1 dias
        });
        break;
      case "GET":
        return has_been_welcomed;
    }
  }

  const handleWelcomeNotification = () => {
    toast.success(
      <div>
        <p>Bem vindo!</p>
        <p>Recent Posts autorizado com sucesso</p>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        className: "-translate-x-12 translate-y-16",
      }
    );

    welcomeCookie({ type: "SET" });
  };

  // Define o mount do component de loading e timeout de saída
  useEffect(() => {
    if (params.get("welcome") && !welcomeCookie({ type: "GET" })) {
      handleWelcomeNotification();
    }
  }, []);

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
          "min-h-[100svh] w-full",
          "flex flex-col items-center justify-around"
        )}
      >
        <div className="content flex min-h-max w-full flex-col items-center justify-center gap-24 text-white">
          <div className="text-center">
            <h1 className="mx-[1vw] text-5xl font-extrabold">
              Não somos obrigação,{" "}
              <span className="text-primary-color">somos ferramenta</span>.
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
                src="/assets/img/redux/sobre/icone_missao.svg"
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
                src="/assets/img/redux/sobre/icone_visao.svg"
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
                src="/assets/img/redux/sobre/icone_valores.svg"
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
                Respeito, integridade, empatia, dedicação, clareza,
                responsabilidade e ter um ambiente leve
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
          "h-auto w-full !p-0",
          "servicos flex flex-col gap-20 text-center"
        )}
      >
        <h2 className="block text-4xl font-medium">
          Como podemos te ajudar hoje
          <span className="text-primary-color">?</span>
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
                loading="eager"
                alt="Imagem institucional Redux"
                title="Imagem institucional Redux"
              />
              <h3 className="mt-2 block text-base font-bold">
                Abertura de empresa
              </h3>
              <div className="cta mt-2 flex w-full flex-1 flex-col items-center justify-between px-2 text-start font-semibold">
                <p className="mx-auto block h-[80%] font-medium">
                  Está pensando em abrir sua empresa? Aqui, tornamos esse
                  processo simples e sem complicações.
                </p>
                <Button className="max-w-[45%] self-end rounded-full bg-primary-color px-1 py-[0.1rem] font-bold text-white">
                  Saiba mais!
                </Button>
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
                loading="eager"
                alt="Imagem institucional Redux"
                title="Imagem institucional Redux"
              />
              <h3 className="mt-2 block text-base font-bold">
                Regularize seu colaborador
              </h3>
              <div className="cta mt-2 flex w-full flex-1 flex-col items-center justify-between px-2 text-start font-semibold">
                <p className="mx-auto block h-[80%] font-medium">
                  regularize seus colaboradores de forma rápida e segura com
                  nossa equipe especializada.
                </p>
                <Button className="max-w-[45%] self-end rounded-full bg-primary-color px-1 py-[0.1rem] font-bold text-white">
                  Saiba mais!
                </Button>
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
                loading="eager"
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
                <Button className="max-w-[45%] self-end rounded-full bg-primary-color px-1 py-[0.1rem] font-bold text-white">
                  Saiba mais!
                </Button>
              </div>
            </div>
          </div>
          {/* Assessoria Contábil */}
          <div className="serviceCard-Wrapper h-[420px] max-w-[280px] rounded-3xl bg-[#eee] p-4">
            <div className="serviceCard flex h-full w-full flex-col items-center justify-between">
              <Image
                className="rounded-2xl"
                src="/assets/img/redux/servicos/inst_redux_4.webp"
                width={280}
                height={200}
                loading="eager"
                alt="Imagem institucional Redux"
                title="Imagem institucional Redux"
              />
              <h3 className="mt-2 block text-base font-bold">
                Assessoria Contábil
              </h3>
              <div className="cta mt-2 flex w-full flex-1 flex-col items-center justify-between px-2 text-start font-semibold">
                <p className="mx-auto block h-[80%] font-medium">
                  Conte com nossa assessoria contábil para garantir uma gestão
                  financeira eficiente e tranquila
                </p>
                <Button className="max-w-[45%] self-end rounded-full bg-primary-color px-1 py-[0.1rem] font-bold text-white">
                  Saiba mais!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Posts Recentes */}
      <section
        id="recents"
        className={cn(
          "wrapper",
          "h-auto w-full !py-[10svh]",
          "notSelected-G flex flex-col justify-center"
        )}
      >
        <h2 className="text-center text-2xl font-medium text-black md:text-5xl">
          Publicações mais recentes
          <span className="text-primary-color">.</span>
        </h2>
        <section className="posts h-auto max-h-[80%] w-full scale-95 md:scale-100">
          <InstaRecentPosts
            isMobile={mobileState.isSmallScreen}
            noRefresh={params.has("noRefresh")}
          />
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
