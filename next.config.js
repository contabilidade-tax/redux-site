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
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "https://redux.app.br" }, // replace this your actual origin
          { key: "Access-Control-Allow-Origin", value: "http://192.168.10.57" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  },
}

module.exports = nextConfig
