import { useReactiveVar } from '@apollo/client'

import { userVars } from '@/stores/store'

export const useAuth = () => {
	return {
		user: useReactiveVar(userVars),
		userVars: userVars
	}
}
