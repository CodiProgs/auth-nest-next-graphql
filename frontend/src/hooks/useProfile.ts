import { useProfileQuery } from '@/gql/graphql'

export const useProfile = () => {
	const { data, loading } = useProfileQuery()

	return { data, loading }
}