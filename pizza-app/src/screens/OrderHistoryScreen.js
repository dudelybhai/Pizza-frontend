import React from "react"
// import { message } from "antd"
import { moment } from "moment"
import { APIRequest, UserOrders } from "../APIManager"
import Header from "../components/Header"
class OrderHistoryScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			orderList: [],
			cartItems: [],
		}
	}

	componentDidMount() {
		const userId = localStorage.getItem("userId")
		APIRequest.getGetService(UserOrders + "/" + userId).then((result) => {
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
			this.setState({ orderList: result })
			console.log(result)
			console.log(this.state.cartItems)
			console.log(this.state.cartItems.pizzaPrice)

			// const array = result.cartItems
			// console.log(array)
			// console.log(JSON.parse(array))
		})
	}
	render() {
		return (
			<div>
				<Header />
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
													{this.state.cartItems.map((item) => (
														<div>
															{item.count} {" x "} {item.pizzaName} {item.pizzaSize}
														</div>
													))}
												</td>
												<td class='border px-4 py-2'>{item.orderStatus}</td>
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

export default OrderHistoryScreen
