'use client'

import { useRouter } from 'next/navigation'
import { FC } from 'react'

import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'

import { removeFromStorage } from '@/services/auth-token.service'

import { PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './Dashboard.module.scss'
import { useLogoutMutation } from '@/gql/graphql'

const Dashboard: FC = () => {
	const { user } = useProfile()

	const { push } = useRouter()

	if (!user) return null

	const [mutateLogout] = useLogoutMutation()

	const logout = () => {
		removeFromStorage()
		mutateLogout()
		push(PUBLIC_URL.auth())
	}

	return (
		<div className='px-6'>
			<div className={styles.wrapper}>
				<Heading className={styles.heading}>Hello {user.user.name}!</Heading>
				<Button
					className={styles.button}
					variant='outline'
					onClick={() => logout()}
				>
					Logout
				</Button>
			</div>
		</div>
	)
}

export default Dashboard
