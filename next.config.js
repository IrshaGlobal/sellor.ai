/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'sellor.ai', 'stores.sellor.ai'],
  },
}

module.exports = nextConfig