/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'sellor.ai', 'stores.sellor.ai'],
  },
}

module.exports = nextConfig