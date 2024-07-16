import { makeVar } from '@apollo/client'

import { UserType } from '@/gql/graphql'

export const userVars = makeVar<UserType | null>(null)
