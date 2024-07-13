import { useRouter } from 'next/navigation'

import { removeFromStorage } from '@/services/auth-token.service'

import { PUBLIC_URL } from '@/config/url.config'

import { useLogoutMutation } from '@/gql/graphql'

export const useLogout = () => {
	const { push } = useRouter()

	const [mutateLogout] = useLogoutMutation()

	const logout = () => {
		removeFromStorage()
		mutateLogout()
		push(PUBLIC_URL.auth())
	}

	return { logout }
}
