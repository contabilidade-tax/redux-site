import Image from "next/image";
import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/InstaRecentPosts/VideoPlayer";
import { InstaMidiaProps } from "@/types";
import Link from "next/link";
import { Instagram } from "lucide-react";
import "./midia.scss";

export default function Midia({ post, index, className }: InstaMidiaProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="postImage">
        {post.media_type !== "VIDEO" ? (
          <Image
            className={cn(
              "postMidia",
              "rounded-2xl object-contain object-center"
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
            className={cn("postMidia", "postMidiaVideo")}
          />
        )}
      </div>
    </div>
  );
}
