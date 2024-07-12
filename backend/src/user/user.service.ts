import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { hash } from 'argon2'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		return this.prisma.user.findUnique({
			where: { id }
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email }
		})
	}

	async create(dto: CreateUserDto) {
		return await this.prisma.user.create({
			data: {
				...dto,
				password: await hash(dto.password)
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
