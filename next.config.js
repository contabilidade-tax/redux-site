/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'www.flaticon.com',
    ],
    dangerouslyAllowSVG: true,
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
    ]
  }
}

module.exports = nextConfig
