/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'www.flaticon.com',
      'scontent.cdninstagram.com'
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: true,
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
      {
        source: '/contato',
        destination: 'https://wa.me/5588997890526?text=Teste2',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
