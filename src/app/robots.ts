import type { MetadataRoute } from 'next'
import { env } from 'process'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: ['*', 'Googlebot', 'Googlebot-image', 'Mediapartners-Google', 'Adsbot-Google', 'Adsbot-Google'],
                allow: '/*',
                disallow: ['/api/*', '/instaData', '/redirect'],
            },
            {
                userAgent: ['seekbot', 'Exabot', 'Slurp', 'Cliqzbot'],
                disallow: '/',
            }
        ],
        sitemap: `${env.NEXT_PUBLIC_HOME ?? 'https://contabilidade.gruporedux.com.br'}/sitemap.xml`,
    }
}