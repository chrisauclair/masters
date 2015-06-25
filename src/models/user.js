import Model from 'ampersand-model'

export default Model.extend({
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
	}
})