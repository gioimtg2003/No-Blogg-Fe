import type { NextConfig } from 'next';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '*.nguyenconggioi.local',
    'nguyenconggioi.local',
    '*.nguyenconggioi.local:3000',
  ],
  async rewrites() {
    const destinationUrl = API_URL || 'http://localhost:3000/';
    return [
      {
        source: '/api/v1/:path*',
        destination: `${destinationUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
