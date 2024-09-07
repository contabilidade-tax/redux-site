import type { MetadataRoute } from 'next'
import { env } from 'process'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/*',
                disallow: ['/api/*', '/instaData', '/redirect'],
            },
            {
                userAgent: ['seekbot', 'Exabot', 'Slurp', 'Cliqzbot'],
                disallow: '/',
            }
        ],
        sitemap: `${env.NEXT_PUBLIC_HOME ?? 'https://redux.app.br'}/sitemap.xml`,
    }
}