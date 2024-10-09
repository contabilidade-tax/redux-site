"use client";

import { cn } from "@/lib/utils";
import { Card } from "../Card";
import Link from "next/link";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../../ui/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { InstaPostData } from "@/types";
import { useEffect } from "react";

type Props = {
  posts?: InstaPostData[];
};

export default function NoSwiperPostsCoreContent({ posts }: Props) {
  useEffect(() => {
    console.log("POSTS", posts);
  }, [posts]);

  return (
    <div className="h-max max-h-[85%] w-full max-w-[1400px]">
      {posts
        ? posts.map((post, index) => (
            <div key={index}>
              <div
                className={cn(
                  "instaPost",
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
            </div>
          ))
        : "Nenhum post a ser exibido"}
    </div>
  );
}
