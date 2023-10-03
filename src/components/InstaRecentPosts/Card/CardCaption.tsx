import Caption from "@/components/InstaRecentPosts/Caption"

type CardCaptionProps = {
    title?: string
    text: string
}

export function CardCaption({ title, text }: CardCaptionProps) {
    return (
        <div className="bg-white">
            <h5 className="mb-1 ml-2 font-sans text-md font-semibold leading-snug tracking-normal text-blue-gray-900">
                {title ? title : 'Tailwind Card'}
            </h5>
            <Caption text={text} />
        </div>
    )
}