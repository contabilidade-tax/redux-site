'use client';
import { useEffect, useLayoutEffect, useState } from 'react';

import { InstaPostsContextProvider, useInstaPostsContext } from '@/common/context/InstagramPostsContext';
import { cn } from '@/lib/utils';
import { Card } from './Card';
import { Skeleton } from "@/components/ui/skeleton"

import styles from './InstaRecentPosts.module.scss'
import { InstaPostData } from '@/types';
import axios from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type InstaRecentPostsProps = {
    className?: string
    isMobile?: boolean
}

function InstaRecentPosts({ className }: InstaRecentPostsProps) {
    const { state, fetchData } = useInstaPostsContext();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<InstaPostData[]>([]);  // Usando useState para posts
    const [user, setUser] = useState<string>();  // Usando useState para posts

    const fetchInstaData = async () => {
        try {
            const posts = await fetchData()

            return posts;
        } catch (error: any) {
            console.log(error.message);
            // redirect('https://redux.app.br')
        };
    }

    const fetchAllData = async () => {
        const posts = await fetchInstaData()
        setPosts(posts!);
        setUser(posts![0].username!);
    }

    // useEffect(() => {
    //     console.log(user)
    // }, [user])

    useEffect(() => {
        if (state?.data && state.data.length > 0) {
            // Ordena por data
            const orderedPosts = state.data.sort((a, b) => Date.parse(b.timestamp!) - Date.parse(a.timestamp!))
            // Seleciona os 10 primeiros
            const posts = orderedPosts.slice(0, 10)
            // Enfim, seta o estado
            setPosts(orderedPosts);
            setLoading(false);
        }
    }, [state]);


    useLayoutEffect(() => {
        fetchAllData().then()
    }, []);

    return (
        <>
            {/* USER INFO */}
            <div className="currentUser relative min-w-52 w-max h-10 flex justify-center px-4 left-1/2 -translate-x-1/2 border border-[#191919] text-white font-bold rounded-full text-xl text-center bg-[#191919]">
                <Link className='my-auto' target='_blank' href={`https://instagram.com/${user ?? ''}`}>
                    <p className='text-center'>@{user ?? ' Loading...'}</p>
                </Link>
            </div>
            {/* POSTS */}
            <section className={cn(
                'w-full h-full flex overflow-x-auto gap-4 py-4',
                styles.instaPostsWrapper,
                className
            )}
            >
                {loading ?
                    <div className="relative h-full !z-50 flex items-center gap-4 justify-evenly p-5" >
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="w-[300px] max-h-[384px] min-h-[300px] rounded-md bg-indigo-100 drop-shadow-custom border border-black" />
                        ))}
                    </div>
                    :
                    posts.map((post, index) => (
                        <div key={index} className={cn(
                            styles.instaPost,
                            'relative px-4 self-start drop-shadow-custom h-[90%]',
                            // { 'scale:.8': isMobile },
                        )}>
                            {/* <Card.Root className='rounded-3xl overflow-hidden w-full h-full md:!py-8 xsm:py-2 px-1 space-y-1'> */}
                            <Card.Root className='rounded-3xl w-full max-h-[34rem] min-h-[30rem] h-max flex flex-col justify-around'>
                                <Card.Post
                                    post={post}
                                    index={index}
                                    className={cn(
                                        styles.instaMidia,
                                        'relative w-1/2',
                                        '!max-h-[335px]'
                                    )} />
                                <Card.Caption className='self-end max-h-[120px]' text={post.caption!} timestamp={post.timestamp!} />
                            </Card.Root>
                        </div >
                    ))
                }
            </section >
        </>
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
