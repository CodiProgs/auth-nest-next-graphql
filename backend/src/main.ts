import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { GraphQLErrorFilter } from './common/filters'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.enableCors({
		origin: process.env.FRONTEND_URL || 'http://localhost:3000',
		credentials: true
	})
	app.use(cookieParser())
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			exceptionFactory: errors => {
				const formattedErrors = errors.reduce((acc, err) => {
					acc[err.property] = Object.values(err.constraints).join(', ')
					return acc
				}, {})
				throw new BadRequestException(formattedErrors)
			}
		})
	)
	app.useGlobalFilters(new GraphQLErrorFilter())
	app.disable('x-powered-by')

	await app.listen(process.env.PORT || 4200)
}
bootstrap()
