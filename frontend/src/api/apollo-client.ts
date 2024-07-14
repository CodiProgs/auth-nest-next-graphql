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

import { authService } from '@/services/auth.service'
import { tokenService } from '@/services/token.service'

import { SERVER_URL } from '@/config/api.config'

const errorLink = onError(
	({ networkError, graphQLErrors, operation, forward }) => {
		if (networkError) toast.error(networkError.message)
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				if (err.extensions?.code === '401') {
					return new Observable(observer => {
						authService
							.getNewToken()
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
			}
		}
	}
)

const httpLink = createHttpLink({
	uri: `${SERVER_URL}/graphql`,
	credentials: 'include'
})

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = tokenService.get()

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
