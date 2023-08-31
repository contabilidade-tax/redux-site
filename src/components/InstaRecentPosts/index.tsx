interface RecentPostsProps {
    className?: string;
}

export default function RecentPosts({ className }: RecentPostsProps) {
    return (
        <section className={className}>
            <iframe
                src='https://www.juicer.io/api/feeds/hiveoficial_/iframe'
                frameBorder={0}
                className='h-[90%] w-full'
                // height='1000'
                style={{ display: 'block', margin: '0 auto' }}>
            </iframe>
        </section >
    )
}