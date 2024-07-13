import { useMutation } from '@apollo/client'
import { GraphQLErrorExtensions } from 'graphql'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { saveTokenStorage } from '@/services/auth-token.service'

import { DASHBOARD_URL } from '@/config/url.config'

import {
	LoginDocument,
	LoginDto,
	LoginMutation,
	RegisterDocument,
	RegisterDto,
	RegisterMutation
} from '@/gql/graphql'

export const useAuth = (
	isLogin: boolean,
	reset: UseFormReset<RegisterDto & LoginDto>
) => {
	const [errors, setErrors] = useState<GraphQLErrorExtensions>({})

	const mutation = isLogin ? LoginDocument : RegisterDocument
	const { push, refresh } = useRouter()

	const [mutate, { loading }] = useMutation<RegisterMutation & LoginMutation>(
		mutation,
		{
			onCompleted(data) {
				reset()
				saveTokenStorage(data.login?.accessToken || data.register?.accessToken)
				toast.success('Success')
				push(DASHBOARD_URL.home())
				refresh()
			},
			onError(error) {
				const extensions = error?.graphQLErrors?.[0]?.extensions
				setErrors(extensions)
			}
		}
	)

	return { mutate, loading, errors, setErrors }
}
