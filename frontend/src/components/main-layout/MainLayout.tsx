import { cookies } from 'next/headers'
import { FC, PropsWithChildren } from 'react'

import { EnumTokens } from '@/services/token.service'

import styles from './MainLayout.module.scss'
import Header from './header/Header'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	const cookie = cookies()
	const refreshToken = cookie.get(EnumTokens.REFRESH_TOKEN)?.value // передать в useProfile
	return (
		<div className={styles.layout}>
			<Header refreshToken={refreshToken} />
			<main>{children}</main>
		</div>
	)
}

export default MainLayout
