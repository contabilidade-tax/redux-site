import Image from "next/image";
import { cn } from "@/lib/utils";
import VideoPlayer from "@/components/InstaRecentPosts/VideoPlayer";
import { InstaMidiaProps } from "@/types";
import Link from "next/link";
import { Instagram } from "lucide-react";
import styles from "./Midia.module.scss";

export default function Midia({ post, index, className }: InstaMidiaProps) {
  return (
    <div className={cn("relative", className)}>
      {/* <div className={cn('relative md:!h-[80%]', className)}> */}
      <div className={styles.postImage}>
        <div
          className={cn(styles.goToInstagram, "absolute right-3 top-3 z-10")}
        >
          <Link
            href={post.permalink!}
            target="_blank"
            className={styles.__postLink}
          >
            <Instagram
              className="text-white shadow-md"
              fill="rgb(230, 80, 130)"
              size={40}
            />
          </Link>
        </div>
        {post.media_type !== "VIDEO" ? (
          <Image
            className={cn(
              styles.postMidia,
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
            className={cn(styles.postMidia, styles.postMidiaVideo)}
          />
        )}
      </div>
    </div>
  );
}
