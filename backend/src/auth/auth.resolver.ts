import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthType } from './type/auth.type'
import { Request, Response } from 'express'
import { LoginDto } from './dto/login.dto'
import { BadRequestException } from '@nestjs/common'
import { RegisterDto } from './dto/register.dto'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => AuthType)
	async register(
		@Args('registerInput') dto: RegisterDto,
		@Context() context: { res: Response }
	): Promise<AuthType> {
		const { refreshToken, ...res } = await this.authService.register(dto)
		this.authService.addRefreshTokenToResponse(context.res, refreshToken)

		return res
	}

	@Mutation(() => AuthType)
	async login(
		@Args('loginInput') dto: LoginDto,
		@Context() context: { res: Response }
	): Promise<AuthType> {
		const { refreshToken, ...res } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponse(context.res, refreshToken)

		return res
	}

	@Mutation(() => Boolean)
	async logout(@Context() context: { res: Response }) {
		this.authService.removeRefreshTokenFromResponse(context.res)
		return true
	}

	@Mutation(() => String)
	async getNewTokens(@Context() context: { res: Response; req: Request }) {
		const refreshToken =
			context.req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!refreshToken)
			throw new BadRequestException('You are not authenticated')
		this.authService.removeRefreshTokenFromResponse(context.res)

		const { accessToken, refreshToken: newRefreshToken } =
			await this.authService.getNewTokens(refreshToken)
		this.authService.addRefreshTokenToResponse(context.res, newRefreshToken)

		return accessToken
	}
}
