"use client";
import React, { useEffect, useRef, useState } from "react";
import { VideoPlayerProps } from "@/types";
import { Volume, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VideoPlayer({
  className,
  src,
  width,
  height,
  ...rest
}: VideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoClick = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
            if (videoRef.current) {
              videoRef.current.play(); // Inicia a reprodução
            }
          } else {
            setIsPlaying(false);
            if (videoRef.current) {
              videoRef.current.pause(); // Pausa a reprodução
            }
          }
        });
      },
      { threshold: 0.5 } // 50% do vídeo deve estar visível para considerar 'intersectando'
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef} // Referência ao vídeo
        className={cn(className, "rounded-2xl")}
        muted={isMuted}
        loop
        preload="metadata" // Configuração de preload
        playsInline={true}
        {...rest}
      >
        <source src={src} type="video/mp4"></source>
        Seu navegador não suporta vídeo.
      </video>
      {isMuted ? (
        <VolumeX
          onClick={handleVideoClick}
          className="absolute bottom-4 left-4 text-white cursor-pointer"
          fill="#202022"
          size={30}
        />
      ) : (
        <Volume
          onClick={handleVideoClick}
          className="absolute bottom-4 left-4 text-white cursor-pointer"
          fill="#202022"
          size={30}
        />
      )}
    </div>
  );
}
