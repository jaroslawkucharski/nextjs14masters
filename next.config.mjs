/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
		typedRoutes: true,
    mdxRs: true
	},
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
