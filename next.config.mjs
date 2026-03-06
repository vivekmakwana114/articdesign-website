/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "articdesign-frontend.vercel.app",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "articdesign-devbucket.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "royaltiesapp-bucket.s3.us-east-2.amazonaws.com",
      },
    ],
  },
  reactStrictMode: true,
  // Temporary debug settings for Fast Refresh
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
