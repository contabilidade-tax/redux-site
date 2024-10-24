"use client";

import { cn } from "@/lib/utils";
import { Card } from "../Card";
import Link from "next/link";
import {
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { isMobile } from 'react-device-detect'
import { Button } from "../../../ui/button";
import { InstaPostData } from "@/types";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { useEffect, useState } from "react";

type Props = {
  posts?: InstaPostData[];
};

export default function PostsCoreContent({ posts }: Props) {
  const [filteredPosts, setFilteredPosts] = useState<InstaPostData[]>()

  useEffect(() => {
    if (isMobile) {
      setFilteredPosts(posts?.filter(post => post.media_type !== "VIDEO"))
    } else {
      setFilteredPosts(posts)
    }
  }, [posts, isMobile])

  return (
    <Swiper
      modules={[Scrollbar, Navigation, Pagination]}
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={25}
      navigation={true}
      rewind
      className="flex !h-full !w-full !max-w-[1450px]"
    >
      {
        filteredPosts
          ? (
            filteredPosts.map((post, index) => (
              <SwiperSlide
                className="!m-0 !grid !h-fit !w-auto !place-items-center space-y-4 !p-0"
                key={index}
              >
                <div
                  className={cn(
                    "h-max w-[20%] min-w-[300px] max-w-[380px] scale-100 md:min-w-[320px] md:scale-100",
                    "rounded-3xl !bg-[#eee]",
                    "h-max w-max self-start p-3"
                  )}
                >
                  <Card.Root className="flex h-auto max-h-[30rem] w-full flex-col justify-around rounded-3xl">
                    <Card.Post
                      post={post}
                      index={index}
                      className={cn("insta__Post", "relative min-h-max w-[80%]")}
                    />
                    <Card.Caption
                      className="h-[120px] self-end"
                      text={post.caption!}
                      timestamp={String(post.timestamp!)}
                    />
                  </Card.Root>
                </div>
                {/* VEJA MAIS */}
                <Link
                  href={post.permalink!}
                  target="_blank"
                  title="Ver publicação no instagram"
                  className="__postLink"
                >
                  <Button className="rounded-3xl bg-primary-color px-4 py-2 text-xl font-semibold text-white">
                    Clique para ver mais.
                  </Button>
                </Link>
              </SwiperSlide>
            ))
          )
          : <div>Nenhum post a ser exibido</div>
      }
    </Swiper>
  )
}
