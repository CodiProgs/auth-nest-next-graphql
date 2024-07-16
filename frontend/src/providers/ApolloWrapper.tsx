'use client'

import { ApolloProvider } from '@apollo/client'
import { FC, PropsWithChildren } from 'react'

import { client } from '@/api/apollo-client'

const ApolloWrapper: FC<PropsWithChildren> = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper
