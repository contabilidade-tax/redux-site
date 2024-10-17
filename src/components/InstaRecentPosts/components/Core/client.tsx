"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "../Card";
import Link from "next/link";
import {
  Virtual,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../../ui/button";
import { InstaPostData } from "@/types";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

type Props = {
  posts?: InstaPostData[];
  userAgent: string | null;
};

export default function PostsCoreContent({ posts, userAgent }: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState<InstaPostData[] | undefined>(posts);

  const checkUserAgent = (userAgent: string) => {
    const mobileUserAgents = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.browser|up\.link|vodafone|wap|windows ce|xda|xiino/i;

    const legacyMobileUserAgents = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|acer|aos|airn|alav|alca|amoi|anex|anny|aptu|arch|argo|aste|asus|attw|audi|avan|beck|bell|bumb|bw-n|bwu|c55|cap|ccwa|cdm|cell|chtm|cldc|cmd|craw|dait|dbte|dc-s|devi|dica|dmob|doco|ds12|el49|elai|eml2|eric|esl8|ez[4-7]0|fetc|fly|g1 u|g560|gene|gf-5|g-mo|good|grad|haie|hei|hipt|hp ip|hs-c|htc|hua|i-go|i230|iac|idea|ig01|ikom|inno|ipaq|iris|jbro|jemu|jigs|kddi|keji|lg g|libw|lynx|maeo|miat|mmef|mot|mt50|n20[2-3]|ne|nok|opwv|owg1|p800|pan|pdxg|phil|play|pire|prox|psio|qtek|r380|r600|rim9|sama|sc01|sdk\/|sie-m|slid|son|sp01|telm|toapl|tx-9|veri|voda|webc|whit|wonu|zte-/i;

    return mobileUserAgents.test(userAgent) || legacyMobileUserAgents.test(userAgent);
  };



  useEffect(() => {
    if (userAgent) {
      setIsMobile(checkUserAgent(userAgent))
    }
  }, [userAgent])

  useEffect(() => {
    if (posts) {
      setFilteredPosts(
        isMobile
          ? posts.filter(post => post.media_type !== "VIDEO")
          : posts
      )
    }
  }, [isMobile, posts]);

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
      {filteredPosts
        ? filteredPosts.map((post, index) => (
          <SwiperSlide
            className="!m-0 !grid !h-fit !w-fit !place-items-center space-y-4 !p-0"
            key={index}
          >
            <div
              className={cn(
                // "instaPost",
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
        : "Nenhum post a ser exibido"}
    </Swiper>
  );
}
