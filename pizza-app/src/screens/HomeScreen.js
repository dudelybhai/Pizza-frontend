import React from "react"

import { withRouter } from "react-router-dom"

import ProductScreen from "../screens/ProductScreen"
import Header from "../components/Header"

function HomeScreen() {
	return (
		<div>
			<Header />
			<div>
				<ProductScreen />
			</div>
		</div>
	)
}
export default withRouter(HomeScreen)
