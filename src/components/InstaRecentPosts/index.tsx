"use client";
import { Suspense, useEffect, useState } from "react";

import {
  InstaPostsContextProvider,
  useInstaPostsContext,
} from "@/common/context/InstagramPostsContext";
import { cn } from "@/lib/utils";

import { InstaPostData } from "@/types";
import "./instaRecentPosts.scss";
import PostsCoreContent from "./core";
import PostSkeleton from "./skeleton";

type InstaRecentPostsProps = {
  className?: string;
  isMobile?: boolean;
  noRefresh?: boolean;
};

function InstaRecentPosts({ className, noRefresh }: InstaRecentPostsProps) {
  const { state, fetchPostsData: fetchData } = useInstaPostsContext();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<InstaPostData[]>([]);

  const fetchInstaData = async () => {
    try {
      const posts = await fetchData();

      return posts;
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchAllData = async () => {
    const fetchedPosts = await fetchInstaData();
    setPosts(fetchedPosts!);
  };

  useEffect(() => {
    if (state?.data && state.data.length > 0) {
      // Ordena por data
      const orderedPosts = state.data.sort(
        (a, b) =>
          Date.parse(String(b.timestamp)) - Date.parse(String(a.timestamp))
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
    <section
      className={cn(
        "flex h-full w-full gap-4 overflow-x-auto py-4",
        "instaPostsWrapper",
        className
      )}
    >
      <Suspense fallback={<PostSkeleton qtd={4} />}>
        <PostsCoreContent posts={posts} />
      </Suspense>
    </section>
  );
}

export default function InstaRecentPostsWrapper({
  className,
  isMobile,
}: InstaRecentPostsProps) {
  return (
    <InstaPostsContextProvider>
      <InstaRecentPosts className={className} isMobile={isMobile} />
    </InstaPostsContextProvider>
  );
}
