'use client'

import { FC, PropsWithChildren, useEffect } from 'react'

import { tokenService } from '@/services/token.service'

import { authVar } from '@/stores/store'

import { useAuth } from '@/hooks/useAuth'

interface IAuthProvider {
	isAuth: boolean
}

const AuthProvider: FC<PropsWithChildren<IAuthProvider>> = ({
	children,
	isAuth
}) => {
	// const { authVar } = useAuth()

	useEffect(() => {
		if (!isAuth) tokenService.remove()
		authVar(isAuth)
	}, [isAuth])

	return <>{children}</>
}

export { AuthProvider }
