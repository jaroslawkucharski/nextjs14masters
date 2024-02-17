/** @type {import('next').NextConfig} */
import mdx from "@next/mdx"

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
        hostname: 'media.graphassets.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default mdx()(nextConfig);