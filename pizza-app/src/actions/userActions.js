import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_SIGNIN_FAIL,
	USER_SIGNIN_REQUEST,
	USER_SIGNIN_SUCCESS,
	USER_SIGNOUT,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
} from "../type"
import Axios from "axios"
import { message } from "antd"
import { APIRequest, CreateUser, UserLogin, UserList } from "../APIManager"
export const register = (firstName, lastName, email, password) => async (dispatch) => {
	dispatch({
		type: USER_REGISTER_REQUEST,
		payload: { firstName, lastName, email, password },
	})
	try {
		const { data } = await Axios.post("http://localhost:5000/createuser", {
			firstName,
			lastName,
			email,
			password,
		})
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		})
		// localStorage.setItem("userInfo", JSON.stringify(data))
		// localStorage.setItem("userId", JSON.stringify(data.pkUserId))
		message.destroy()
		message.success("registered Successfully ")
		this.props.history.replace("/login")
	} catch (error) {
		message.destroy()
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: message.error("User Already Exists"),
		})
	}
}

export const signin = (email, password) => async (dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })

	try {
		const { data } = await APIRequest.getPostService(UserLogin, {
			email,
			password,
		})
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })
		localStorage.setItem("userInfo", JSON.stringify(data))
		localStorage.setItem("userId", JSON.stringify(data.pkUserId))
		message.destroy()
		message.success("Login successful")
	} catch (error) {
		message.destroy()
		dispatch({
			type: USER_SIGNIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: message.error(error.data.message),
		})
	}
}

export const signout = () => (dispatch) => {
	localStorage.removeItem("userInfo")
	localStorage.removeItem("cartItems")
	localStorage.removeItem("shippingAddress")
	dispatch({ type: USER_SIGNOUT })
	document.location.href = "/login"
}

export const detailsUser = (pkUserId) => async (dispatch, getState) => {
	dispatch({ type: USER_DETAILS_REQUEST, payload: pkUserId })
	const {
		userSignin: { userInfo },
	} = getState()
	try {
		const { data } = await Axios.get(`http://localhost/users/${pkUserId}`)
		dispatch({ type: USER_DETAILS_REQUEST, payload: data })
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message
		dispatch({ type: USER_DETAILS_FAIL, payload: message })
	}
}

export const listUsers = () => async (dispatch, getState) => {
	dispatch({ type: USER_LIST_REQUEST })
	try {
		const {
			userSignin: { userInfo },
		} = getState()
		const { data } = await APIRequest.getGetService(UserList)
		dispatch({ type: USER_LIST_SUCCESS, payload: data })
	} catch (error) {
		const message =
			error.response && error.response.data.message ? error.response.data.message : error.message
		dispatch({ type: USER_LIST_FAIL, payload: message })
	}
}
