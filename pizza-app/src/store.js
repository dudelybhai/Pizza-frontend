import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import thunk from "redux-thunk"
import { productsReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { orderReducer } from "./reducers/orderReducers"
import {
	userDetailsReducer,
	userListReducer,
	userRegisterReducer,
	userSigninReducer,
} from "./reducers/userReducer"

const initialState = {
	userSignin: {
		userInfo: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
	},
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem("shippingAddress"))
			: {},
	},
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
	combineReducers({
		products: productsReducer,
		cart: cartReducer,
		order: orderReducer,
		userSignin: userSigninReducer,
		userRegister: userRegisterReducer,
		userList: userListReducer,
		userDetails: userDetailsReducer,
	}),
	initialState,
	composeEnhancer(applyMiddleware(thunk))
)
export default store
