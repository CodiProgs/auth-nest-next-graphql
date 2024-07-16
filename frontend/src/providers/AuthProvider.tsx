'use client'

import { useRouter } from 'next/navigation'
import { FC, PropsWithChildren, useEffect } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { onAuthError } from '@/utils/authErrorHandler.util'

import { useProfileLazyQuery } from '@/gql/graphql'

interface IAuthProvider {
	refreshToken?: string
}

const AuthProvider: FC<PropsWithChildren<IAuthProvider>> = ({
	children,
	refreshToken
}) => {
	const { push } = useRouter()

	const { user, userVars } = useAuth()
	const [getProfile] = useProfileLazyQuery({
		onError(error) {
			onAuthError(error, push)
		}
	})

	useEffect(() => {
		if (!user) {
			if (refreshToken) {
				getProfile().then(({ data }) => {
					userVars(data?.user)
				})
			}
		}
	}, [refreshToken, user, userVars])

	return children
}

export default AuthProvider
