import axios from "axios"

const client = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	responseType: "json",
	// timeout: 30000,
})

/**
 * Request Wrapper with default success/error actions
 */
const httpRequest = function (options) {
	// console.error(options.data)
	const onSuccess = function (response) {
		return response.data
	}

	const onError = function (error) {
		return Promise.reject(error.response || error.message || error.config || error.request)
	}

	return client(options).then(onSuccess).catch(onError)
}

class APIRequest {
	static async getPostService(url, inputdata) {
		var token = localStorage.getItem("pizza_token")
		const headercontent = token
			? { "Content-Type": "application/json", Authorization: token }
			: { "Content-Type": "application/json" }
		const response = await httpRequest({
			data: inputdata,
			method: "post",
			headers: headercontent,
			url: url,
		})
		return response
	}

	static async getGetService(url) {
		var token = localStorage.getItem("pizza_token")
		const headercontent = token
			? { "Content-Type": "application/json", Authorization: token }
			: { "Content-Type": "application/json" }
		const response = await httpRequest({
			method: "GET",
			headers: headercontent,
			url: url,
		})
		return response
	}

	static async getPutService(url, inputdata) {
		var token = localStorage.getItem("pizza_token")
		const headercontent = token
			? { "Content-Type": "application/json", Authorization: token }
			: { "Content-Type": "application/json" }
		const response = await httpRequest({
			data: inputdata,
			method: "PUT",
			headers: headercontent,
			url: url,
		})
		return response
	}
}

export { httpRequest, APIRequest }
