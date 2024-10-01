/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect, Suspense } from "react";
import { setCookie, parseCookies } from "nookies";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
//
import Servicos from "./home/Servicos";
import { ButtonBackgroundShine } from "@/components/Tools";
import { useMobileContext } from "@/common/context/MobileDeviceContext";
import InstaRecentPosts from "@/components/InstaRecentPosts";
import { cn } from "@/lib/utils";
//
import NatalGameScene from "./home/NatalGameScene";
import GameScene from "./home/GameScene";
//
import "@/app/home/home.scss";

type handleCookieActions = {
  type: "SET" | "GET";
};

export default function Page() {
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
      <section className={cn("contentArea", "min-h-[90svh] w-full")}></section>
      <section
        id="servicos"
        className={cn(
          "wrapper",
          "min-h-[90svh] w-full",
          "!mt-[10svh] !pt-[5svh]",
          "servicos flex items-center justify-center py-10"
        )}
      >
        {/* <Servicos className={cn("h-full w-full")} /> */}
      </section>
      <section
        id="sobre"
        className={cn(
          "wrapper",
          "h-auto min-h-[90svh] w-full max-w-[1500px]",
          "!pt-[10svh]",
          "notSelected-G flex flex-col items-center justify-center gap-5"
        )}
      >
        {/* <div className='intraSection space-y-2'>
          <h2 className='self-center text-left md:text-7xl font-extrabold text-primary-color xsm:text-5xl'>Conheça nosso time:</h2>
          <Sobre />
        </div> */}
      </section>
      <section
        id="recents"
        className={cn(
          "wrapper",
          "mb-[5svh] mt-[10svh] h-auto max-h-[90svh] max-w-full",
          "notSelected-G flex flex-col justify-center"
        )}
      >
        <h2 className="text-center text-5xl font-extrabold text-primary-color sm:!text-2xl md:!text-5xl">
          Publicações mais recentes!
        </h2>
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
