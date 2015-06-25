import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'
import RepoCollection from './repo-collection'

export default Model.extend(githubMixin, {
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

	collections: {
		repos: RepoCollection
	},

	onTokenChange () {
		window.localStorage.token = this.token
	},

	fetchInitialData () {
		if (this.token) {
			this.fetch()
			this.repos.fetch()
		}
	}
})