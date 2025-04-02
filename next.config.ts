import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{}],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
