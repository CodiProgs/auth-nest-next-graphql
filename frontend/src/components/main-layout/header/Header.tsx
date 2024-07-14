'use client'

import Link from 'next/link'
import { FC } from 'react'

import Loader from '@/components/ui/Loader'

import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

interface IHeader {
	refreshToken?: string
}

const Header: FC<IHeader> = ({ refreshToken }) => {
	const { user, loading } = useProfile(refreshToken)

	return (
		<div className='h-14 flex items-center justify-between'>
			<Link href={PUBLIC_URL.home()}>Home</Link>
			{loading ? (
				<Loader className='size-4' />
			) : (
				<Link
					className='hover:text-primary transition-colors duration-300'
					href={user ? DASHBOARD_URL.home() : PUBLIC_URL.auth()}
				>
					{user ? user.user.name : 'login'}
				</Link>
			)}
		</div>
	)
}

export default Header
