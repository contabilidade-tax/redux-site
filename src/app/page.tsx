/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect, Suspense } from "react";
import { setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
//
import Servicos from "./home/Servicos";
import { ButtonBackgroundShine } from "@/components/Tools";
import { useMobileContext } from "@/common/context/MobileDeviceContext";
import InstaRecentPosts from "@/components/InstaRecentPosts";
import { cn } from "@/lib/utils";
import Sobre from "@/components/Sobre";
//
import NatalGameScene from "./home/NatalGameScene";
import GameScene from "./home/GameScene";
//
import "@/app/home/home.scss";

type handleCookieActions = {
  type: "SET" | "GET";
};

function Home() {
  // const [isClient, setIsClient] = useState(false)
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
    // Identifica que está no client
    // PS. isso é alternativa à typeof window != undefined afim de evitar erros de hydration
    // setIsClient(true)

    // Lógica do toast de welcome após autorizar os recents posts
    if (params.get("welcome") && !welcomeCookie({ type: "GET" })) {
      handleWelcomeNotification();
    }
  }, []);

  return (
    <>
      <section
        className={cn("contentArea", "min-h-[90svh] w-full", "pt-[10sh]")}
      >
        <div
          className={cn(
            "min-h-[90svh] w-full py-[5%] md:!gap-10 md:!py-[3%]",
            "grid grid-rows-5"
          )}
        >
          <h1
            className={cn(
              "w-full p-0 text-center text-7xl tracking-wide lg:text-6xl",
              "row-span-1"
            )}
          >
            <span
              className={cn(
                "h-max w-full font-normal",
                "md:!text-6xl xsm:text-4xl"
              )}
            >
              Não somos obrigação,
            </span>
            <span className="font-black md:!text-6xl xsm:text-4xl">
              <span className="text-primary-color"> somos ferramenta</span>
              <span className="text-primary-color">.</span>
            </span>
          </h1>
          <section
            className={cn(
              "row-span-3 mx-auto w-full",
              "flex !h-[417.55px] flex-col items-center justify-center"
            )}
          >
            <GameScene classname="w-full h-full xsm:scale-90" />
          </section>
          <div
            className={`bottomTextContent row-span-1 flex h-max w-full flex-col`}
          >
            <h2 className="text-center text-2xl lg:text-4xl">
              A{" "}
              <span className="font-black text-primary-color">
                melhor solução
              </span>{" "}
              para sua empresa.
            </h2>
            <Link
              href="/contato"
              className="mx-auto h-auto w-1/2 min-w-[261px] text-lg lg:w-1/6"
            >
              <ButtonBackgroundShine
                text="Fale com a gente! 🤙🏼"
                className="text-zinc-100 mt-4 w-full rounded-full px-4 py-2"
              />
            </Link>
          </div>
        </div>
      </section>
      <section
        id="servicos"
        className={cn(
          "wrapper",
          "min-h-[90svh] w-full",
          "!mt-[10svh] !pt-[5svh]",
          "servicos flex items-center justify-center py-10"
        )}
      >
        <Servicos className={cn("h-full w-full")} />
      </section>
      {/* <section id='sobre' className={cn('wrapper', 'w-full h-auto min-h-[90svh] max-w-[1500px]', '!pt-[10svh]', "flex flex-col gap-5 justify-center items-center notSelected-G")}>
        <div className='intraSection space-y-2'>
          <h2 className='self-center text-left md:text-7xl font-extrabold text-primary-color xsm:text-5xl'>Conheça nosso time:</h2>
          <Sobre />
        </div>
      </section> */}
      <section
        id="recents"
        className={cn(
          "wrapper",
          "mb-[5svh] mt-[10svh] h-auto max-h-[90svh] max-w-full",
          "notSelected-G flex flex-col justify-center"
        )}
      >
        <h2 className="text-center text-5xl font-extrabold text-primary-color sm:!text-2xl md:!text-5xl">
          Posts recentes!
        </h2>
        {/* <section className='posts max-h-[38rem] min-h-[450px] w-full'> */}
        <section className="posts h-auto w-full md:!scale-100 xsm:!scale-95">
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
