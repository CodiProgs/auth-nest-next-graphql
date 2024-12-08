import { GraphQLErrorExtensions } from 'graphql'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { UpdateUserDto, useUpdateUserMutation } from '@/__generated__/output'

export const useSettings = (reset: UseFormReset<UpdateUserDto>) => {
	const [errors, setErrors] = useState<GraphQLErrorExtensions>({})

	const [mutate, { loading }] = useUpdateUserMutation({
		onCompleted() {
			reset()
			toast.success('Success')
		},
		onError(error) {
			if (error?.graphQLErrors?.[0]?.extensions) {
				setErrors(error.graphQLErrors[0].extensions)
			}
		}
	})

	return { mutate, loading, errors, setErrors }
}
