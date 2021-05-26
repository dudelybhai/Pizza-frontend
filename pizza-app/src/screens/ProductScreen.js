import React from "react"
import HeroImage from "../assets/img/hero-pizza.png"
import EmptyCart from "../assets/img/empty-cart.png"
import { connect } from "react-redux"
import { fetchProducts } from "../actions/productActions"
import { addToCart, removeFromCart } from "../actions/cartActions"
import formatCurrency from "../util"
class ProductScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		this.props.fetchProducts()
	}

	handleScroll = () => {
		document.getElementById("menu").scrollIntoView({ behavior: "smooth" })
	}

	render() {
		let ImageBaseURL = process.env.REACT_APP_BASE_URL
		const { cartItems, products } = this.props

		return (
			<div className='w-full'>
				<section className='hero py-16'>
					<div className='container mx-auto flex items-center justify-between sm:p-4 md:p-0 '>
						<div className='w-1/2'>
							<h6 className='text-lg'>
								<em>Are you hungry?</em>
							</h6>
							<h1 className='text-3xl md:text-6xl font-bold'>Don't wait !</h1>
							<button
								onClick={this.handleScroll}
								class='px-6 py-2 rounded-full text-white font-bold mt-4 btn-primary'
							>
								Order Now
							</button>
						</div>
						<div className='w-1/2'>
							<img src={HeroImage} alt='' />
						</div>
					</div>
				</section>
				<div className='w-full sm:block md:flex '>
					<section id='menu' className='menu container mx-auto py-8 px-12 md:w-1/2 sm:w-full'>
						<h1 className='text-xl font-bold mb-8'>All Pizzas</h1>
						{!products ? (
							<div>Loading...</div>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-gap-12 row-gap-16'>
								{products.map((product) => (
									<div className='w-full md:w-64'>
										<img
											className='h-40 mb-4  '
											src={ImageBaseURL + "/" + product.pizzaImage}
											alt=''
										/>
										<div className='text-center mb-8'>
											<h2 className='mb-4 text-lg'>{product.pizzaName}</h2>
											<span className='size py-1 px-4 rounded-full uppercase text-xs'>
												{product.pizzaSize}
											</span>

											{/* <span class='size py-1 px-4 rounded-full uppercase text-xs'>
												<select
													value={this.state.qty}
													onChange={(e) => this.setState({ qty: e.target.value })}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											</span> */}
											<div className='flex items-center justify-around mt-6'>
												<span className='font-bold text-lg'>€{product.pizzaPrice}</span>
												<button
													onClick={() => {
														this.props.addToCart(product)
													}}
													className='add-to-cart py-1 px-6 rounded-full flex items-center font-bold'
												>
													<span>+</span>
													<span className='ml-4'>Add</span>
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</section>
					<section class='cart py-16 sm:w-full md:w-1/2'>
						{cartItems.length === 0 ? (
							<div class='empty-cart'>
								<div class='container mx-auto text-center'>
									<h1 class='text-3xl font-bold mb-2'>Cart Empty 😕</h1>
									<p class='text-gray-500 text-lg mb-12'>
										You probably haven't ordered a pizza yet. <br />
										To order a pizza, click add to add pizza to cart.
									</p>
									<img class='w-2/5 mx-auto' src={EmptyCart} alt='empty-cart' />
								</div>
							</div>
						) : (
							<div>
								<div class='order container mx-auto xl:w-1/2'>
									<div class='flex items-center border-b border-gray-300 pb-4'>
										<img src='/img/cart-black.png' alt='' />
										<h1 class='font-bold ml-4 text-2xl'>
											You have {cartItems.length} items in Cart
										</h1>
									</div>

									<div class='pizza-list'>
										{cartItems.map((item, key) => (
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

										{/* <button
											onClick={() => {

												localStorage.removeItem("cartItems")
											}}
											className='inline-block cursor-pointer btn-primary px-6 py-2 rounded-full text-white font-bold mt-6'
										>
											clear
										</button> */}
										<a
											href='/cart'
											class='inline-block cursor-pointer btn-primary px-6 py-2 rounded-full text-white font-bold mt-6'
										>
											Go To Cart
										</a>
									</div>
								</div>
							</div>
						)}
					</section>
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => ({ products: state.products.items, cartItems: state.cart.cartItems }),
	{
		fetchProducts,
		addToCart,
		removeFromCart,
	}
)(ProductScreen)
