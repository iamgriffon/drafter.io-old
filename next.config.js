/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.clerk.dev', 'ddragon.leagueoflegends.com']
  }
}

module.exports = nextConfig
