/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["4dqvmtgh-3000.brs.devtunnels.ms", "localhost:3000"],
    },
  },
};

export default nextConfig;
