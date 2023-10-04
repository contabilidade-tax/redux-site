import { Skeleton } from "@/components/ui/skeleton"

type SkeletonItemProps = {
    className?: string
}

export default function SkeletonItem({ className }: SkeletonItemProps) {
    return <Skeleton className={className} />
}