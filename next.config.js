/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  // output: 'export',
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "www.flaticon.com",
      "scontent.cdninstagram.com",
      "contabilidade.gruporedux.com.br",
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      "@heroicons/react",
      "gsap",
      "ioredis",
      "swiper",
      "tailwind-merge",
      "react-input-mask",
      "react-google-recaptcha",
      "@radix-ui/*",
      "react-email/*",
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "./src/");
    return config;
  },
  async redirects() {
    return [
      {
        source: "/contato",
        destination: `https://api.whatsapp.com/send?phone=5588996960337&text=${encodeURIComponent(
          "Olá, vim pelo site e gostaria de saber mais sobre seus serviços!"
        )}`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "cache", // Configura o cabeçalho de controle de cache para evitar o cache.
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          // { key: "", value: "" },
          { key: "Accept-Encoding", value: "brotli, compress, gzip" },
          { key: "hreflang", value: "pt-BR" },
          { key: "Content-Language", value: "pt-BR" },
          { key: "Vary", value: "nosniff" },
          { key: "Max-Snippet", value: "-1" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "Cache-Control", value: "max-age=1000, must-revalidate" },
          { key: "X-Robots-Tag", value: "index, follow" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/instaData",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
        ],
      },
      {
        source: "/loading",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
        ],
      },
      {
        source: "/email",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://contabilidade.gruporedux.com.br",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://192.168.10.57:3004",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3004",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
