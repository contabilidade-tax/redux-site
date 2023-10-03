import Header from '@/components/Header'
import InstaRecentPosts from '@/components/InstaRecentPosts'
import { cn } from '@/lib/utils'

export default function Sobre() {
    return (
        <>
            <Header />
            <main className={cn('w-full h-[90vh] flex items-center justify-center')}>
                <section className='overflow-y-scroll w-2/3 h-4/5 flex justify-center items-center'>
                    <InstaRecentPosts />
                </section>
            </main>
        </>
    )
}
