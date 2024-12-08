'use client'

import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/form-elements/button/Button'
import { Heading } from '@/components/ui/heading/Heading'

import { useProfile } from '@/hooks/useProfile'

import styles from './Settings.module.scss'
import { SettingsFields } from './SettingsFields'
import { useSettings } from './useSettings'
import { UpdateUserDto } from '@/__generated__/output'

const Settings: FC = () => {
	const { user } = useProfile()

	const {
		register,
		reset,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<UpdateUserDto>({
		mode: 'onChange',
		values: {
			email: user?.email || '',
			name: user?.name || ''
		}
	})

	const {
		mutate,
		loading,
		errors: graphqlErrors,
		setErrors
	} = useSettings(reset)

	const onSubmit: SubmitHandler<UpdateUserDto> = data => {
		setErrors({})
		mutate({
			variables: {
				updateUserInput: {
					email: data.email === user?.email ? undefined : data.email,
					name: data.name === user?.name ? undefined : data.name
				}
			}
		})
	}

	const isDisabled = () => {
		const data = watch()

		return data.email === user?.email && data.name === user?.name
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<Heading className={styles.heading}>Settings</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<SettingsFields
						register={register}
						errors={errors}
						graphqlErrors={graphqlErrors}
					/>
					<>
						{graphqlErrors?.form ? (
							<p className={styles.error}>{graphqlErrors.form as string}</p>
						) : null}
					</>
					<Button
						type='submit'
						disabled={loading || isDisabled()}
					>
						{loading ? 'Loading...' : 'Update'}
					</Button>
				</form>
			</div>
		</div>
	)
}

export { Settings }
