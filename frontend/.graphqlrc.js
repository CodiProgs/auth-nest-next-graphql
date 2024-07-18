require('dotenv').config()

const serverUrl = process.env.SERVER_URL
	? `${process.env.SERVER_URL}/graphql`
	: 'http://localhost:4000/graphql'

module.exports = {
	schema: serverUrl,
	documents: 'src/schemes/**/*.graphql',
	extensions: {
		codegen: {
			generates: {
				'./src/__generated__/output.ts': {
					plugins: [
						'typescript',
						'typescript-operations',
						'typescript-react-apollo'
					]
				}
			}
		}
	}
}
