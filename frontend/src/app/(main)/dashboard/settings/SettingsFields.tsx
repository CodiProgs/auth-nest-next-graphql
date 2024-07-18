import { GraphQLErrorExtensions } from 'graphql'
import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Field } from '@/components/ui/form-elements/field/Field'

import styles from './Settings.module.scss'
import { UpdateUserDto } from '@/__generated__/output'
import { validEmail } from '@/app/auth/valid-email'

interface ISettingsFields {
	register: UseFormRegister<UpdateUserDto>
	errors: FieldErrors<UpdateUserDto>
	graphqlErrors: GraphQLErrorExtensions
}

const SettingsFields: FC<ISettingsFields> = ({
	register,
	errors,
	graphqlErrors
}) => {
	return (
		<div className={styles.fields}>
			<Field
				placeholder='Name'
				error={errors.name?.message || (graphqlErrors?.name as string)}
				{...register('name', {
					required: 'Required',
					minLength: { value: 3, message: 'Min 3 length' },
					maxLength: { value: 20, message: 'Max 20 length' }
				})}
			/>
			<Field
				placeholder='Email'
				{...register('email', {
					required: 'Required',
					pattern: { value: validEmail, message: 'Invalid mail' }
				})}
				error={errors.email?.message || (graphqlErrors?.email as string)}
			/>
		</div>
	)
}

export { SettingsFields }
