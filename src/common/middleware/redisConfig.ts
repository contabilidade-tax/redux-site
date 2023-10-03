import { InstaPostData } from '@/types'
import Redis, { RedisOptions } from 'ioredis'
import { v4 } from 'uuid'

const redisConfigurations = {
    port: process.env.NEXT_PUBLIC_REDIS_PORT ? parseInt(process.env.NEXT_PUBLIC_REDIS_PORT) : undefined,
    password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
    host: process.env.NEXT_PUBLIC_REDIS_HOST,
}

function getRedisConfiguration(): {
    port: number | undefined
    host: string | undefined
    password: string | undefined
} {
    return redisConfigurations
}


class createRedisInstance {
    private static instance: Redis | null = null;

    private constructor() {
        // Private constructor to prevent instantiation from outside
    }

    public static getInstance(config = getRedisConfiguration()): Redis {
        if (this.instance === null) {
            try {
                const options: RedisOptions = {
                    host: config.host,
                    lazyConnect: true,
                    showFriendlyErrorStack: true,
                    enableAutoPipelining: true,
                    maxRetriesPerRequest: 0,
                    retryStrategy: (times: number) => {
                        if (times > 3) {
                            throw new Error(`[Redis] Could not connect after ${times} attempts`);
                        }

                        return Math.min(times * 200, 1000);
                    },
                };

                if (config.port) {
                    options.port = config.port;
                }

                if (config.password) {
                    options.password = config.password;
                }

                this.instance = new Redis(options);

                this.instance.on('error', (error: unknown) => {
                    console.warn('[Redis] Error connecting', error);
                });

            } catch (e) {
                throw new Error(`[Redis] Could not create a Redis instance`);
            }
        }

        return this.instance;
    }
}

const redis = createRedisInstance.getInstance()

export function getDate(date = new Date()): string {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${year}/${month}/${day}`
}
export async function setRedisRegister(data: InstaPostData[] | string) {
    const key = `last_insta_posts-${getDate()}`
    const MAX_AGE = 60_000 * 60 * 24; // 1 hour
    const EXPIRY_MS = `PX`; // milliseconds

    return await redis.set(key, JSON.stringify(data), EXPIRY_MS, MAX_AGE)
}

export async function getRedisValue(key: string): Promise<string | null> {
    try {
        const value = await redis.get(key);
        return value;
    } catch (error) {
        console.error('Erro ao obter valor do Redis', error);
        throw error; // Ou você pode optar por retornar null ou algum valor padrão
    }
}

export async function clearCache() {
    redis.del(`last_insta_posts-${getDate()}`)
}

function getRandomRedisKey(): string {
    return v4();
}
