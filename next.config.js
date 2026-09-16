/** @type {import('next').NextConfig} */

const nextConfig = {
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },

      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
      },

      {
        protocol: 'https',
        hostname: 'uploads.mangadex.org',
      },

      {
        protocol: 'https',
        hostname: 'og.mangadex.org',
      },

      {
        protocol: 'https',
        hostname: 'books.google.com',
      },

      {
        protocol: 'https',
        hostname: 'books.googleusercontent.com',
      },

      {
        protocol: 'https',
        hostname: 'archive.org',
      },

      {
        protocol: 'https',
        hostname: '**.us.archive.org',
      },

      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

export default nextConfig;