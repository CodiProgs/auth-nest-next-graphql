import { cookies } from 'next/headers'
import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

import { ApolloClientProvider } from '@/providers/ApolloClientProvider'
import { AuthProvider } from '@/providers/AuthProvider'

import { EnumTokens } from '@/services/token.service'

const Providers: FC<PropsWithChildren> = ({ children }) => {
	const cookiesList = cookies()
	const isAuth = !!cookiesList.get(EnumTokens.REFRESH_TOKEN)

	return (
		<ApolloClientProvider>
			<AuthProvider isAuth={isAuth}>
				<Toaster />
				{children}
			</AuthProvider>
		</ApolloClientProvider>
	)
}

export default Providers
