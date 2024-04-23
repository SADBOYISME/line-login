/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://profile.line-scdn.net",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
