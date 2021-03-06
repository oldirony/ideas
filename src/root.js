import React from 'react';
import { Route, Switch } from 'react-router-dom';
import config from './config'
import Async from 'react-code-splitting';

import AuthController from './containers/auth-controller';
import Loader from './containers/loader-container';


// import IdeasListView from './containers/ideas-list-container'
import LoginView from './views/login-view'
import SignupView from './views/signup-view';
import WelcomeView from './views/welcome-view';
import Header from './containers/header-container';
import layout from './styles/_layout.scss';
import './styles/_transitions.scss';
import AuthRoute from './containers/auth-route';
import OfflineView from './views/offline-view';

const IdeasListView = ()=> <Async load={import('./containers/ideas-list-container')}/>

export default () => {
	return (
		<div className={layout.body}>
			<AuthController/>
			<Loader/>
			<Header/>

			<div className={layout.container}>
				<Switch>
					<Route exact path={config.routes.home} component={WelcomeView}/>
					<Route path={config.routes.offline} component={OfflineView}/>
					<AuthRoute path={config.routes.signup} component={SignupView} isProtected={false}/>
					<AuthRoute path={config.routes.login} component={LoginView} isProtected={false}/>
					<AuthRoute path={config.routes.list} component={IdeasListView} isProtected={true}/>
				</Switch>
			</div>
		</div>
	)
}
