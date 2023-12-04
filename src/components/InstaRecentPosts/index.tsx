'use client';
import { useEffect, useState } from 'react';

import { InstaPostsContextProvider, useInstaPostsContext } from '@/common/context/InstagramPostsContext';
import { cn } from '@/lib/utils';
import { Card } from './Card';
import { Skeleton } from '../Loading/Skeleton';

import styles from './InstaRecentPosts.module.scss'
import { InstaPostData } from '@/types';

type InstaRecentPostsProps = {
    className?: string
    isMobile?: boolean
}

function InstaRecentPosts({ className, isMobile }: InstaRecentPostsProps) {
    const { state } = useInstaPostsContext();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<InstaPostData[]>([]);  // Usando useState para posts

    useEffect(() => {
        if (state?.data && state.data.length > 0) {
            setPosts(state.data.sort((a, b) => Date.parse(b.timestamp!) - Date.parse(a.timestamp!)));
            setIsLoading(false);
        }
    }, [state]);


    return (
        <section className={cn(
            'w-full h-full flex overflow-x-auto gap-4 py-6',
            styles.instaPostsWrapper,
            className
        )}
        >
            {isLoading ?
                <Skeleton.Root className="relative w-full h-full !z-50 flex items-center gap-4 justify-evenly p-5" >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton.Item key={index} className="max-w-[320px] max-h-[384px] w-[16.5%] h-full rounded-md bg-indigo-100 drop-shadow-custom" />
                    ))}
                </Skeleton.Root>
                :
                posts.map((post, index) => (
                    <div key={index} className={cn(
                        styles.instaPost,
                        'flex flex-col relative px-4 self-center drop-shadow-custom h-[90%]',
                        { 'scale:.8': isMobile },
                    )}>
                        <Card.Root className='rounded-3xl overflow-hidden w-full h-full py-8 px-1 space-y-1'>
                            <Card.Post
                                post={post}
                                index={index}
                                className={cn(
                                    styles.instaMidia,
                                    'relative top-2 w-1/2'
                                )} />
                            <Card.Caption className='self-end' text={post.caption!} timestamp={post.timestamp!} />
                        </Card.Root>
                    </div>
                ))
            }
        </section>
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
