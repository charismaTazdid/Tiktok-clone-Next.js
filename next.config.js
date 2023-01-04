/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['scontent.fcgp15-1.fna.fbcdn.net', 'i.ibb.co', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
