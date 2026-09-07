import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", 
  devIndicators: false,
  allowedDevOrigins: [
    "192.168.1.101",
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;