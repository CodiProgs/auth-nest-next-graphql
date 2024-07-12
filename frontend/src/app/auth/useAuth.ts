import { useMutation } from '@apollo/client'
import { GraphQLErrorExtensions } from 'graphql'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { DASHBOARD_URL, SERVER_URL } from '@/config/url.config'

import {
	CreateUserDto,
	LoginDocument,
	LoginDto,
	RegisterDocument
} from '@/gql/graphql'

export const useAuth = (
	isLogin: boolean,
	reset: UseFormReset<CreateUserDto & LoginDto>
) => {
	const [errors, setErrors] = useState<GraphQLErrorExtensions>({})

	const mutation = isLogin ? LoginDocument : RegisterDocument
	const { push, refresh } = useRouter()

	const [mutate, { loading }] = useMutation(mutation, {
		onCompleted() {
			reset()
			toast.success('Success')
			push(DASHBOARD_URL.home())
			refresh()
		},
		onError(error) {
			const extensions = error?.graphQLErrors?.[0]?.extensions
			setErrors(extensions)
		}
	})

	return { mutate, loading, errors, setErrors }
}
