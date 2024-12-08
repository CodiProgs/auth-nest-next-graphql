import { useProfileQuery } from '@/__generated__/output'

export const useProfile = () => {
	const { data, loading, error } = useProfileQuery()

	return { user: data?.user, loading, error }
}
