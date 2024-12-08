class PublicPages {
	home = '/'
	auth = '/auth'
}

class DashboardPages {
	root = (url = '') => `/dashboard${url}`

	home = this.root()
	settings = this.root('/settings')
}

export const publicPages = new PublicPages()
export const dashboardPages = new DashboardPages()
