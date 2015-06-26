import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import RepoDetail from './pages/repo-detail'
import Layout from './layout'

export default Router.extend({
	renderPage (page, opts = {layout: true}) {
		if (opts.layout) {
			page = (
				<Layout user={app.user}>
					{page}
				</Layout>
			)
		}

		React.render(page, document.body)
	},

	routes: {
		'': 'public',
		'repos': 'repos',
		'login': 'login',
		'logout': 'logout',
		'repo/:owner/:name': 'repoDetail',
		'auth/callback?:query': 'authCallback'
	},

	public () {
		this.renderPage(<PublicPage/>, {layout: false})	
	},

	repos () {
		this.renderPage(<ReposPage repos={app.user.repos}/>, {layout: true})
	},

	repoDetail (owner, name) {
		const model = app.user.repos.getByFullName(owner + '/' + name)
		this.renderPage(<RepoDetail repo={model} labels={model.labels}/>)
	},

	login () {
		window.location = "https://github.com/login/oauth/authorize?" + qs.stringify({
			scope: 'user,repo',
			redirect_uri: window.location.origin + '/auth/callback',
			client_id: 'f8dd69187841cdd22a26'
		}) 
	},

	logout () {
		window.localStorage.clear()
		window.location = '/'
	},

	authCallback (query) {
		query = qs.parse(query)
		console.log(query)

		xhr({
			url: 'https://labelr-localhost.herokuapp.com/authenticate/' + query.code,
			json: true
		}, (err, req, body) => {
			console.log(body)
			app.user.token = body.token
			this.redirectTo('/repos')
		})
	}
})