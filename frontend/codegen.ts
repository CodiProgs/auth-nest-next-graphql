import { CodegenConfig } from '@graphql-codegen/cli'

import { SERVER_URL } from './src/config/api.config'

const config: CodegenConfig = {
	schema: `${SERVER_URL}/graphql`,
	documents: ['src/graphql/**/*.graphql'],
	generates: {
		'./src/gql/graphql.ts': {
			plugins: [
				'typescript',
				'typescript-operations',
				'typescript-react-apollo'
			]
		}
	}
}

export default config
