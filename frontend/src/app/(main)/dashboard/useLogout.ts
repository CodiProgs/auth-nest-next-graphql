import { useRouter } from 'next/navigation'

import { authService } from '@/services/auth.service'

import { PUBLIC_URL } from '@/config/url.config'

export const useLogout = () => {
	const { push } = useRouter()

	const logout = () => {
		authService.logout()
		push(PUBLIC_URL.auth())
	}

	return { logout }
}
