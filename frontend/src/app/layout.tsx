import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constant'

import '../assets/styles/globals.scss'

import Providers from './providers'

const font = Open_Sans({
	subsets: ['latin'],
	weight: ['400', '600'],
	style: ['normal']
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	openGraph: {
		type: 'website',
		siteName: SITE_NAME
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className='dark'
		>
			<body className={font.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
