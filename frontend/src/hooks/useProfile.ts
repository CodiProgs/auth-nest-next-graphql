import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { onAuthError } from '@/utils/authErrorHandler.util'

import { useProfileQuery } from '@/gql/graphql'

export const useProfile = (
	push?: (href: string, options?: NavigateOptions) => void
) => {
	const { data, loading, error } = useProfileQuery({
		onError(error) {
			onAuthError(error, push)
		}
	})

	return { user: data, loading, error }
}
