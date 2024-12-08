import { useMutation } from '@apollo/client'
import { GraphQLErrorExtensions } from 'graphql'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

import { tokenService } from '@/services/token.service'

import { dashboardPages } from '@/config/pages.config'

import { authVar } from '@/stores/store'

import {
	LoginDocument,
	LoginDto,
	LoginMutation,
	RegisterDocument,
	RegisterDto,
	RegisterMutation
} from '@/__generated__/output'

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
				setErrors({})
				reset()

				tokenService.save(data.login?.accessToken || data.register?.accessToken)
				authVar(true)

				toast.success('Success')

				push(dashboardPages.home)
				refresh()
			},
			onError(error) {
				if (error?.graphQLErrors?.[0]?.extensions) {
					setErrors(error.graphQLErrors[0].extensions)
				}
			}
		}
	)

	return { mutate, loading, errors, setErrors }
}
