import { ADD_TO_CART, REMOVE_FROM_CART } from "../type"
import { message } from "antd"

export const addToCart = (product, qty) => (dispatch, getState) => {
	const cartItems = getState().cart.cartItems.slice()
	let alreadyExists = false
	cartItems.forEach((x) => {
		if (x.pkMenuId === product.pkMenuId) {
			alreadyExists = true
			x.count++
			message.destroy()
			message.success(
				`${product.pizzaName} with ${product.pizzaSize} Size added to cart successfully`
			)
		}
	})
	if (!alreadyExists) {
		cartItems.push({ ...product, count: 1 })
	}
	dispatch({
		type: ADD_TO_CART,
		payload: { cartItems },
	})
	console.log(cartItems)
	localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

// export const removeFromCart = (product) => (dispatch, getState) => {
// 	const cartItems = getState().cart.cartItems.slice()
// 	message.destroy()
// 	message.success("removed")
// 	dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } })
// 	console.log(cartItems)
// 	localStorage.setItem("cartItems", JSON.stringify(cartItems))
// }
export const removeFromCart = (product) => (dispatch, getState) => {
	const cartItems = getState()
		.cart.cartItems.slice()
		.filter((x) => x.pkMenuId !== product.pkMenuId)
	dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } })
	localStorage.setItem("cartItems", JSON.stringify(cartItems))
	message.destroy()
	message.success(
		`${product.pizzaName} with ${product.pizzaSize} Size  removed from cart successfully`
	)
}
