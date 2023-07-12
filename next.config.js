/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'images.unsplash.com',
      'www.flaticon.com',
      '*',
    ],
    dangerouslyAllowSVG: true,
  },
}

module.exports = nextConfig
