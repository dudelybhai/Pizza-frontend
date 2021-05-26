import React from "react"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import HomeScreen from "./screens/HomeScreen"
import SignInScreen from "./screens/SignInScreen"

import RegisterScreen from "./screens/RegisterScreen"
import CartScreen from "./screens/CartScreen"
import NotFound from "./components/404"
import OrderHistoryScreen from "./screens/OrderHistoryScreen"
import OrderListScreen from "./screens/OrderListScren"
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomeScreen} />
				<Route exact path='/login' component={SignInScreen} />
				<Route exact path='/register' component={RegisterScreen} />
				<Route exact path='/cart' component={CartScreen} />
				<Route exact path='/orderhistory' component={OrderHistoryScreen} />
				<Route exact path='/admin' component={OrderListScreen} />
				<Route exact path='*' component={NotFound} />
			</Switch>
		</Router>
	)
}

export default App
