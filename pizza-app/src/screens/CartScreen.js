import React from "react"
import { connect } from "react-redux"
import EmptyCart from "../assets/img/empty-cart.png"
import { APIRequest, CreateOrder } from "../APIManager"
import { createOrder, clearOrder } from "../actions/orderActions"
import { removeFromCart } from "../actions/cartActions"
import formatCurrency from "../util"
import Header from "../components/Header"
import { Checkbox, Modal, message } from "antd"
class CartScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			checked: false,
			disabled: false,
			visible: false,
			loading: false,
			orderBy: "",
			cardNumber: "",
			cardCvv: "",
			address: "",
			expiryMonth: "01",
			expiryYear: "2020",
		}
	}
	toggleChecked = () => {
		this.setState({ checked: !this.state.checked })
	}

	toggleDisable = () => {
		this.setState({ disabled: !this.state.disabled })
	}
	onChange = (e) => {
		// console.log("checked = ", e.target.checked)
		this.setState({
			checked: e.target.checked,
			disabled: true,
		})
	}
	showModal = () => {
		this.setState({
			visible: true,
		})
	}
	// handleSelectionChange = (e) => {
	// 	this.setState({
	// 		cvvMonth: e.target.value,
	// 	})
	// 	console.log(this.state.cvvMonth)
	// }
	onChangeInput = (e) => {
		console.log(e.target.value)
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	componentDidMount() {
		console.log(JSON.stringify(this.props.cartItems))
		// console.log(JSON.stringify(localStorage.getItem("cartItems")))
		// var stringifyData = JSON.stringify(localStorage.getItem("cartItems"))
		// console.log(JSON.parse(stringifyData))
		// var array = JSON.stringify(this.props.cartItems)
		// array.map((item) => console.log(item.pizzaName + " x " + item.pizzaSize + " x " + item.count))
		// var x  = array.forEach
	}

	createOrder = (e) => {
		e.preventDefault()
		// var stringifyData = JSON.stringify(localStorage.getItem("cartItems"))
		if (
			this.state.orderBy === "" ||
			this.state.address === "" ||
			this.state.cardNumber === "" ||
			this.state.cardCvv === ""
		) {
			message.destroy()
			message.error("Please fill all the inputs")
		} else {
			let order = {
				pk_user_id: localStorage.getItem("userId"),
				orderBy: this.state.orderBy,
				address: this.state.address,
				cardNumber: this.state.cardNumber,
				expiryYear: this.state.expiryYear,
				expiryMonth: this.state.expiryMonth,
				cardCvv: this.state.cardCvv,
				cartItems: JSON.stringify(this.props.cartItems),
				total: this.props.cartItems.reduce((a, c) => a + c.pizzaPrice * c.count, 0),
				orderStatus: "new",
			}
			this.props.createOrder(order)
			setTimeout(() => {
				this.setState({ loading: false, visible: false })
			}, 3000)
			this.props.history.replace("/orderhistory")
		}
		// APIRequest.getPostService(CreateOrder, orderData)
		// 	.then((result) => {
		// 		console.log(result)
		// 		message.success(result.message)
		// 		localStorage.removeItem("cartItems")
		// 		setTimeout(() => {
		// 			this.setState({ loading: false, visible: false })
		// 		}, 3000)
		// 		this.props.history.replace("/")
		// 		window.location.reload()

		// 		console.log(message.success(result.message))
		// 	})
		// 	.catch((error) => {
		// 		this.setState({ loading: false, visible: true })
		// 		message.destroy()
		// 		message.error(error.message)
		// 	})
		// }
	}
	handleCancel = () => {
		this.setState({
			visible: false,
			checked: false,
			orderBy: "",
			cardNumber: "",
			cardCvv: "",
			address: "",
			expiryMonth: "01",
			expiryYear: "2020",
		})
	}

	render() {
		const { cartItems, order } = this.props
		let ImageBaseURL = process.env.REACT_APP_BASE_URL
		const userInfo = localStorage.getItem("userInfo")
		const { visible, loading } = this.state
		return (
			<div>
				<Header />
				<Modal visible={visible} footer={null} onCancel={this.handleCancel}>
					<div class='mb-10'>
						<h1 class='text-center font-bold text-xl uppercase'>Secure payment info</h1>
					</div>

					<div class='mb-3'>
						<label class='font-bold text-sm mb-2 ml-1'>Name on card</label>
						<div>
							<input
								id='orderBy'
								name='orderBy'
								onChange={this.onChangeInput}
								defaultValue={this.state.orderBy}
								value={this.state.orderBy}
								class='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
								placeholder='John Smith'
								type='text'
							/>
						</div>
					</div>
					<div class='mb-3'>
						<label class='font-bold text-sm mb-2 ml-1'>Address</label>
						<div>
							<input
								id='address'
								name='address'
								onChange={this.onChangeInput}
								defaultValue={this.state.address}
								value={this.state.address}
								class='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
								placeholder='Unter Den Linden, Berlin'
								type='text'
							/>
						</div>
					</div>
					<div class='mb-3'>
						<label class='font-bold text-sm mb-2 ml-1'>Card number</label>
						<div>
							<input
								id='cardNumber'
								name='cardNumber'
								onChange={this.onChangeInput}
								defaultValue={this.state.cardNumber}
								value={this.state.cardNumber}
								class='w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
								placeholder='0000 0000 0000 0000'
								type='text'
							/>
						</div>
					</div>
					<div class='mb-3 -mx-2 flex items-end'>
						<div class='px-2 w-1/2'>
							<label class='font-bold text-sm mb-2 ml-1'>Expiration date</label>
							<div>
								<select
									id='expiryMonth'
									name='expiryMonth'
									onChange={this.onChangeInput}
									defaultValue={this.state.expiryMonth}
									value={this.state.expiryMonth}
									class='form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'
								>
									<option value='01'>01 - January</option>
									<option value='02'>02 - February</option>
									<option value='03'>03 - March</option>
									<option value='04'>04 - April</option>
									<option value='05'>05 - May</option>
									<option value='06'>06 - June</option>
									<option value='07'>07 - July</option>
									<option value='08'>08 - August</option>
									<option value='09'>09 - September</option>
									<option value='10'>10 - October</option>
									<option value='11'>11 - November</option>
									<option value='12'>12 - December</option>
								</select>
							</div>
						</div>
						<div class='px-2 w-1/2'>
							<select
								id='expiryYear'
								name='expiryYear'
								onChange={this.onChangeInput}
								defaultValue={this.state.expiryYear}
								value={this.state.expiryMonth}
								class='form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'
							>
								<option value='2020'>2020</option>
								<option value='2021'>2021</option>
								<option value='2022'>2022</option>
								<option value='2023'>2023</option>
								<option value='2024'>2024</option>
								<option value='2025'>2025</option>
								<option value='2026'>2026</option>
								<option value='2027'>2027</option>
								<option value='2028'>2028</option>
								<option value='2029'>2029</option>
							</select>
						</div>
					</div>
					<div class='mb-10'>
						<label class='font-bold text-sm mb-2 ml-1'>Security code</label>
						<div>
							<input
								id='cardCvv'
								name='cardCvv'
								onChange={this.onChangeInput}
								defaultValue={this.state.cardCvv}
								value={this.state.cardCvv}
								class='w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
								placeholder='000'
								type='text'
							/>
						</div>
					</div>
					<div className='mb-8'>
						<Checkbox checked={this.state.checked} onChange={this.onChange}>
							I Agree with terms
						</Checkbox>
					</div>
					<div>
						<button
							onClick={this.createOrder}
							class={
								!this.state.checked
									? "block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold opacity-50 cursor-not-allowed"
									: "block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 max-w-xs mx-auto  text-white rounded-lg px-3 py-3 font-semibold"
							}
							disabled={!this.state.checked ? true : false}
						>
							<i class='mdi mdi-lock-outline mr-1'></i> PAY NOW
						</button>
					</div>
				</Modal>
				<section class='cart py-16'>
					{cartItems.length === 0 ? (
						<div class='empty-cart py-16'>
							<div class='container mx-auto text-center'>
								<h1 class='text-3xl font-bold mb-2'>Cart Empty 😕</h1>
								<p class='text-gray-500 text-lg mb-12'>
									You probably haven't ordered a pizza yet. <br />
									To order a pizza, go to the main page.
								</p>
								<img class='w-2/5 mx-auto' src={EmptyCart} alt='empty-cart' />
								<a
									href='/'
									class='inline-block px-6 py-2 rounded-full btn-primary text-white font-bold mt-12'
								>
									Go back
								</a>
							</div>
						</div>
					) : (
						<div>
							<div class='order container mx-auto xl:w-1/2'>
								<div class='flex items-center border-b border-gray-300 pb-4'>
									<img src='/img/cart-black.png' alt='' />
									<h1 class='font-bold ml-4 text-2xl'>Order summary</h1>
								</div>

								<div class='pizza-list'>
									{cartItems.map((item) => (
										<div class='flex items-center my-8'>
											<img class='w-24' src={ImageBaseURL + "/" + item.pizzaImage} alt='' />
											<div class='flex-1 ml-4'>
												<h1>{item.pizzaName}</h1>
												<span> {item.pizzaSize} </span>
											</div>
											<span onClick={() => this.props.removeFromCart(item)} class='flex-1'>
												Remove
											</span>
											<span class='flex-1'>{item.count} PCs</span>
											<span class='font-bold text-lg'>€ {item.pizzaPrice * item.count}</span>

											<br />
										</div>
									))}
								</div>
								<hr />

								<div class='text-right py-4'>
									<div>
										{cartItems.length !== 0 && (
											<div>
												<span class='text-lg font-bold'>Total Amount:</span>
												<span class='amount text-2xl font-bold ml-2'>
													{formatCurrency(
														cartItems.reduce((a, c) => a + c.pizzaPrice * c.count, 0)
													)}
												</span>
											</div>
										)}
									</div>
									<div>
										{userInfo ? (
											<div class='mt-4'>
												{/* <div id='card-element'>
                                                    <Checkbox
                                                    checked={this.state.checked}
                                                    //  disabled={this.state.disabled}

                                                    onChange={this.onChange}
                                                >
                                                    I Agree with terms
                                                </Checkbox></div> */}
												<button
													onClick={this.showModal}
													class='btn-primary px-6 py-2 rounded-full text-white font-bold mt-6'
													type='submit'
												>
													Proceed to Pay
												</button>
											</div>
										) : (
											<a
												href='/login'
												class='inline-block cursor-pointer btn-primary px-6 py-2 rounded-full text-white font-bold mt-6'
											>
												Login to continue
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
				</section>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		order: state.order.order,
		cartItems: state.cart.cartItems,
	}),
	{ removeFromCart, createOrder, clearOrder }
)(CartScreen)
