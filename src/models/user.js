import Model from 'ampersand-model'

export default Model.extend({
	url: 'https://api.github.com/user',

	initialize () {
		this.token = window.localStorage.token
		this.on('change:token', this.onTokenChange)
	},

	props: {
		ids: 'number',
		login: 'string',
		avatar_ur: 'string'
	},

	session: {
		token: 'string'
	},

	onTokenChange () {
		window.localStorage.token = this.token
	},

	ajaxConfig () {
		return {
			headers: {
				Authorization: 'token ' + this.token
			}
		}
	},

	fetchInitialData () {
		if (this.token) {
			this.fetch()
		}
	}
})