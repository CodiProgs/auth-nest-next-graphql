import { client } from '@/api/apollo-client'

import { tokenService } from './token.service'
import {
	GetNewTokensDocument,
	GetNewTokensMutation,
	LogoutDocument,
	LogoutMutation
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

	async logout() {
		await client.mutate<LogoutMutation>({
			mutation: LogoutDocument,
			update(cache) {
				const normalizedId = cache.identify({
					id: 'id', //todo!
					__typename: 'UserType'
				})
				cache.evict({ id: normalizedId })
				cache.gc()
			}
		})
		tokenService.remove()
	}
}

export const authService = new AuthService()
