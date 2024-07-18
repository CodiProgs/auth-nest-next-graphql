import { GraphQLErrorExtensions } from 'graphql'
import { FC } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { Field } from '@/components/ui/form-elements/field/Field'

import styles from './Auth.module.scss'
import { validEmail } from './valid-email'
import { LoginDto, RegisterDto } from '@/__generated__/output'

interface IAuthField {
	isLogin: boolean
	register: UseFormRegister<RegisterDto & LoginDto>
	errors: FieldErrors<RegisterDto & LoginDto>
	graphqlErrors: GraphQLErrorExtensions
}

const AuthFields: FC<IAuthField> = ({
	isLogin,
	register,
	errors,
	graphqlErrors
}) => {
	return (
		<div className={styles.fields}>
			{!isLogin && (
				<Field
					placeholder='Name'
					{...register('name', {
						required: 'Required',
						minLength: { value: 3, message: 'Min 3 length' },
						maxLength: { value: 20, message: 'Max 20 length' }
					})}
					error={errors.name?.message || (graphqlErrors?.name as string)}
				/>
			)}
			<Field
				type='email'
				placeholder='Email'
				{...register('email', {
					required: 'Required',
					pattern: { value: validEmail, message: 'Invalid mail' }
				})}
				error={errors.email?.message || (graphqlErrors?.email as string)}
			/>
			<Field
				placeholder='Password'
				type='password'
				{...register('password', {
					required: 'Required',
					minLength: { value: 6, message: 'Min 6 length' },
					maxLength: { value: 32, message: 'Max 32 length' }
				})}
				error={errors.password?.message || (graphqlErrors?.password as string)}
			/>
		</div>
	)
}

export { AuthFields }
