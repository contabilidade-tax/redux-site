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

type InstaRecentPostsProps = {
    className?: string
    isMobile?: boolean
}

type instaUser = {
    access_token: string
    user_id: string
    username: string
} | null

function InstaRecentPosts({ className }: InstaRecentPostsProps) {
    const { state, fetchData } = useInstaPostsContext();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<InstaPostData[]>([]);  // Usando useState para posts
    const [user, setUser] = useState<instaUser>();  // Usando useState para posts

    const fetchInstaData = async () => {
        try {
            let posts: InstaPostData[] = [];
            posts = await fetchData();

            return posts;
        } catch (error: any) { console.log(error.message) };
    }

    const fetchUserData = async () => {
        const home = process.env.NEXT_PUBLIC_HOME!
        try {
            const InstagramData = await axios.get(`${home}/api/currentUser`, {})

            return InstagramData.data;

        } catch (error: any) { console.log(error.message) };

    }

    const fetchAllData = async () => {
        const [instaPosts, userData] = await Promise.all([fetchInstaData(), fetchUserData()])
        setPosts(instaPosts!);
        setUser(userData);
    }

    useEffect(() => {
        if (state?.data && state.data.length > 0) {
            setPosts(state.data.sort((a, b) => Date.parse(b.timestamp!) - Date.parse(a.timestamp!)));
            setLoading(false);
        }
    }, [state]);


    useLayoutEffect(() => {
        fetchAllData().then()
    }, []);

    return (
        <>
            {/* USER INFO */}
            {user && <div className="currentUser relative min-w-52 w-max h-10 flex justify-center px-4 left-1/2 -translate-x-1/2 border border-[#191919] text-white font-bold rounded-full text-xl text-center bg-[#191919]">
                <Link className='my-auto' target='_blank' href={`https://instagram.com/${user.username}`}>@{user.username}</Link>
            </div>
            }
            {/* POSTS */}
            <section className={cn(
                'w-full h-full flex overflow-x-auto gap-4 py-4',
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
