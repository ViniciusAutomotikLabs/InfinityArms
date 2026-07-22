import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/products.csv",
        destination: "/api/products-csv",
      },
    ];
  },
};

export default nextConfig;
