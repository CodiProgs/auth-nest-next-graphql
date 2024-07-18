import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NextLink,
	Observable,
	Operation,
	createHttpLink,
	from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import toast from 'react-hot-toast'

import { authService } from '@/services/auth.service'
import { tokenService } from '@/services/token.service'

import { SERVER_URL } from '@/config/api.config'

const handleAuthError = async (operation: Operation, forward: NextLink) => {
	try {
		const token = await authService.getNewTokens()
		operation.setContext(({ headers = {} }) => ({
			headers: {
				...headers,
				authorization: `Bearer ${token}`
			}
		}))
		return forward(operation)
	} catch (error) {
		throw error
	}
}

const errorLink = onError(
	({ networkError, graphQLErrors, operation, forward }) => {
		if (networkError) toast.error(networkError.message)

		const isAuthError = graphQLErrors?.some(
			err => err.extensions?.code === '401'
		)
		if (isAuthError) {
			return new Observable(observer => {
				handleAuthError(operation, forward)
					.then(forwardOperation => {
						forwardOperation.subscribe(observer)
					})
					.catch(observer.error)
			})
		}
	}
)

const httpLink = createHttpLink({
	uri: `${SERVER_URL}/graphql`,
	credentials: 'include'
})

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = tokenService.get()
	if (token) {
		operation.setContext({
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
	}
	return forward(operation)
})

export const client = new ApolloClient({
	cache: new InMemoryCache({}),
	headers: {
		'Content-Type': 'application/json'
	},
	link: from([authMiddleware, errorLink, httpLink])
})
