'use client'

import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { forwardRef } from 'react'

import { authService } from '@/services/auth.service'

import { DASHBOARD_URL } from '@/config/url.config'

import styles from './UserMenu.module.scss'

interface IUserMenuModal {
	setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

const UserMenuModal = forwardRef<HTMLUListElement, IUserMenuModal>(
	({ setIsShow }, ref) => {
		const { push } = useRouter()

		return (
			<ul
				ref={ref}
				className={styles.menu}
			>
				<li className={styles.item}>
					<Link
						onClick={() => setIsShow(false)}
						href={DASHBOARD_URL.home()}
						className={styles.link}
					>
						<User className={styles.icon} />
						<span>Profile</span>
					</Link>
				</li>
				<li className={styles.item}>
					<Link
						onClick={() => setIsShow(false)}
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
							authService.logout(push)
							setIsShow(false)
						}}
					>
						<LogOut className={styles.icon} />
						<span>Logout</span>
					</button>
				</li>
			</ul>
		)
	}
)

UserMenuModal.displayName = 'UserMenuModal'

export { UserMenuModal }
