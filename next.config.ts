import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [40, 65, 75, 80, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
