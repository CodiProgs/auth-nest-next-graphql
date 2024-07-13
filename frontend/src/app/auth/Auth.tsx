'use client'

import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { useAuth } from './useAuth'
import { LoginDto, RegisterDto } from '@/gql/graphql'

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState(true)

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<RegisterDto & LoginDto>({
		mode: 'onChange'
	})

	const {
		mutate,
		loading,
		errors: graphqlErrors,
		setErrors
	} = useAuth(isLogin, reset)

	const onSubmit: SubmitHandler<RegisterDto & LoginDto> = data => {
		setErrors({})
		mutate({
			variables: data
		})
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<Heading className={styles.heading}>
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
							<p className={styles.error}>{graphqlErrors.form as string}</p>
						)}
					</>
					<div className={styles.buttons}>
						<Button
							type='submit'
							disabled={loading}
						>
							{loading ? 'loading' : isLogin ? 'Login' : 'Register'}
						</Button>
						<Button
							variant='outline'
							type='button'
							onClick={() => {
								setIsLogin(!isLogin)
								setErrors({})
							}}
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
