/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  // output: 'export',
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'www.flaticon.com',
      'scontent.cdninstagram.com'
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src/');
    return config;
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/home',
      //   permanent: true,
      // },
      {
        source: '/contato',
        destination: `https://wa.me/send?phone=5588999660188&text=${encodeURIComponent('Olá, gostaria de saber mais sobre seus serviços')}`,
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'cache', // Configura o cabeçalho de controle de cache para evitar o cache.
          },
        ],
      },
      {
        source: "/:path*", headers: [
          { key: "hreflang", value: "pt-BR" },
          { key: "Content-Language", value: "pt-BR" },
          { key: "Vary", value: "nosniff" },
          { key: "X-Robots-Tag", value: "index, follow" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Cache-Control", value: "max-age=3600, must-revalidate" }
        ]
      },
      {
        source: "/instaData",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
        ]
      },
      {
        source: "/loading",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
        ]
      },
      {
        source: "/email",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
        ]
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://redux.app.br" }, // replace this your actual origin
          { key: "Access-Control-Allow-Origin", value: "http://192.168.10.57:3004" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  },
}

module.exports = nextConfig
