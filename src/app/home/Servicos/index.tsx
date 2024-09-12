/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useRef } from "react";
import Link from "next/link";

import { ServiceProps } from "@/types";
import services from "@/common/data/services.json";
import styles from "./Servicos.module.scss";
import { useMobileContext } from "@/common/context/MobileDeviceContext";
import { cn } from "@/lib/utils";

import {
  CriarEmpresa,
  Societario,
  Fiscal,
  Contabil,
} from "@/components/Animation";
import Seletores from "@/components/ui/seletores";
import { ButtonBackgroundShine } from "@/components/Tools";

function reducer(
  state: any,
  action: {
    type: string;
    value?: number;
    size?: { width: number; height: number };
    isClient?: boolean;
  }
) {
  switch (action.type) {
    case "ANIMATE_START":
      return {
        ...state,
        isAnimating: true,
      };
    case "CHANGE_TAB":
      return {
        ...state,
        actualIndex: action.value,
        selectedTab: services[action.value!],
      };
    case "ANIMATE_END":
      return {
        ...state,
        isAnimating: false,
      };
    case "CHANGE_ANIMATION_AREA_SIZE":
      return {
        ...state,
        animationArea: action.size,
      };
    case "CHANGE_IS_CLIENT":
      return {
        ...state,
        isClient: action.isClient,
      };
    default:
      return state;
  }
}

