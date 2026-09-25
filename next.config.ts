// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dealjoy-cdn-dydre3ftcse4a9ap.z01.azurefd.net",
      },
    ],
  },
};

export default nextConfig;