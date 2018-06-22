import { Scene, Router, ActionConst } from 'react-native-router-flux'
import React, { Component } from 'react'
import { Provider } from 'react-redux'

import * as scenes from '../constants/scene'
import Index from '../containers/Index'
import SplashScreen from '../containers/SplashScreen'
import store from '../redux/store'

export default class AppRouter extends Component {
	render() {
		return (
				<Provider store={store}>
					<Router>
						<Scene key='root'>
							<Scene
	              key={scenes.SCENE_SPLASH_SCREEN}
	              component={SplashScreen}
	              initial
	              type={ActionConst.RESET}
	              duration={0}
	              hideNavBar
	            />
							<Scene
								key={scenes.SCENE_INDEX}
								component={Index}
								title='简约睡眠'
								type={ActionConst.REST}
								hideNavBar
							/>
						</Scene>
					</Router>
				</Provider>
			)
	}
}