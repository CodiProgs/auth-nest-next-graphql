import { NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_URL, PUBLIC_URL } from './config/url.config'
import { EnumTokens, tokenService } from './services/token.service'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = request.cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	const isAuthPage = request.url.includes(PUBLIC_URL.auth())

	if (isAuthPage) {
		if (accessToken && refreshToken)
			return NextResponse.redirect(new URL(DASHBOARD_URL.home(), request.url))

		return NextResponse.next()
	}

	if (refreshToken === undefined) {
		tokenService.remove()
		return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth']
}
