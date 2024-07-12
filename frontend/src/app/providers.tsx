'use client'

import { ApolloProvider } from '@apollo/client'
import { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

import { client } from '@/api/apollo-client'

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ApolloProvider client={client}>
			<Toaster />
			{children}
		</ApolloProvider>
	)
}

export default Providers
