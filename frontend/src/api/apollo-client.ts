import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	createHttpLink,
	from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import toast from 'react-hot-toast'

import { getAccessToken } from '@/services/auth-token.service'

import { SERVER_URL } from '@/config/url.config'

const errorLink = onError(
	({ networkError, graphQLErrors, operation, forward }) => {
		if (networkError) toast.error(networkError.message)
		if (graphQLErrors) {
			for (const err of graphQLErrors) {
				if (err.extensions?.code === '401') {
				}
			}
		}
	}
)

const httpLink = createHttpLink({
	uri: `${SERVER_URL}graphql`,
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
