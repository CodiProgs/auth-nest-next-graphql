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
		Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			sameSite: 'Lax',
			expires: 1
		})
	}

	remove() {
		Cookies.remove(EnumTokens.ACCESS_TOKEN)
	}
}

export const tokenService = new TokenService()
