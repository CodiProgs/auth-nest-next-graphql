'use client'

import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'

import { DASHBOARD_URL } from '@/config/url.config'

import { useLogout } from '@/hooks/useLogout'

import styles from './UserMenu.module.scss'

const UserMenuModal = forwardRef<HTMLUListElement>(({}, ref) => {
	const { logout } = useLogout()

	return (
		<ul
			ref={ref}
			className={styles.menu}
		>
			<li className={styles.item}>
				<Link
					href={DASHBOARD_URL.home()}
					className={styles.link}
				>
					<User className={styles.icon} />
					<span>Profile</span>
				</Link>
			</li>
			<li className={styles.item}>
				<Link
					href={DASHBOARD_URL.settings()}
					className={styles.link}
				>
					<Settings className={styles.icon} />
					<span>Settings</span>
				</Link>
			</li>
			<li className={styles.item}>
				<button
					className={styles.link}
					onClick={() => {
						logout()
					}}
				>
					<LogOut className={styles.icon} />
					<span>Logout</span>
				</button>
			</li>
		</ul>
	)
})

UserMenuModal.displayName = 'UserMenuModal'

export default UserMenuModal
