export const PUBLIC_URL = {
	home: () => '/',
	auth: () => '/auth'
}

export const DASHBOARD_URL = {
	root: (url = '') => `/dashboard${url}`,

	home: () => DASHBOARD_URL.root(),
	settings: () => DASHBOARD_URL.root('/settings')
}
