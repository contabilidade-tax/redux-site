"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { FigureProps } from "@/types";
import Image from "next/image";

import "./sobre.scss";

function Figure({
  image,
  name,
  description,
  className,
  style: styleProps,
}: FigureProps) {
  return (
    <div
      style={styleProps}
      className={cn("flex flex-col items-center justify-center", className)}
    >
      <Image
        title="person_figure_content"
        src={image}
        alt={name}
        loading="lazy"
        className="max-h-[300px] object-contain"
      />
      <h3 className="--font-jetbrains font-semibold md:!text-2xl xsm:text-sm">
        {name}
      </h3>
      <h4 className="--font-jetbrains md:!text-xl xsm:text-base">
        {description}
      </h4>
    </div>
  );
}

export default function Sobre() {
  const figureContents = [
    { image: "isaac", name: "Isaac Pinheiro", description: "CFO" },
    { image: "thales", name: "Thales Andrey", description: "CEO" },
    { image: "neto", name: "Clodomiro Neto", description: "CMO" },
    { image: "fran", name: "Francylanio Araújo", description: "Tributarista" },
    { image: "richard", name: "Richard Oliveira", description: "Tributarista" },
    { image: "junior", name: "Junior Luiz", description: "Tributarista" },
    {
      image: "aline",
      name: "Aline Belarmino",
      description: "Analista Societário",
    },
    { image: "joao", name: "João Ferreira", description: "Analista Contábil" },
    { image: "sarah", name: "Sarah Farias", description: "Analista Pessoal" },
    {
      image: "lucas",
      name: "José Lucas",
      description: "Desenvolvedor FullStack",
    },
    { image: "alisson", name: "Alisson Santos", description: "VideoMaker" },
    {
      image: "jose",
      name: "José Pinheiro",
      description: "Desenvolvedor FullStack",
    },
    {
      image: "vetor",
      name: "Vitor Figueiredo",
      description: "Gestor de Tráfego",
    },
  ];

  return (
    <section className="flex flex-wrap items-center justify-center md:!gap-5 md:!py-5 xsm:gap-12 xsm:py-3">
      {figureContents.map((figure, index) => (
        <Figure
          key={index}
          image={`/assets/img/sobre/${figure.image}.png`}
          name={figure.name}
          description={figure.description}
          className={cn("figure", "md:!scale-100 xsm:scale-110")}
          style={{ flexBasis: "30%" }}
        />
      ))}
    </section>
  );
}
