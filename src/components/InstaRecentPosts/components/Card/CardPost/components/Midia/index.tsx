import Image from "next/image";
import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/InstaRecentPosts/components/Card/CardPost/components/Midia/components/VideoPlayer";
import { InstaMidiaProps } from "@/types";
import "./midia.scss";

export default function Midia({ post, index, className }: InstaMidiaProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="postImage">
        {post.media_type !== "VIDEO" ? (
          <Image
            className={cn(
              "postMidia",
              "rounded-2xl object-cover object-center"
            )}
            key={index}
            src={post.media_url!}
            alt={post.permalink!}
            title={`${post.username}_${post.media_type}`}
            width={1000}
            height={800}
            loading="lazy"
          />
        ) : (
          <VideoPlayer
            src={post.media_url!}
            className={cn(
              "postMidia postMidiaVideo",
              "object-cover object-center"
            )}
          />
        )}
      </div>
    </div>
  );
}
