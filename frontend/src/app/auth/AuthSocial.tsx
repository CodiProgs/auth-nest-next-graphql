'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

import { SERVER_URL } from '@/config/api.config'

import styles from './Auth.module.scss'
import GoogleLogo from '@/../public/google-logo.svg'

const AuthSocial: FC = () => {
	const { push } = useRouter()

	return (
		<div className={styles.social}>
			<h2>Or login with</h2>
			<div className={styles.social__buttons}>
				<button
					onClick={() => {
						push(`${SERVER_URL}/auth/google`)
					}}
					className={styles.social__button}
				>
					<Image
						src={GoogleLogo}
						alt='Google'
						width={24}
						height={24}
					/>
					<span>Google</span>
				</button>
			</div>
		</div>
	)
}

export { AuthSocial }
