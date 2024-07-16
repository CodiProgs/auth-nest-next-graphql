import { FC, PropsWithChildren } from 'react'

import styles from './MainLayout.module.scss'
import Header from './header/Header'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			<main>{children}</main>
		</div>
	)
}

export default MainLayout
