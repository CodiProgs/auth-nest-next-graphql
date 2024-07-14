import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { tokenService } from '@/services/token.service'

import { onAuthError } from '@/utils/authErrorHandler.util'

import { useProfileQuery } from '@/gql/graphql'

export const useProfile = (
	refreshToken?: string,
	validate: boolean = false,
	push?: (href: string, options?: NavigateOptions) => void
) => {
	if (!refreshToken) {
		return { user: null, loading: false, error: '' }
	}

	const { data, loading, error } = useProfileQuery({
		onError(error) {
			if (validate) {
				onAuthError(error, push)
			}
		}
	})
	return { user: data, loading, error }
}
