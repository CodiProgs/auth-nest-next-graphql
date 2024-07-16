'use client'

import React, { FC, useEffect, useRef, useState } from 'react'

import Loader from '@/components/ui/Loader'
import Button from '@/components/ui/button/Button'

import { useAuth } from '@/hooks/useAuth'

import styles from './UserMenu.module.scss'
import UserMenuModal from './UserMenuModal'

const UserMenu: FC = () => {
	const { user } = useAuth()

	const [isShow, setIsShow] = useState(false)
	const ref = useRef<HTMLUListElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return (
		<div className={styles.user}>
			{/* {loading ? (
				<Loader className={styles.loader} />
			) : ( */}
			<Button
				className={styles.toggle}
				variant='outline'
				onClick={() => setIsShow(true)}
			>
				<span>{user?.name}</span>
			</Button>
			{/* )} */}
			{isShow && <UserMenuModal ref={ref} />}
		</div>
	)
}

export default UserMenu
