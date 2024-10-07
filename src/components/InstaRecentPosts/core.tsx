import { cn } from "@/lib/utils";
import { Card } from "./Card";
import Link from "next/link";
import { Button } from "../ui/button";
import { InstaPostData } from "@/types";

export default function PostsCoreContent({
  posts,
}: {
  posts: InstaPostData[];
}) {
  return posts?.map((post, index) => (
    <div
      key={index}
      className="insta__Post__Wrapper flex h-max max-h-[85%] w-max flex-col items-center justify-between gap-4"
    >
      <div
        className={cn(
          "instaPost",
          "rounded-3xl !bg-[#eee]",
          "relative h-max self-start p-4"
        )}
      >
        {/* <Card.Root className='rounded-3xl overflow-hidden w-full h-full md:!py-8 xsm:py-2 px-1 space-y-1'> */}
        <Card.Root className="flex h-auto min-h-[30rem] w-full flex-col justify-around rounded-3xl">
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
      <Link href={post.permalink!} target="_blank" className="__postLink">
        <Button className="rounded-3xl bg-primary-color px-4 py-2 text-xl font-semibold text-white">
          Clique para ver mais.
        </Button>
      </Link>
    </div>
  ));
}
