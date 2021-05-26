import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER, FETCH_ORDERS } from "../type"
import { APIRequest, CreateOrder, UserOrders } from "../APIManager"
import { message } from "antd"
import Axios from "axios"
export const createOrder = (order) => (dispatch) => {
	console.log(order)
	APIRequest.getPostService(CreateOrder, order).then((result) => {
		console.log(result)
		message.destroy()
		message.success(result.message)
		const data = result
		dispatch({
			type: CREATE_ORDER,
			payload: data,
		})
		localStorage.removeItem("cartItems")
		window.location.reload()

		dispatch({ type: CLEAR_CART })
	})
	// Axios.post("http://localhost:5000/createorder", {
	// 	body: JSON.stringify(order),
	// })
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		dispatch({ type: CREATE_ORDER, payload: data })
	// 		localStorage.clear("cartItems")
	// 		dispatch({ type: CLEAR_CART })
	// 	})
}

export const clearOrder = () => (dispatch) => {
	dispatch({ type: CLEAR_ORDER })
}
export const fetchOrders = () => (dispatch, getState) => {
	const {
		userSignin: { userInfo },
	} = getState()
	// try {
	// 	const data = Axios.get(`http://localhost:5000/orderlist/${userInfo.pkUserId}`)
	// 	console.log(data)
	// dispatch({ type: FETCH_ORDERS, payload: data })
	// } catch (err) {}
	APIRequest.getGetService(UserOrders + "/" + userInfo.pkUserId)
		.then((result) => {
			console.log(result.data)
			const data = result
			dispatch({
				type: FETCH_ORDERS,
				payload: data,
			})
		})
		.catch((error) => {
			// console.log(error)
			if (error.message) {
				message.error(error.message)
			} else if (error.data) {
				message.error(error.data.message)
			} else {
				message.error(error)
			}
		})
}
