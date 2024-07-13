import { ApolloError } from '@apollo/client'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import toast from 'react-hot-toast'

import { useProfileQuery } from '@/gql/graphql'

const onErrorGlobal = (
	error: ApolloError,
	push?: (href: string, options?: NavigateOptions) => void
) => {
	toast.error(
		(error.graphQLErrors?.[0].extensions?.logout as string) || error.message
	)
	if (error.graphQLErrors?.[0].extensions?.logout && push) push('/auth')
}

export const useProfile = (
	push?: (href: string, options?: NavigateOptions) => void
) => {
	const { data, loading, error } = useProfileQuery({
		onError(error) {
			onErrorGlobal(error, push)
		}
	})

	return { user: data, loading, error }
}
