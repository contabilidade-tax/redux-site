'use client';
import { useEffect, useLayoutEffect, useState } from 'react';

import { InstaPostsContextProvider, useInstaPostsContext } from '@/common/context/InstagramPostsContext';
import { cn } from '@/lib/utils';
import { Card } from './Card';
import { Skeleton } from "@/components/ui/skeleton"

import styles from './InstaRecentPosts.module.scss'
import { InstaPostData } from '@/types';

type InstaRecentPostsProps = {
    className?: string
    isMobile?: boolean
}

function InstaRecentPosts({ className, isMobile }: InstaRecentPostsProps) {
    const { state, fetchData, fetchToken } = useInstaPostsContext();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<InstaPostData[]>([]);  // Usando useState para posts

    useEffect(() => {
        console.log(state)
        if (state?.data && state.data.length > 0) {
            setPosts(state.data.sort((a, b) => Date.parse(b.timestamp!) - Date.parse(a.timestamp!)));
            setLoading(false);
        }
    }, [state]);


    useLayoutEffect(() => {
        console.log(loading)
        fetchToken()
            .then(token => {
                if (token) {
                    return fetchData(token);
                } else {
                    throw new Error('Token não recebido');
                }
            })
            .then(data => {/* Aqui você manipula os dados recebidos */ })
            .catch((error: any) => { console.log(error.message) });
    }, []);

    return (
        <section className={cn(
            'w-full h-full flex overflow-x-auto gap-4 py-6',
            styles.instaPostsWrapper,
            className
        )}
        >
            {loading ?
                <div className="relative min-w-full h-full !z-50 flex items-center gap-4 justify-evenly p-5" >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="w-[300px] max-h-[384px] min-h-[300px] rounded-md bg-indigo-100 drop-shadow-custom border border-black" />
                    ))}
                </div>
                :
                posts.map((post, index) => (
                    <div key={index} className={cn(
                        styles.instaPost,
                        'flex flex-col relative px-4 self-center drop-shadow-custom h-[90%]',
                        // { 'scale:.8': isMobile },
                    )}>
                        {/* <Card.Root className='rounded-3xl overflow-hidden w-full h-full md:!py-8 xsm:py-2 px-1 space-y-1'> */}
                        <Card.Root className='rounded-3xl w-full h-full md:!pt-2 md:!pb-4 xsm:py-2 space-y-1'>
                            <Card.Post
                                post={post}
                                index={index}
                                className={cn(
                                    styles.instaMidia,
                                    'relative top-2 w-1/2',
                                    '!max-h-[335px]'
                                )} />
                            <Card.Caption className='self-end' text={post.caption!} timestamp={post.timestamp!} />
                        </Card.Root>
                    </div >
                ))
            }
        </section >
    );
};

function InstaRecentPostsWrapper({ className, isMobile }: InstaRecentPostsProps) {
    return (
        <InstaPostsContextProvider>
            <InstaRecentPosts className={className} isMobile={isMobile} />
        </InstaPostsContextProvider>
    );
}

export default InstaRecentPostsWrapper;
