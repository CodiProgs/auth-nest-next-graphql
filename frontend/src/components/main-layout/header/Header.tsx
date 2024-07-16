'use client'

import Link from 'next/link'
import { FC } from 'react'

import { PUBLIC_URL } from '@/config/url.config'

import { useAuth } from '@/hooks/useAuth'

import styles from './Header.module.scss'
import UserMenu from './user-menu/UserMenu'

const Header: FC = () => {
	const { user } = useAuth()

	return (
		<div className={styles.header}>
			<Link href={PUBLIC_URL.home()}>Home</Link>
			{user ? (
				<UserMenu />
			) : (
				<Link
					className={styles.link}
					href={PUBLIC_URL.auth()}
				>
					login
				</Link>
			)}
		</div>
	)
}

export default Header
