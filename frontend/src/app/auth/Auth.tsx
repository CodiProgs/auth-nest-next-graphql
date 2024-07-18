'use client'

import Link from 'next/link'
import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/button/Button'
import { Heading } from '@/components/ui/heading/Heading'

import { SITE_NAME } from '@/constants/seo.constant'

import { PUBLIC_URL } from '@/config/url.config'

import { authVar } from '@/stores/store'

import styles from './Auth.module.scss'
import { AuthFields } from './AuthFields'
import { useAuth } from './useAuth'
import { LoginDto, RegisterDto } from '@/__generated__/output'

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
			variables: {
				authInput: data
			}
		})
		authVar(true)
	}

	const toggleIsLogin = () => {
		setIsLogin(!isLogin)
		setErrors({})
		reset()
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.logo}>
					<Link href={PUBLIC_URL.home()}>{SITE_NAME}</Link>
				</div>
				<Heading className={styles.heading}>
					{isLogin ? 'Login' : 'Register'}
				</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<AuthFields
						isLogin={isLogin}
						register={register}
						errors={errors}
						graphqlErrors={graphqlErrors}
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
							onClick={() => toggleIsLogin()}
						>
							{isLogin ? 'Create account' : 'Login'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export { Auth }
