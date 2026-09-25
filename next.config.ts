/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net',
      },
    ],
  },
};

module.exports = nextConfig;