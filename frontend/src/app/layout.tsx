import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constant'

import '../assets/styles/globals.scss'

import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	openGraph: {
		type: 'website'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
