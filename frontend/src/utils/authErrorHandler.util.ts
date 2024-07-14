import { ApolloError } from '@apollo/client'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import toast from 'react-hot-toast'

import { tokenService } from '@/services/token.service'

/**
 * Handles authentication errors from GraphQL operations.
 *
 * This function checks for authentication-related errors in a GraphQL response and
 * displays an error message using a toast notification. If a navigation function is
 * provided, it redirects the user to the authentication page.
 *
 * @param {ApolloError} error - The error object returned from a GraphQL operation.
 * @param {(href: string, options?: NavigateOptions) => void} [push] - An optional navigation function to redirect the user.
 */
export const onAuthError = (
	error: ApolloError,
	push?: (href: string, options?: NavigateOptions) => void
) => {
	const authError = error.graphQLErrors?.[0].extensions?.auth as string
	if (authError) {
		tokenService.remove()
		toast.error(authError)
		if (push) push('/auth')
	}
}
