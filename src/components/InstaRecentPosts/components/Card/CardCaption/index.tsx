import React from "react";
import { cn } from "@/lib/utils";

import "./caption.scss";

type CardCaptionProps = {
  className?: string;
  timestamp: string;
  text: string;
};

function convertToPublishedFormat(timestamp: string): string {
  const datePart = timestamp.split("T")[0]; // Pegue a parte da data, ignorando a hora
  const [year, month, day] = datePart.split("-"); // Divida a data em ano, mês e dia

  return `Publicado em ${day}.${month}.${year}`;
}

export function CardCaption({ timestamp, text, className }: CardCaptionProps) {
  return (
    <div
      id="card__caption__wrapper"
      className={cn(
        "relative mx-auto flex flex-col justify-evenly bg-white",
        className
      )}
    >
      <h3
        id="card__caption__timestamp"
        className="text-md text-center font-sans font-semibold leading-snug tracking-normal text-blue-gray-900"
      >
        {convertToPublishedFormat(timestamp)}
      </h3>
      {/* Caption */}
      <div id="card__caption__caption" className="modal">
        <article className="modal-container">
          <section className="modal-container-body rtf text-center">
            <p className="px-3">{text}</p>
          </section>
        </article>
      </div>
    </div>
  );
}
