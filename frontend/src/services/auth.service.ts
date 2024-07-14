import { client } from '@/api/apollo-client'

import { tokenService } from './token.service'
import { GetNewTokensDocument, GetNewTokensMutation } from '@/gql/graphql'

class AuthService {
	async getNewToken() {
		const { data } = await client.mutate<GetNewTokensMutation>({
			mutation: GetNewTokensDocument
		})

		const token = data?.token
		tokenService.save(token || '')

		return token
	}
}

export const authService = new AuthService()
