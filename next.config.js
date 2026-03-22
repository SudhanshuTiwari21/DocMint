/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  // Next 14: top-level serverExternalPackages is Next 15+ only.
  // Externalize pdf-parse or webpack bundles it → ENOENT on ./test/data/*.pdf at build time.
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

module.exports = nextConfig;
