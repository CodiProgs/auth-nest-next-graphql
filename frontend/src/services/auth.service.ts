import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PUBLIC_URL } from '@/config/url.config'

import { authVar } from '@/stores/store'

import { client } from '@/api/apollo-client'

import { tokenService } from './token.service'
import {
	GetNewTokensDocument,
	GetNewTokensMutation,
	LogoutDocument
} from '@/__generated__/output'

class AuthService {
	async getNewTokens() {
		const { data } = await client.mutate<GetNewTokensMutation>({
			mutation: GetNewTokensDocument
		})

		const token = data?.token
		tokenService.save(token as string)

		return token
	}

	async logout(push?: (href: string, options?: NavigateOptions) => void) {
		await client.mutate({
			mutation: LogoutDocument
		})

		tokenService.remove()
		authVar(false)

		if (push) push(PUBLIC_URL.home())
	}
}

export const authService = new AuthService()
