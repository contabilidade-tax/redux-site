"use client";
import { Suspense, useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Icon } from "../Tools";

import MenuItens from "./MenuMobile";
import { cn } from "@/lib/utils";
import "./header.scss";

const tabs = [
  { label: "Home", src: "/" },
  { label: "Sobre", src: "/#sobre" },
  { label: "Serviços", src: "/#servicos" },
  { label: "Trabalhe Conosco", src: "/trabalhe-conosco" },
];

function reducer(
  state: any,
  action: { type: string; value?: any; isClient?: boolean }
) {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        menuIsOpen: true,
      };
    case "CLOSE":
      return {
        ...state,
        menuIsOpen: false,
      };
    case "SWITCH_PAGE":
      return {
        ...state,
        currentPage: action.value,
      };
    case "SET_IS_CLIENT":
      return {
        ...state,
        isClient: action.isClient,
      };
    default:
      return state;
  }
}

function HeaderContent({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullPath, setFullPath] = useState("");
  const initialReducerState = {
    currentPage: tabs[0],
    menuIsOpen: false,
    isClient: false,
  };
  const [state, dispatch] = useReducer(reducer, initialReducerState);
  const [isHovered, setIsHovered] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const handleActualPage = (action: { type: string; value: any }) => {
    return dispatch(action);
  };
  function setMenuOpen(isOpen: boolean) {
    if (isOpen) {
      dispatch({ type: "OPEN" });
    } else {
      dispatch({ type: "CLOSE" });
    }
  }

  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Bom dia";
    } else if (hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  }

  useEffect(() => {
    dispatch({ type: "SET_IS_CLIENT", isClient: true });
  }, []);

  useEffect(() => {
    if (state.isClient) {
      const hash = window.location.hash;
      setFullPath(`${pathname}${hash}`);
    }
  }, [pathname, searchParams, state.isClient]);

  useEffect(() => {
    if (fullPath !== state.currentPage.src) {
      const newCurrentPage = tabs.find((tab) => tab.src === fullPath);
      if (newCurrentPage) {
        dispatch({ type: "SWITCH_PAGE", value: newCurrentPage });
      }
    }
  }, [fullPath, state.currentPage.src]);

  // useEffect(() => {}, [isHovered]);

  return (
    <header
      className={cn(
        "head",
        "wrapper",
        "fixed top-0 z-[1000] flex min-h-[10svh] w-full items-center justify-around bg-[#181818] opacity-85 shadow-md",
        className
      )}
    >
      <Link
        href={"/"}
        className="logo relative h-[65px] w-[180px] md:w-[250px]"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN}/assets/img/redux/logo_branca.webp`}
          alt="Redux Logo"
          title="Redux Logo"
          quality={100}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
          priority
        />
      </Link>
      <div className={"desktopTabs hidden h-auto w-max md:block"}>
        <ul className="flex items-center font-normal text-white">
          {tabs.map((tab, index) => (
            <li key={index}>
              <Link
                href={tab.src}
                className={cn(
                  { "text-primary-color": tab.src === fullPath },
                  { "text-lg font-extrabold": tab.src === fullPath }
                )}
                onClick={() => {
                  handleActualPage({ type: "SWITCH_PAGE", value: tab });
                  setFullPath(tab.src);
                }}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={"link hidden md:block"}>
        <Button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-3 rounded-full bg-[#fafafa] text-lg font-semibold text-black hover:bg-primary-color"
        >
          <Icon
            src={
              isHovered
                ? `${process.env.NEXT_PUBLIC_CDN}/assets/img/dino-smile.png`
                : `${process.env.NEXT_PUBLIC_CDN}/assets/img/dino-serio.png`
            }
            width={30}
            height={30}
            styles={{ filter: isHovered ? "" : "invert(1)" }}
            className={"relative top-[.29rem]"}
          />
          {getGreeting()}
        </Button>
      </div>
      <Bars3Icon
        onClick={() => {
          setMenuOpen(true);
        }}
        className="hamburguerButton h-[2em] w-[2em] lg:hidden"
        color="#fff"
        width={40}
        height={40}
      />
      {state.menuIsOpen && (
        <MenuItens
          fullPath={fullPath}
          ref={menuRef}
          state={state}
          className="items-center justify-center bg-black/90 p-4 text-3xl text-white backdrop-blur-sm"
          tabs={tabs}
          setCurrentPage={handleActualPage}
          setMenuOpen={setMenuOpen}
          getGreeting={getGreeting}
        />
      )}
    </header>
  );
}

export default function Header() {
  return (
    <Suspense>
      <HeaderContent />
    </Suspense>
  );
}
