import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

@InputType()
export class UpdateUserDto {
	@Field()
	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(20)
	name: string

	@Field()
	@IsNotEmpty()
	@IsEmail({}, { message: 'Invalid email' })
	email: string
}
