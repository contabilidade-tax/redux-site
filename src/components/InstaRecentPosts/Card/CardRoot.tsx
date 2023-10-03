import { cn } from "@/lib/utils";

type CardRootProps = {
    children: React.ReactNode;
}

export function CardRoot({ children }: CardRootProps) {
    return (
        <div className={cn(
            "relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md",
            "justify-center items-start"
        )}
        >
            {children}
        </div>
    )
}