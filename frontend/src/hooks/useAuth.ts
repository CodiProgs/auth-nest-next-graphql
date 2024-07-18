import { useReactiveVar } from '@apollo/client'

import { authVar } from '@/stores/store'

/**
 * A hook for managing user authentication.
 * Utilizes a reactive variable from Apollo Client to track the authentication status.
 * Designed exclusively for use in client-side components.
 * Important: The `isAuth` value should only be used after the component has mounted,
 * to avoid potential issues with server-side rendering or during hydration.
 *
 * @returns {Object} An object with two properties:
 * - isAuth: {boolean} The authentication status of the user. True if the user is authenticated.
 *   Should only be used after the component has mounted.
 * - authVar: {ReactiveVar<boolean>} The Apollo Client reactive variable used to manage the authentication state.
 *
 * @example
 * ```jsx
 * 'use client'
 *
 * import React, { useEffect, useState } from 'react';
 * import { useAuth } from './useAuth';
 *
 * const MyComponent = () => {
 *   const [isMounted, setIsMounted] = useState(false);
 *   const { isAuth } = useAuth();
 *
 *   useEffect(() => {
 *     setIsMounted(true);
 *   }, []);
 *
 *   return (
 *     <div>
 *       {isMounted ? (
 *         <p>{isAuth ? 'User is authenticated' : 'User is not authenticated'}</p>
 *       ) : (
 *        <p>Loading...</p>
 *       )}
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
export const useAuth = () => {
	return {
		isAuth: useReactiveVar(authVar),
		authVar
	}
}
