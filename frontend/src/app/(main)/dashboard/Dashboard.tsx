'use client'

import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { DASHBOARD_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './Dashboard.module.scss'
import { useLogout } from './useLogout'

const Dashboard: FC = () => {
	const { push } = useRouter()

	const { user, loading, error } = useProfile(push)
	const { logout } = useLogout()

	return (
		<div className={styles.wrapper}>
			{loading ? (
				<Loader />
			) : user ? (
				<>
					<Heading className={styles.heading}>Hello {user?.user.name}!</Heading>
					<Button
						className={styles.button}
						variant='default'
						onClick={() => push(DASHBOARD_URL.settings())}
					>
						Settings
					</Button>
					<Button
						className={styles.button}
						variant='outline'
						onClick={() => logout()}
					>
						Logout
					</Button>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default Dashboard
