import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constant'

import { GoogleSuccess } from './GoogleSuccess'

export const metadata: Metadata = {
	title: 'Authorization in progress',
	...NO_INDEX_PAGE
}

export default function GoogleSuccessPage() {
	return <GoogleSuccess />
}
