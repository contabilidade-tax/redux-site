import Caption from "@/components/InstaRecentPosts/Caption"
import { cn } from "@/lib/utils";

type CardCaptionProps = {
    className?: string,
    timestamp: string
    text: string
}

function convertToPublishedFormat(timestamp: string): string {
    const datePart = timestamp.split('T')[0];  // Pegue a parte da data, ignorando a hora
    const [year, month, day] = datePart.split('-'); // Divida a data em ano, mês e dia

    return `Publicado em ${day}.${month}.${year}`;
}

export function CardCaption({ timestamp, text, className }: CardCaptionProps) {
    return (
        <div className={cn("bg-white relative mx-auto flex justify-evenly flex-col", className)}>
            <h5 className="font-sans text-md text-center font-semibold leading-snug tracking-normal text-blue-gray-900">
                {convertToPublishedFormat(timestamp)}
            </h5>
            <Caption text={text} />
        </div>
    )
}