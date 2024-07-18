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
				updateUserInput: data
			}
		})
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
						{graphqlErrors?.form && (
							<p className={styles.error}>{graphqlErrors.form as string}</p>
						)}
					</>
					<Button
						type='submit'
						disabled={loading}
					>
						Update
					</Button>
				</form>
			</div>
		</div>
	)
}

export { Settings }
