"use client";
import { useEffect, useLayoutEffect, useState } from "react";

import {
  InstaPostsContextProvider,
  useInstaPostsContext,
} from "@/common/context/InstagramPostsContext";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { Skeleton } from "@/components/ui/skeleton";

import { InstaPostData } from "@/types";
import Link from "next/link";
import "./instaRecentPosts.scss";

type InstaRecentPostsProps = {
  className?: string;
  isMobile?: boolean;
  noRefresh?: boolean;
};

function InstaRecentPosts({ className, noRefresh }: InstaRecentPostsProps) {
  const { state, fetchData } = useInstaPostsContext();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<InstaPostData[]>([]); // Usando useState para posts
  const [user, setUser] = useState<string>(); // Usando useState para posts

  const fetchInstaData = async () => {
    try {
      const posts = await fetchData();

      return posts;
    } catch (error: any) {
      console.log(error.message);
      // redirect('https://redux.app.br')
      // redirect('https://contabilidade.gruporedux.com.br')
    }
  };

  const fetchAllData = async () => {
    const fetchedPosts = await fetchInstaData();
    setPosts(fetchedPosts!);
    setUser(fetchedPosts![0].username!);
  };

  useEffect(() => {
    if (state?.data && state.data.length > 0) {
      // Ordena por data
      const orderedPosts = state.data.sort(
        (a, b) => Date.parse(b.timestamp!) - Date.parse(a.timestamp!)
      );
      // Seleciona os 10 primeiros
      const posts = orderedPosts.slice(0, 10);
      // Enfim, seta o estado
      setPosts(posts);
      setLoading(false);
    }
  }, [state]);

  useEffect(() => {
    if (!noRefresh) {
      fetchAllData().then();
    }
  }, []);

  return (
    <>
      {/* USER INFO */}
      <div className="currentUser relative left-1/2 flex h-10 w-max min-w-52 -translate-x-1/2 justify-center rounded-full border border-[#191919] bg-[#191919] px-4 text-center text-xl font-bold text-white">
        <Link
          className="my-auto"
          target="_blank"
          href={`https://instagram.com/${user ?? ""}`}
        >
          <p className="text-center">@{user ?? " Loading..."}</p>
        </Link>
      </div>
      {/* POSTS */}
      <section
        className={cn(
          "flex h-full w-full gap-4 overflow-x-auto py-4",
          "instaPostsWrapper",
          className
        )}
      >
        {loading ? (
          <div className="relative !z-50 flex h-full items-center justify-evenly gap-4 p-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className="max-h-[384px] min-h-[300px] w-[300px] rounded-md border border-black bg-indigo-100 drop-shadow-custom"
              />
            ))}
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className={cn(
                "instaPost",
                "relative h-[90%] self-start px-4 drop-shadow-custom"
                // { 'scale:.8': isMobile },
              )}
            >
              {/* <Card.Root className='rounded-3xl overflow-hidden w-full h-full md:!py-8 xsm:py-2 px-1 space-y-1'> */}
              <Card.Root className="flex h-max max-h-[34rem] min-h-[30rem] w-full flex-col justify-around rounded-3xl">
                <Card.Post
                  post={post}
                  index={index}
                  className={cn(
                    "instaMidia",
                    "relative w-1/2",
                    "!max-h-[335px]"
                  )}
                />
                <Card.Caption
                  className="max-h-[120px] self-end"
                  text={post.caption!}
                  timestamp={post.timestamp!}
                />
              </Card.Root>
            </div>
          ))
        )}
      </section>
    </>
  );
}

function InstaRecentPostsWrapper({
  className,
  isMobile,
}: InstaRecentPostsProps) {
  return (
    <InstaPostsContextProvider>
      <InstaRecentPosts className={className} isMobile={isMobile} />
    </InstaPostsContextProvider>
  );
}

export default InstaRecentPostsWrapper;
