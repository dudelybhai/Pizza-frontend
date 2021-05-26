import { FETCH_PRODUCTS } from "../type"
import { message } from "antd"
import { APIRequest, MenuList } from "../APIManager"

export const fetchProducts = () => async (dispatch) => {
	APIRequest.getGetService(MenuList)
		.then((result) => {
			console.log(result.data)
			const data = result
			dispatch({
				type: FETCH_PRODUCTS,
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
