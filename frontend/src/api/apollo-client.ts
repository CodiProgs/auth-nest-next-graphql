import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	Observable,
	createHttpLink,
	from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import toast from 'react-hot-toast'

import {
	getAccessToken,
	removeFromStorage,
	saveTokenStorage
} from '@/services/auth-token.service'

import { SERVER_URL } from '@/config/api.config'

import {
	GetNewTokensDocument,
	GetNewTokensMutation,
	LogoutDocument,
	LogoutMutation
} from '@/gql/graphql'

const getNetToken = async () => {
	const { data } = await client.mutate<GetNewTokensMutation>({
		mutation: GetNewTokensDocument
	})

	const token = data?.getNewTokens
	saveTokenStorage(token || '')

	return token
}

const logout = async () => {
	await client.mutate<LogoutMutation>({ mutation: LogoutDocument })
	removeFromStorage()

	//push to auth page
}

const errorLink = onError(
	({ networkError, graphQLErrors, operation, forward }) => {
		if (networkError) toast.error(networkError.message)
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				if (err.extensions?.code === '401') {
					return new Observable(observer => {
						// убрать это в сервис
						getNetToken()
							.then(token => {
								operation.setContext((previousContext: any) => ({
									headers: {
										...previousContext.headers,
										authorization: `Bearer ${token}`
									}
								}))
								const forward$ = forward(operation)
								forward$.subscribe(observer)
							})
							.catch(error => {
								observer.error(error)
							})
					})
				}
				if (err.extensions?.logout) {
					logout()
				}
			}
		}
	}
)

const httpLink = createHttpLink({
	uri: `${SERVER_URL}/graphql`,
	credentials: 'include'
})

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = getAccessToken()

	operation.setContext({
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	})
	return forward(operation)
})

export const client = new ApolloClient({
	cache: new InMemoryCache({}),
	headers: {
		'Content-Type': 'application/json'
	},
	link: from([authMiddleware, errorLink, httpLink])
})
