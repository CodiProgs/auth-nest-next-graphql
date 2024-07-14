import { cookies } from 'next/headers'
import { FC, PropsWithChildren } from 'react'

import { EnumTokens } from '@/services/token.service'

import styles from './MainLayout.module.scss'
import Header from './header/Header'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	const cookiesList = cookies()
	const refreshToken = cookiesList.get(EnumTokens.REFRESH_TOKEN)

	return (
		<div className={styles.layout}>
			<Header isAuth={!!refreshToken} />
			<main>{children}</main>
		</div>
	)
}

export default MainLayout
