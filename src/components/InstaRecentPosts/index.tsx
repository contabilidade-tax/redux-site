'use client';
import { useEffect, useState } from 'react';

import { InstaPostsContextProvider, useInstaPostsContext } from '@/common/context/InstagramPostsContext';
import { cn } from '@/lib/utils';
import { Card } from './Card';
import { Skeleton } from '../Loading/Skeleton';

import styles from './InstaRecentPosts.module.scss'

type InstaRecentPostsProps = {
    className?: string
}

function InstaRecentPosts({ className }: InstaRecentPostsProps) {
    const { state } = useInstaPostsContext();
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<any[]>([]);  // Usando useState para posts

    useEffect(() => {
        let time: any;
        if (state?.data) {
            setPosts(state.data); // Atualizando o estado dos posts
            // Atualizando o estado de loading
            time = setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }

        return () => {
            clearTimeout(time);
        }
    }, [state]);

    return (
        <section className={cn(
            'w-full h-full flex overflow-x-auto gap-4 p-2',
            styles.instaPostsWrapper,
            className
        )}
        >
            {isLoading ?
                <Skeleton.Root className="relative w-full h-full !z-50 flex items-center gap-4 justify-evenly p-5" >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton.Item key={index} className="w-80 h-96 rounded-md bg-indigo-100 drop-shadow-custom" />
                    ))}
                </Skeleton.Root>
                :
                posts.map((post, index) => (
                    <div key={index} className={cn(
                        styles.instaPost,
                        'flex flex-col relative px-4 py-1 self-center drop-shadow-custom min-h-[32rem]'
                    )}>
                        <Card.Root className='rounded-3xl overflow-hidden w-full h-full'>
                            <Card.Post
                                post={post}
                                index={index}
                                className={cn(
                                    styles.instaMidia,
                                    'relative top-2 w-1/2'
                                )} />
                            <Card.Caption text={post.caption!} timestamp={post.timestamp!} />
                        </Card.Root>
                    </div>
                ))
            }
        </section>
    );
};

function InstaRecentPostsWrapper({ className }: InstaRecentPostsProps) {
    return (
        <InstaPostsContextProvider>
            <InstaRecentPosts className={className} />
        </InstaPostsContextProvider>
    );
}

export default InstaRecentPostsWrapper;
