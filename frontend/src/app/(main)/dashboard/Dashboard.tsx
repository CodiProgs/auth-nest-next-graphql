'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/form-elements/button/Button'
import { Heading } from '@/components/ui/heading/Heading'

import { authService } from '@/services/auth.service'

import { dashboardPages } from '@/config/pages.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './Dashboard.module.scss'

const Dashboard: FC = () => {
	const { push } = useRouter()

	const { user, loading, error } = useProfile()

	return (
		<div className={styles.wrapper}>
			{loading ? (
				<Loader />
			) : !error && user ? (
				<>
					<Heading className={styles.heading}>Hello {user.name}!</Heading>
					<Button
						className={styles.button}
						onClick={() => push(dashboardPages.settings)}
					>
						Settings
					</Button>
					<Button
						className={styles.button}
						variant='outline'
						onClick={() => authService.logout(push)}
					>
						Logout
					</Button>
				</>
			) : (
				<>
					<Heading className={styles.heading}>Error</Heading>
					<p>{error?.message}</p>
				</>
			)}
		</div>
	)
}

export { Dashboard }
