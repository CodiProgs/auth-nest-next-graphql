import { NextRequest, NextResponse } from 'next/server'

import { dashboardPages, publicPages } from './config/pages.config'
import { EnumTokens } from './services/token.service'

export async function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = request.url.includes(publicPages.auth)

	if (isAuthPage) {
		if (refreshToken)
			return NextResponse.redirect(new URL(dashboardPages.home, request.url))

		return NextResponse.next()
	}

	if (refreshToken === undefined) {
		return NextResponse.redirect(new URL(publicPages.auth, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth']
}
