import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL
	},
	sassOptions: {
		silenceDeprecations: ['legacy-js-api']
	}
}

export default nextConfig
