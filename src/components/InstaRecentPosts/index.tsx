import { Suspense } from "react";
import { cn } from "@/lib/utils";
import PostsCoreContentServer from "./components/Core";
import PostSkeleton from "./components/LoadingSkeleton";

import "./styles.scss";

type InstaRecentPostsProps = {
  className?: string;
  isMobile?: boolean;
  noRefresh?: boolean;
};

export default function InstaRecentPosts({ className }: InstaRecentPostsProps) {
  return (
    <section
      className={cn(
        "flex h-full w-full gap-4 overflow-x-auto py-4",
        "instaPostsWrapper",
        className
      )}
    >
      <Suspense fallback={<PostSkeleton qtd={4} />}>
        <PostsCoreContentServer />
      </Suspense>
    </section>
  );
}
