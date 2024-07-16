import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PUBLIC_URL } from '@/config/url.config'

import { client } from '@/api/apollo-client'

import { tokenService } from './token.service'
import {
	GetNewTokensDocument,
	GetNewTokensMutation,
	LogoutDocument
} from '@/gql/graphql'

class AuthService {
	async getNewToken() {
		const { data } = await client.mutate<GetNewTokensMutation>({
			mutation: GetNewTokensDocument
		})

		const token = data?.token
		tokenService.save(token || '')

		return token
	}

	async logout(push: (href: string, options?: NavigateOptions) => void) {
		await client.mutate({
			mutation: LogoutDocument
		})

		tokenService.remove()
		push(PUBLIC_URL.home())
	}
}

export const authService = new AuthService()
