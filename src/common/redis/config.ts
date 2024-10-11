import { InstaPostData } from '@/types'
import Redis, { RedisOptions } from 'ioredis'

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

class RedisInstance {
    private static instance: Redis | null = null;

    private constructor() { }

    public static getInstance(config = getRedisConfiguration()): Redis {
        if (!this.instance) {
            this.instance = this.createRedisInstance(config);
        }
        return this.instance;
    }

    private static createRedisInstance(config: ReturnType<typeof getRedisConfiguration>): Redis {
        const options: RedisOptions = {
            host: config.host,
            lazyConnect: true,
            showFriendlyErrorStack: true,
            enableAutoPipelining: true,
            maxRetriesPerRequest: 0,
            retryStrategy: this.retryStrategy,
            ...(config.port && { port: config.port }),
            ...(config.password && { password: config.password }),
        };

        const redis = new Redis(options);

        redis.on('error', (error: unknown) => {
            console.warn('[Redis] Erro de conexão', error);
        });

        return redis;
    }

    private static retryStrategy(times: number): number | void {
        if (times > 3) {
            throw new Error(`[Redis] Não foi possível conectar após ${times} tentativas`);
        }
        return Math.min(times * 200, 1000);
    }
}

const redis = RedisInstance.getInstance()

export function getDateTime(date = new Date()): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');

    return `${year}/${month}/${day} H${hours}`;
}

export async function setRedisRegister(data: InstaPostData[] | string, customKey?: string) {
    const key = customKey ?? `last_insta_posts-${getDateTime()}`;
    const MAX_AGE = 60_000 * 60; // 1 hora
    const EXPIRY_MS = 'PX'; // milissegundos

    return redis.set(key, JSON.stringify(data), EXPIRY_MS, MAX_AGE);
}

export async function getRedisValue(key: string): Promise<string | null> {
    try {
        return await redis.get(key);
    } catch (error) {
        console.error('Erro ao obter valor do Redis', error);
        return null;
    }
}

export async function clearCache(customKey?: string): Promise<boolean> {
    const key = customKey ?? `last_insta_posts-${getDateTime()}`;
    try {
        const deletedCount = await redis.del(key);
        if (deletedCount === 0) {
            console.warn(`[Redis] Nenhuma chave encontrada para exclusão: ${key}`);
            return false;
        }
        console.log(`[Redis] Cache limpo com sucesso: ${key}`);
        return true;
    } catch (error) {
        console.error('[Redis] Erro ao limpar cache:', error);
        return false;
    }
}
