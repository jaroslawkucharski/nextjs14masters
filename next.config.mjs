/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
		typedRoutes: true,
    mdxRs: true
	},
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'naszsklep-api.vercel.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};


const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
