import type { MetadataRoute } from 'next'
import { env } from 'process'

export default function sitemap(): MetadataRoute.Sitemap {
    const home = env.NEXT_PUBLIC_HOME ?? 'https://redux.app.br';
    return [
        {
            url: home,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${home}/trabalhe-conosco`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}