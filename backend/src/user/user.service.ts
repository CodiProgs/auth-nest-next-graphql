import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { hash } from 'argon2'
import { UpdateUserDto } from './dto/update-user.dto'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { Provider } from '@prisma/client'
import { LoginSocialDto } from 'src/auth/dto/social-login.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id }
		})
	}

	async getByEmailAndProvider(email: string, provider: Provider = 'LOCAL') {
		return this.prisma.user.findUnique({
			where: { email_provider: { email, provider } }
		})
	}

	async create(dto: RegisterDto) {
		return await this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
			}
		})
	}

	async createSocial(dto: LoginSocialDto, provider: Provider) {
		return await this.prisma.user.create({
			data: {
				...dto,
				provider,
				password: null
			}
		})
	}

	async update(id: string, dto: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id },
			data: dto
		})
	}
}