function formatTextToArray(text: string) {
  return text
    .split(". ")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

interface initialStateProps {
  actualIndex: number;
  selectedTab: (typeof services)[0];
  isClient: boolean;
  isAnimating: boolean;
  animationArea: {
    width: number;
    height: number;
  };
}

export default function Servicos({
  scrollerRef,
  className,
  ...rest
}: ServiceProps) {
  const initialState: initialStateProps = {
    actualIndex: 0,
    selectedTab: services[0],
    isAnimating: false,
    animationArea: { width: 0, height: 0 },
    isClient: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mobileState } = useMobileContext();
  const animations = [CriarEmpresa, Societario, Fiscal, Contabil];
  const animationAreaRef = useRef<HTMLDivElement>(null);
  const currentWindowWidth = state.isClient ? window.innerWidth : 0;

  const switchTab = (index: number) => {
    if (state.isAnimating) return; // Ignore se já estiver animando
    if (state.selectedTab === services[index]) return; // Ignore se for a mesma aba

    // dispatch({
    //   type: 'ANIMATE_START',
    // })
    if (index < 0) {
      index = services.length - 1;
    } else if (index > services.length - 1) {
      index = 0;
    }
    dispatch({
      type: "CHANGE_TAB",
      value: index,
    });

    // animateInAndOut(imageRef, index)
  };

  useEffect(() => {
    dispatch({ type: "CHANGE_IS_CLIENT", isClient: true });
  }, []);

  useEffect(() => {
    if (animationAreaRef.current) {
      dispatch({
        type: "CHANGE_ANIMATION_AREA_SIZE",
        size: {
          width: animationAreaRef.current.offsetWidth,
          height: animationAreaRef.current.offsetHeight,
        },
      });
    }
  }, [currentWindowWidth]);

  return (
    <section className={cn(styles.servicos, className)} {...rest}>
      <section
        className={cn(
          "flex max-h-[90vh] w-full flex-col items-center justify-center py-8"
        )}
      >
        <h4
          className={cn(
            "text-center text-3xl font-semibold md:text-4xl lg:text-6xl",
            styles.title
          )}
        >
          Como podemos ajudar
          <span
            className={cn(
              "text-3xl font-black md:text-5xl lg:text-7xl",
              "text-primary-color"
            )}
          >
            ?
          </span>
        </h4>
        <div
          className={cn(
            styles.contentWrapper,
            "flex h-full w-full items-center justify-center gap-4 md:my-10 md:!flex-row md:px-10 xsm:flex-col-reverse"
          )}
        >
          {/* LEFT AREA */}
          <div
            className={cn(
              styles.left,
              "h-full self-start md:!w-2/5 xsm:w-full"
            )}
          >
            <div
              className={cn(
                styles.textArea,
                "relative flex h-full w-full flex-col items-center justify-start"
              )}
            >
              <Seletores
                services={services}
                state={state}
                switchTab={switchTab}
                styles={styles}
                className={cn(styles.seletores, "z-[90]")}
              />
              {/* TEXTO */}
              <div
                className={cn(
                  styles.text,
                  "flex h-full w-full max-w-[25rem] flex-1 flex-col justify-between rounded-xl bg-[#202020] md:min-h-[450px] xsm:min-h-[50%]"
                )}
              >
                {/* SUBTITULO */}
                <div
                  className={cn(
                    "relative mx-auto hidden h-10 w-4/5 -translate-y-1/2 items-center justify-center rounded-full bg-primary-color xsm:flex",
                    styles.subtitle
                  )}
                >
                  <h2
                    className={cn(
                      "text-center text-base font-semibold text-white",
                      "h-max w-max"
                    )}
                  >
                    {state.selectedTab.titulo}
                  </h2>
                </div>
                {/* TEXTO SELECIONADO */}
                <div
                  className={cn(
                    styles.selectedText,
                    "flex px-3 text-lg text-white xl:text-2xl",
                    "md:flex-col md:gap-4 md:px-6"
                  )}
                >
                  {mobileState.isSmallScreen ? (
                    <p
                      className={cn("text-left leading-snug", styles.paragraph)}
                    >
                      {state.selectedTab.texto}
                    </p>
                  ) : (
                    formatTextToArray(state.selectedTab.texto).map(
                      (sentence, index) => (
                        <p className="text-left" key={index}>
                          {sentence}.
                        </p>
                      )
                    )
                  )}
                </div>
                {/* COISA INVISIVEL PRA CENTRALIZAR O TEXTO */}
                <div
                  className={cn(
                    "relative mx-auto h-10 w-4/5 items-center justify-center rounded-full bg-primary-color opacity-0"
                  )}
                />
              </div>
            </div>
          </div>
          {/* RIGHT AREA */}
          <div
            ref={animationAreaRef}
            className={cn(
              styles.right,
              "relative flex h-full flex-col items-center sm:gap-12 md:!flex-1 md:gap-16 xsm:!w-full"
            )}
          >
            {/* ANIMATION CONTAINER */}
            <div
              className={cn(
                styles.animationContainer,
                // 'w-full h-3/5 md:!min-h-[60%] xsm:max-h-[250px]',
                "h-3/5 w-full md:!min-h-[60%] xsm:max-h-[250px]"
              )}
            >
              <div
                title={state.selectedTab.subtitulo}
                className={cn(
                  styles.animationArea,
                  "relative mx-auto h-full w-full md:!max-w-[825px] xsm:!max-h-[250px]"
                )}
              >
                {animations.map(
                  (Animation, index) =>
                    index === state.actualIndex && (
                      <Animation
                        width={
                          mobileState.isSmallScreen
                            ? state.animationArea.width
                            : state.animationArea.width * 0.95
                        }
                        height={
                          mobileState.isSmallScreen
                            ? state.animationArea.height * 0.5
                            : state.animationArea.height * 0.5
                        }
                        key={index}
                        className={cn(
                          "relative mx-auto !max-h-[307px] cursor-default overflow-hidden object-cover lg:!min-h-[330px] lg:!max-w-[850px] xsm:min-w-full",
                          { "xsm:min-h-[300px]": [0, 1, 3].includes(index) }
                          // 'border border-yellow-500'
                          // 'relative cursor-default overflow-hidden object-cover mx-auto xsm:min-h-[300px] xsm:min-w-full lg:min-h-[300px] max-w-[692px] max-h-[307px]',
                        )}
                      />
                    )
                )}
              </div>
            </div>
            {/* FOOTER TEXT AREA */}
            {/* <div className={cn(styles.animationFooter, 'w-full h-max justify-between items-center relative mx-auto', 'xsm:hidden sm:flex-col md:!flex lg:!flex-row xl:!flex-1')}> */}
            <div
              className={cn(
                styles.animationFooter,
                "relative mx-auto h-max w-full items-center justify-between",
                "md:!flex lg:!flex-row xl:!flex-1 xsm:hidden xsm:flex-col",
                "md:translate-y-4"
              )}
            >
              {/* <div className={cn(styles.fraseStyle, 'w-full text-3xl', 'sm:w-[150px] sm:flex-1 sm:text-5xl md:!flex-1 xl:min-w-[500px] xl-max:h-[200px] xl:text-6xl')}> */}
              <div
                className={cn(
                  styles.fraseStyle,
                  "w-full",
                  "xl-max:h-[200px] sm:w-[150px] sm:flex-1 sm:text-5xl md:!w-max md:min-w-[420px] xl:text-6xl"
                )}
              >
                {state.selectedTab.frase
                  .split("\\")
                  .map((sentence: any, index: any) => (
                    <h2
                      className={cn({
                        "font-bold text-primary-color": index !== 0,
                      })}
                      key={index}
                    >
                      {sentence}
                    </h2>
                  ))}
              </div>
              <div className="text-md flex h-12 flex-1 justify-center md:max-w-[280px]">
                <Link className={cn("relative w-full")} href={"/contato"}>
                  <ButtonBackgroundShine
                    text="Fale com a gente! 🤙🏼"
                    className="h-full min-w-full rounded-3xl"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
