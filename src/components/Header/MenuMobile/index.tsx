import Link from "next/link";
import { Button } from "@/components/ui/button";

import { XCircleIcon } from "@heroicons/react/24/solid";

import { gsap } from "gsap";

import { MenuItensProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Tools";
import { cn } from "@/lib/utils";

import "./menuItens.scss";

export default function MenuItens({
  tabs,
  fullPath,
  state,
  setCurrentPage,
  setMenuOpen,
  getGreeting,
  className,
  style,
}: MenuItensProps) {
  const navRef = useRef<HTMLUListElement>(null);
  const xRef = useRef<SVGSVGElement>(null);
  const loginRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const animateOut = () => {
    const tl = gsap.timeline({ delay: 0 });

    tl.to(loginRef.current, { x: -1000, opacity: 0, duration: 0.5 }, 0);

    tl.to(xRef.current, { rotation: 360, duration: 1, ease: "power2.out" }, 0);
  };

  useEffect(() => {
    if (state.menuIsOpen && navRef.current) {
      const tl = gsap.timeline({ delay: 0 });

      tl.fromTo(
        loginRef.current,
        { y: -550, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0
      );

      tl.fromTo(
        navRef.current.querySelectorAll("li"),
        { x: (index) => (index % 2 === 0 ? "100%" : "-100%"), opacity: 0 },
        {
          duration: 0.5,
          x: "0%",
          opacity: 1,
          ease: "power4.out",
          stagger: 0.1,
        },
        0
      );

      tl.to(
        xRef.current,
        { rotation: 360, duration: 1, ease: "power2.out" },
        0
      );
    } else {
      animateOut();
    }
  }, [state.menuIsOpen]);

  return (
    <div
      style={style}
      className="ulWrapper !absolute left-0 top-0 z-50 h-screen w-full"
    >
      <ul
        ref={navRef}
        className={
          `${className} ` + "flex h-full w-full flex-col gap-10 font-bold"
        }
      >
        {tabs.map((item) => (
          <li
            className={
              (item === state.currentPage ? "selected " : "") + "font-normal p-1"
            }
            key={item.label}
            onClick={() => {
              setMenuOpen(!state.menuIsOpen);
              setCurrentPage({ type: "SWITCH_PAGE", value: item });
            }}
          >
            <Link
              href={item.src}
              className={cn(
                "text-left",
                { "text-primary-color": item.src === fullPath },
                { "font-extrabold": item.src === fullPath }
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute top-2 h-auto w-full">
        <div className="headMenuMobile absolute flex h-max w-full items-center justify-between">
          <div>
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
                styles={{ filter: isHovered ? "" : "invert(1)" }}
                width={35}
                height={35}
                className="relative top-[.29rem]"
              />
              {getGreeting()}
            </Button>
          </div>
          <XCircleIcon
            ref={xRef}
            color="white"
            className="cursor-pointer"
            width={75}
            height={75}
            onClick={() => setMenuOpen(!state.menuIsOpen)}
          />
        </div>
      </div>
    </div>
  );
}
