import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow unoptimized images so local PNGs work without next/image server config
    unoptimized: true,
  },
};

export default nextConfig;
