import { cookies } from 'next/headers'
import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

import { EnumTokens } from '@/services/token.service'

import ApolloWrapper from '@/providers/ApolloWrapper'
import AuthProvider from '@/providers/AuthProvider'

const Providers: FC<PropsWithChildren> = ({ children }) => {
	const cookiesList = cookies()
	const refreshToken = cookiesList.get(EnumTokens.REFRESH_TOKEN)?.value

	return (
		<ApolloWrapper>
			<AuthProvider refreshToken={refreshToken}>
				<Toaster />
				{children}
			</AuthProvider>
		</ApolloWrapper>
	)
}

export default Providers
