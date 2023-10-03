import Image from 'next/image'
import { cn } from "@/lib/utils";
import VideoPlayer from '@/components/InstaRecentPosts/VideoPlayer';
import { InstaMidiaProps } from '@/types';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import Caption from '../Caption';

export default function Midia({ post, index, styles, className }: InstaMidiaProps) {

    return (
        <div className={cn('relative', className)}>
            <div className={styles.postImage}>
                <div className={cn(styles.__goToInstagram, 'absolute top-3 right-3 z-10')}>
                    <Link href={post.permalink!} target='_blank' className={styles.__postLink}>
                        <Instagram
                            className='text-white shadow-md'
                            fill='rgb(230, 80, 130)'
                            size={40}
                        />
                    </Link>
                </div>
                {post.media_type !== 'VIDEO' ?
                    <Image
                        className={cn(
                            styles.__postMidia,
                            'object-contain',
                            { '!object-cover': index === 0 }
                        )}
                        key={index}
                        src={post.media_url!}
                        alt={post.permalink!}
                        width={1000}
                        height={1000}
                        loading='eager'
                    />
                    :
                    <VideoPlayer
                        src={post.media_url!}
                        className={cn(styles.__postMidia, styles.__postMidiaVideo)}
                    />
                }
            </div>
        </div>
    )
}