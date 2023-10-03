'use client';
import { useEffect } from 'react';

import { InstaPostsContextProvider, useInstaPostsContext } from '@/common/context/InstagramPostsContext';
import styles from './InstaRecentPosts.module.scss'
import Midia from './Midia';
import { cn } from '@/lib/utils';
import Caption from './Caption';

const InstaRecentPosts = () => {
    const { state } = useInstaPostsContext();
    const posts = state!.data

    useEffect(() => {
    }, [state])

    return (
        <section className={cn('w-full h-full flex flex-1 flex-wrap flex-basis-1/3 gap-4 py-4 justify-center items-center', styles.instaPostsWrapper)}>
            {posts ?
                posts.map((post, index) => (
                    <div className={cn(
                        styles.instaPost,
                        'bg-[#eee] rounded-xl border-2 border-primary-color',
                        'flex flex-col justify-center items-start relative'
                    )}>
                        <Midia key={index}
                            post={post}
                            index={index}
                            styles={styles}
                            className={cn(
                                styles.__instaMidia,
                                'relative top-2 py-2 my-auto'
                            )} />
                        <Caption text={post.caption!}>

                        </Caption>
                    </div>
                )) : `Não veio nada ${posts}`
            }
        </section>
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
