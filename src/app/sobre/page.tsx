import Header from '@/components/Header'
import InstaRecentPosts from '@/components/InstaRecentPosts'
import { cn } from '@/lib/utils'

export default function Sobre() {
    return (
        <>
            <Header />
            <main className={cn('w-full h-[90vh] flex items-center justify-center')}>
                <section className='border-2 border-black w-1/2 h-1/2 flex justify-center items-center'>
                    <InstaRecentPosts />
                </section>
            </main>
        </>
    )
}
