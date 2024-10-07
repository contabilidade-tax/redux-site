"use server";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import Link from "next/link";
import { Button } from "../ui/button";
import { InstaPostData } from "@/types";

export default async function PostsCoreContent({
  posts,
}: {
  posts: InstaPostData[];
}) {
  return posts?.map((post, index) => (
    <div
      key={index}
      className={cn(
        "instaPost",
        "relative h-[90%] self-start px-4 drop-shadow-custom"
      )}
    >
      {/* <Card.Root className='rounded-3xl overflow-hidden w-full h-full md:!py-8 xsm:py-2 px-1 space-y-1'> */}
      <Card.Root className="b-test-yellow flex h-auto min-h-[30rem] w-full flex-col justify-around rounded-3xl">
        <Card.Post
          post={post}
          index={index}
          className={cn(
            "b-test-red instaMidia",
            "relative h-auto max-h-[30rem] w-[85%]"
          )}
        />
        <Card.Caption
          className="max-h-[120px] self-end"
          text={post.caption!}
          timestamp={String(post.timestamp!)}
        />
        <Link href={post.permalink!} target="_blank" className="__postLink">
          <Button className="bg-primary-color px-4 py-2 text-white">
            Clique para ver mais
          </Button>
        </Link>
      </Card.Root>
    </div>
  ));
}
