import type { MetadataRoute } from 'next'
import { env } from 'process'

export default function sitemap(): MetadataRoute.Sitemap {
    const home = env.NEXT_PUBLIC_HOME ?? 'https://contabilidade.gruporedux.com.br';
    return [
        {
            url: home,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${home}/trabalhe-conosco`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${home}#sobre`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: `${home}#servicos`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
    ]
}