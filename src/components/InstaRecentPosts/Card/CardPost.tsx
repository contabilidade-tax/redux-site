import { InstaMidiaProps } from "@/types"
import Midia from "../Midia"
import { cn } from "@/lib/utils"

export function CardPost({ index, post, className, styles }: InstaMidiaProps) {
    return (
        // <div className="relative mx-4 -mt-6 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
        // </div>
        <Midia post={post} key={index} index={index} styles={styles} className={cn(className, 'relative mx-auto -translate-y-10')} />
    )
}