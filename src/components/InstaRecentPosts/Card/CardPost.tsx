import { InstaMidiaProps } from "@/types";
import Midia from "../Midia";
import { cn } from "@/lib/utils";

export function CardPost({ index, post, className, styles }: InstaMidiaProps) {
  return (
    <Midia
      post={post}
      key={index}
      index={index}
      styles={styles}
      className={cn(className, "relative mx-auto")}
    />
  );
}
