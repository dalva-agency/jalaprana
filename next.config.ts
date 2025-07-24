const nextConfig = {
  experimental: {
    // turn off Next’s new font pipeline
    optimizeFonts: false,
  },
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/assets/images/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
