'use client'

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import { Loader } from '@/components/ui/Loader'

import { publicPages } from '@/config/pages.config'

import { useAuth } from '@/hooks/useAuth'

import styles from './Header.module.scss'
import { UserMenu } from './user-menu/UserMenu'

const Header: FC = () => {
	const { isAuth } = useAuth()

	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<div className={styles.header}>
			<Link href={publicPages.home}>Home</Link>
			{!isMounted ? (
				<Loader className={styles.loader} />
			) : isAuth ? (
				<UserMenu />
			) : (
				<Link
					className={styles.link}
					href={publicPages.auth}
				>
					login
				</Link>
			)}
		</div>
	)
}

export { Header }
