import { Field, InputType } from '@nestjs/graphql'
import {
	IsEmail,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

@InputType()
export class UpdateUserDto {
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	@MinLength(3)
	@MaxLength(20)
	name?: string

	@Field({ nullable: true })
	@IsOptional()
	@IsEmail({}, { message: 'Invalid email' })
	email?: string
}
