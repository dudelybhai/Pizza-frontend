import React from "react"
import { message } from "antd"

class Order extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		return (
			<section class='orders light-section'>
				<div class='container mx-auto pt-12'>
					<h1 class='font-bold text-lg mb-4'>All orders</h1>

					<table class='w-full table-auto bg-white'>
						<thead>
							<tr>
								<th class='px-4 py-2 text-left'>Orders</th>
								<th class='px-4 py-2 text-left'>Phone</th>
								<th class='px-4 py-2 text-left'>Address</th>
								<th class='px-4 py-2 text-left'>Time</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class='border px-4 py-2'>
									<a class='link' href='/customer/orders/<%= order._id %>'>
										{" "}
										order._id{" "}
									</a>
								</td>
								<td class='border px-4 py-2'>order.phone</td>
								<td class='border px-4 py-2'>order.address</td>
								<td class='border px-4 py-2'>moment(order.createdAt).format('hh:mm A')</td>
							</tr>

							<tr>
								<td class='p-4'>
									<span>No orders found!</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		)
	}
}

export default Order
