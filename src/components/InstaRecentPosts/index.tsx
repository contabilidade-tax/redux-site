'use client';
import Image from 'next/image';
import { InstaPostsContextProvider, useInstaPostsContext } from '@/common/context/InstagramPostsContext';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import styles from './InstaRecentPosts.module.scss'

const InstaRecentPosts = () => {
    const { state } = useInstaPostsContext();
    const posts = state!.data

    useEffect(() => {
    }, [state])

    return (
        <div className='w-full h-full flex flex-1 flex-wrap mx-8 gap-4'>
            {posts ?
                posts.map((post, index) => (
                    <div className={cn('', styles.instaPost)}>
                        <div className={styles.postImage}>
                            <a href={post.permalink!}>
                                <img
                                    className={cn('', styles.postImg)}
                                    key={index}
                                    src={post.media_url!}
                                    alt={post.caption!}
                                    loading='lazy'
                                />
                            </a>
                        </div>
                    </div>
                )) : `Não veio nada ${posts}`
            }
        </div>
    );
};

function InstaRecentPostsWrapper() {
    return (
        <InstaPostsContextProvider>
            <InstaRecentPosts />
        </InstaPostsContextProvider>
    );
}

export default InstaRecentPostsWrapper;
