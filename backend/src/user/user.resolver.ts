import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UserType } from './type/user.type'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth, CurrentUser } from 'src/auth/decorators'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Query(() => UserType)
	async profile(@CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@Auth()
	@Mutation(() => String)
	async updateUser(
		@CurrentUser('id') id: string,
		@Args('updateUserInput') dto: UpdateUserDto
	) {
		return this.userService.update(id, dto)
	}
}
