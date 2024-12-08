import type { Metadata } from 'next'
import Link from 'next/link'

import { Heading } from '@/components/ui/heading/Heading'

import { publicPages } from '@/config/pages.config'

import styles from './NotFound.module.scss'

export const metadata: Metadata = {
	title: 'Page not found'
}

export default function NotFoundPage() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.area}>
				<Heading>404. Page not found</Heading>
				<p>It seems than such a page does not exist.</p>
				<Link
					href={publicPages.home}
					className={styles.link}
				>
					Go to home
				</Link>
			</div>
		</div>
	)
}
