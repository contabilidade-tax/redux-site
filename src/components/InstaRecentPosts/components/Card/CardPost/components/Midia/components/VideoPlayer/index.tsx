"use client";
import React, { useRef, useState } from "react";
import { VideoPlayerProps } from "@/types";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VideoPlayer({
  className,
  src,
  width,
  height,
  ...rest
}: VideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVolumeClick = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative h-full w-full">
      <video
        onClick={handleVideoClick}
        ref={videoRef}
        className={cn(className, "rounded-2xl")}
        muted={isMuted}
        loop
        autoPlay
        preload="metadata" // Configuração de preload
        playsInline={true}
        {...rest}
      >
        <source src={src} type="video/mp4"></source>
        Seu navegador não suporta vídeo.
      </video>
      {isMuted ? (
        <VolumeX
          onClick={handleVolumeClick}
          className="absolute bottom-4 left-4 text-white cursor-pointer"
          fill="#202022"
          size={34}
        />
      ) : (
        <Volume2
          onClick={handleVolumeClick}
          className="absolute bottom-4 left-4 text-white cursor-pointer"
          fill="#202022"
          size={34}
        />
      )}
    </div>
  );
}
