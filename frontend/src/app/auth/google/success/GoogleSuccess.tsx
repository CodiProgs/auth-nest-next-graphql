'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect } from 'react'

import { Loader } from '@/components/ui/Loader'
import { Heading } from '@/components/ui/heading/Heading'

import { tokenService } from '@/services/token.service'

import { DASHBOARD_URL } from '@/config/url.config'

import styles from './GoogleSuccess.module.scss'

const GoogleSuccess: FC = () => {
	const accessToken = useSearchParams().get('accessToken')
	const { push } = useRouter()

	useEffect(() => {
		if (accessToken) {
			tokenService.save(accessToken)
			push(DASHBOARD_URL.home())
		} else {
			push('/auth')
		}
	}, [accessToken])

	return (
		<div className={styles.wrapper}>
			<div className={styles.area}>
				{accessToken && <Heading>Authorization in progress</Heading>}
				<Loader />
			</div>
		</div>
	)
}

export { GoogleSuccess }
