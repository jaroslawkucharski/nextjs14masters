/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
		typedRoutes: false,
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


export default nextConfig;
