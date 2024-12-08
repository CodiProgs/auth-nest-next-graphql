import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constant'

import './globals.scss'
import Providers from './providers'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
})

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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
