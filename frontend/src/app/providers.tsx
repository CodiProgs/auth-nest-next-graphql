import { cookies } from 'next/headers'
import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

import { ApolloClientProvider } from '@/providers/ApolloClientProvider'
import { AuthProvider } from '@/providers/AuthProvider'

import { EnumTokens } from '@/services/token.service'

const Providers: FC<PropsWithChildren> = async ({ children }) => {
	const cookiesList = await cookies()
	const isAuth = !!cookiesList.get(EnumTokens.REFRESH_TOKEN)

	return (
		<ApolloClientProvider>
			<AuthProvider isAuth={isAuth}>
				<Toaster toastOptions={{ duration: 2500 }} />
				{children}
			</AuthProvider>
		</ApolloClientProvider>
	)
}

export default Providers
