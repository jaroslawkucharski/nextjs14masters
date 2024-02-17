/** @type {import('next').NextConfig} */
import mdx from "@next/mdx"

const nextConfig = {
  experimental: {
		typedRoutes: true,
    mdxRs: true
	},
  pageExtensions: ["ts", "tsx", "mdx"],
  redirects: async () => {
    return [
      {
        source: '/products',
        destination: '/products/1',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-ourstore.hyperfunctor.com',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default mdx()(nextConfig);