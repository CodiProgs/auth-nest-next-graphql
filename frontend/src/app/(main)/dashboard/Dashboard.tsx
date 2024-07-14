'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { DASHBOARD_URL } from '@/config/url.config'

import { useLogout } from '@/hooks/useLogout'
import { useProfile } from '@/hooks/useProfile'

import styles from './Dashboard.module.scss'

const Dashboard: FC = () => {
	const { push } = useRouter()
	const { logout } = useLogout()

	const { user, loading } = useProfile(true, push)

	return (
		<div className={styles.wrapper}>
			{loading ? (
				<Loader />
			) : user ? (
				<>
					<Heading className={styles.heading}>Hello {user?.user.name}!</Heading>
					<Button
						className={styles.button}
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
