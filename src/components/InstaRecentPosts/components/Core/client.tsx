"use client";

import { cn } from "@/lib/utils";
import { Card } from "../Card";
import Link from "next/link";
import {
  Virtual,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../../ui/button";
import { InstaPostData } from "@/types";
import { useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
  posts?: InstaPostData[];
};

export default function PostsCoreContent({ posts }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      slidesPerView={"auto"}
      centeredSlides={true}
      spaceBetween={30}
      pagination={{
        type: "bullets",
      }}
      navigation={true}
      mousewheel
      keyboard
      className="!h-full !w-full !max-w-[1450px]"
    >
      {posts
        ? posts.map((post, index) => (
            <SwiperSlide
              className="!grid !h-fit !w-fit !place-items-center"
              key={index}
            >
              <div
                className={cn(
                  // "instaPost",
                  "h-max w-[27%] min-w-[350px] max-w-[380px]",
                  "rounded-3xl !bg-[#eee]",
                  "h-max w-max self-start p-4"
                )}
              >
                <Card.Root className="flex h-auto max-h-[30rem] w-full flex-col justify-around rounded-3xl">
                  <Card.Post
                    post={post}
                    index={index}
                    className={cn(
                      "insta__Post",
                      "relative h-[20rem] min-h-max w-[80%]"
                    )}
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
        : "Nenhum post a ser exibido"}
    </Swiper>
  );
}
