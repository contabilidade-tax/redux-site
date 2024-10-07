import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  qtd: number;
};

export default function PostSkeleton({ qtd }: Props) {
  return (
    <div className="relative z-50 flex h-full items-center justify-evenly gap-4 p-5">
      {Array.from({ length: qtd }).map((_, index) => (
        <Skeleton
          key={index}
          className="max-h-[384px] min-h-[300px] w-[300px] rounded-md border border-black bg-indigo-100 drop-shadow-custom"
        />
      ))}
    </div>
  );
}
