import { useRouter } from 'next/navigation'

import { tokenService } from '@/services/token.service'

import { PUBLIC_URL } from '@/config/url.config'

import { useLogoutMutation } from '@/gql/graphql'

export const useLogout = () => {
	const { push } = useRouter()

	const [mutate] = useLogoutMutation()

	const logout = async () => {
		await mutate()
		tokenService.remove()
		push(PUBLIC_URL.auth())
	}

	return { logout }
}
