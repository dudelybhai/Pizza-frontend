import React from "react"
import { message, Modal } from "antd"
import { moment } from "moment"
import { APIRequest, UserOrders, UpdateStatus } from "../APIManager"
import Header from "../components/Header"
class OrderListScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			orderList: [],
			cartItems: [],
			orderStatus: "",
			pkOrdersId: "",
			visible: false,
		}
	}
	handleCancel = () => {
		this.setState({
			visible: false,
			orderStatus: "",
			pkOrdersId: "",
		})
	}

	onChangeInput = (e) => {
		console.log(e.target.value)
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	showModal = () => {
		this.setState({
			visible: true,
		})
	}

	handleSubmitStatus = (e) => {
		e.preventDefault()
		message.destroy()
		let inputStatus = {
			pkOrdersId: this.state.pkOrders_id,
			orderStatus: this.state.orderStatus,
		}
		console.log(inputStatus)
		APIRequest.getPutService(UpdateStatus, inputStatus)
			.then((result) => {
				console.log(result)
				message.success(result.message)
				this.setState({
					visible: false,
					orderStatus: "",
					pkOrdersId: "",
				})
				window.reload()
			})
			.catch((error) => {
				message.error("Status Cannot be Updated")
				this.setState({
					visible: true,
				})
			})
	}

	componentDidMount() {
		const userId = localStorage.getItem("userId")
		APIRequest.getGetService(UserOrders).then((result) => {
			console.log(result)
			// result.map((item, key) => {
			//  item.cartItems = JSON.parse(item.cartItems)
			//  console.log(JSON.parse(item.cartItems))
			//  return item
			// })
			result.forEach((item, key) => {
				item.cartItems = JSON.parse(item.cartItems)
				this.setState({
					cartItems: item.cartItems,
				})
			})
			this.setState({ orderList: result, orderStatus: result.orderStatus })
			console.log(result)
			console.log(this.state.cartItems)
			console.log(this.state.cartItems.pizzaPrice)

			// const array = result.cartItems
			// console.log(array)
			// console.log(JSON.parse(array))
		})
	}

	render() {
		const { visible } = this.state
		return (
			<div>
				<Header />
				<Modal visible={visible} footer={null} onCancel={this.handleCancel}>
					<div class='mb-10'>
						<h1 class='text-center font-bold text-xl uppercase'>
							change status for order No : {this.state.pkOrdersId}
						</h1>
					</div>

					<div class='w-full'>
						<select
							id='orderStatus'
							name='orderStatus'
							onChange={this.onChangeInput}
							defaultValue={this.state.orderStatus}
							value={this.state.orderStatus}
							class='form-select w-full px-3 py-2 mb-8 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'
						>
							<option value='preparing'>preparing</option>
							<option value='delivering'>delivering</option>
							<option value='delivered'>delivered</option>
						</select>
					</div>

					<div>
						<button
							onClick={this.handleSubmitStatus}
							class='block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 max-w-xs mx-auto  text-white rounded-lg px-3 py-3 font-semibold'
						>
							<i class='mdi mdi-lock-outline mr-1'></i> UPDATE STATUS
						</button>
					</div>
				</Modal>
				<section class='orders light-section'>
					<div class='container mx-auto pt-12'>
						<h1 class='font-bold text-lg mb-4'>All orders</h1>

						<table class='w-full table-auto bg-white'>
							<thead>
								<tr>
									<th class='px-4 py-2 text-left'>Orders</th>
									<th class='px-4 py-2 text-left'>Order By</th>
									<th class='px-4 py-2 text-left'>Address</th>
									<th class='px-4 py-2 text-left'>Menu</th>
									<th class='px-4 py-2 text-left'>Status</th>
									<th class='px-4 py-2 text-left'>Action</th>
									{/* <th class='px-4 py-2 text-left'>Action</th> */}

									{/* <th class='px-4 py-2 text-left'>Status</th> */}
								</tr>
							</thead>
							<tbody>
								{this.state.orderList.length > 0 ? (
									this.state.orderList.map((item, key) => {
										return (
											<tr>
												<td class='border px-4 py-2'> {item.pkOrdersId}</td>
												<td class='border px-4 py-2'>{item.orderBy}</td>
												<td class='border px-4 py-2'>{item.address}</td>

												<td class='border px-4 py-2'>
													{this.state.cartItems > 0
														? this.state.cartItems.map((item) => (
																<div>
																	{item.count} {" x "} {item.pizzaName} {item.pizzaSize}
																</div>
														  ))
														: null}
												</td>
												<td class='border px-4 py-2'>{item.orderStatus}</td>
												<td class='border px-4 py-2'>
													<button
														onClick={() =>
															this.setState({
																visible: true,
																pkOrdersId: item.pkOrdersId,
																orderStatus: item.orderStatus,
															})
														}
													>
														update
													</button>
												</td>
												{/* <td class='border px-4 py-2'>update</td> */}
											</tr>
										)
									})
								) : (
									<td class='border px-4 py-2'>No orders found!</td>
								)}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		)

		// moment(item.createdAt).format("hh:mm A")
	}
}

export default OrderListScreen
