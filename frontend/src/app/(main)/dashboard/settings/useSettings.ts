import { GraphQLErrorExtensions } from 'graphql'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { UpdateUserDto, useUpdateUserMutation } from '@/gql/graphql'

export const useSettings = (reset: UseFormReset<UpdateUserDto>) => {
	const [errors, setErrors] = useState<GraphQLErrorExtensions>({})

	const [mutate, { loading }] = useUpdateUserMutation({
		onCompleted(data) {
			reset()
			toast.success('Success')
		},
		onError(error) {
			const extensions = error?.graphQLErrors?.[0]?.extensions
			setErrors(extensions)
		}
	})

	return { mutate, loading, errors, setErrors }
}
