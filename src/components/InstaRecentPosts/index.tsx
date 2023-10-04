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
        if (state?.data) {
            setPosts(state.data); // Atualizando o estado dos posts
            // Atualizando o estado de loading
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
    }, [state]);

    return (
        <section className={cn(
            'relative w-full h-full flex flex-1 flex-wrap flex-basis-1/3 gap-4 py-4 justify-center items-center',
            styles.instaPostsWrapper,
            // className
        )}
        >
            {isLoading ?
                <Skeleton.Root className="absolute w-full h-full z-50 flex flex-wrap items-center gap-4 justify-evenly" >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton.Item key={index} className="w-80 h-96 rounded-md bg-gray-400 shadow-xl" />
                    ))}
                </Skeleton.Root>
                :
                posts.map((post, index) => (
                    <div key={index} className={cn(
                        styles.instaPost,
                        'flex flex-col justify-start items-center relative px-4 pb-1 entrada'
                    )}>
                        <Card.Root className='rounded-3xl overflow-hidden shadow-xl'>
                            <Card.Post
                                post={post}
                                index={index}
                                className={cn(
                                    styles.__instaMidia,
                                    'relative top-2 py-2 my-auto'
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
