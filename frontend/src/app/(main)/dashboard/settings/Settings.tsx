'use client'

import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/button/Button'
import Heading from '@/components/ui/heading/Heading'

import styles from './Settings.module.scss'
import SettingsFields from './SettingsFields'
import { useSettings } from './useSettings'
import { UpdateUserDto } from '@/gql/graphql'

const Settings: FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<UpdateUserDto>({
		mode: 'onChange'
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
			variables: data
		})
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<Heading className={styles.heading}>Settings</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<SettingsFields
						errors={errors}
						graphqlErrors={graphqlErrors}
						register={register}
					/>
					<>
						{graphqlErrors?.form && (
							<p className={styles.error}>{graphqlErrors.form as string}</p>
						)}
					</>
					<Button type='submit'>Update</Button>
				</form>
			</div>
		</div>
	)
}

export default Settings
