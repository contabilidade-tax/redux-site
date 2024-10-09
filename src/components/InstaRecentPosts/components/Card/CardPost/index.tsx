import { InstaMidiaProps } from "@/types";
import Midia from "./components/Midia";
import { cn } from "@/lib/utils";

export function CardPost({ index, post, className, styles }: InstaMidiaProps) {
  return (
    <Midia
      post={post}
      key={index}
      index={index}
      className={cn(className, "relative mx-auto")}
    />
  );
}
