import { cn } from "@/lib/utils";

type CardRootProps = {
    children: React.ReactNode;
    className?: string;
}

export function CardRoot({ children, className }: CardRootProps) {
    return (
        <div className={cn(
            "relative bg-white text-gray-700",
            "flex flex-col justify-center gap-2 py-2",
            className
        )}
        >
            {children}
        </div>
    )
}