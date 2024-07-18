import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

class TokenService {
	get() {
		const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
		return accessToken || null
	}

	save(accessToken: string) {
		const expires = new Date()
		expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000)

		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			expires,
			sameSite: 'Lax',
			path: '/',
			secure: true
		})
	}

	remove() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
	}
}

export const tokenService = new TokenService()
