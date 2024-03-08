/** @type {import('next').NextConfig} */
import mdx from "@next/mdx"

const nextConfig = {
  experimental: {
		typedRoutes: true,
    mdxRs: true,
    serverActions: true,
	},
  pageExtensions: ["ts", "tsx", "mdx"],
  redirects: async () => {
    return [
      {
        source: '/products',
        destination: '/products/1',
        permanent: false,
      },
      {
        source: '/categories/:slug',
        destination: '/categories/:slug/1',
        permanent: false,
      },
      {
        source: '/orders',
        destination: '/orders/1',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.GRAPHQL_IMAGE_URL,
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default mdx()(nextConfig);