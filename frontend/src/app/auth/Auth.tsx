'use client'

import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'

import AuthFields from './AuthFields'
import { useAuth } from './useAuth'
import { CreateUserDto, LoginDto } from '@/gql/graphql'

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState(true)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateUserDto & LoginDto>({
		mode: 'onChange'
	})

	const {
		mutate,
		loading,
		errors: graphqlErrors,
		setErrors
	} = useAuth(isLogin, reset)

	const onSubmit: SubmitHandler<CreateUserDto & LoginDto> = data => {
		setErrors({})
		mutate({
			variables: data
		})
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='p-8 bg-soft_bg dark:bg-dark_soft_bg w-1/3'>
				<Heading className='text-3xl mb-4'>
					{isLogin ? 'Login' : 'Register'}
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AuthFields
						errors={errors}
						graphqlErrors={graphqlErrors}
						isLogin={isLogin}
						register={register}
					/>
					<>
						{graphqlErrors?.form && (
							<p className='text-red-500 text-sm mb-6'>
								{graphqlErrors.form as string}
							</p>
						)}
					</>
					<div className='flex items-center justify-between'>
						<Button
							type='submit'
							disabled={loading}
							className='disabled:cursor-not-allowed'
						>
							{loading ? 'loading' : isLogin ? 'Login' : 'Register'}
						</Button>
						<Button
							variant='outline'
							type='button'
							onClick={() => setIsLogin(!isLogin)}
						>
							{isLogin ? 'Create account' : 'Login'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth
