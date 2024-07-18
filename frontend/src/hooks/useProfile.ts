import { useProfileQuery } from '@/__generated__/output'

export const useProfile = () => {
	const { data, loading } = useProfileQuery()

	return { user: data?.user, loading }
}
