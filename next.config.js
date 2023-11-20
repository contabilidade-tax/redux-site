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
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, './src/');
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      // {
      //   source: '/contato',
      //   destination: `https://wa.me/send?phone=5588999660188&text=${encodeURIComponent('Ola, gostaria de saber mais sobre seus serviços')}`,
      //   permanent: true,
      // },
    ]
  },
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache', // Configura o cabeçalho de controle de cache para evitar o cache.
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
