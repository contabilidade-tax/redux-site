"use client";
import React, { useState } from "react";
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

  const handleVideoClick = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative h-full w-full">
      <video
        className={cn(className, "rounded-2xl")}
        autoPlay
        muted={isMuted}
        loop
        onClick={handleVideoClick}
        playsInline={true}
        {...rest}
      >
        <source src={src} type="video/mp4"></source>
        Seu navegador não suporta vídeo.
      </video>
      {isMuted ? (
        <VolumeX
          onClick={handleVideoClick}
          className="absolute bottom-4 left-4 text-white"
          fill="#202022"
          size={30}
        />
      ) : (
        <Volume
          onClick={handleVideoClick}
          className="absolute bottom-4 left-4 text-white"
          fill="#202022"
          size={30}
        />
      )}
    </div>
  );
}
