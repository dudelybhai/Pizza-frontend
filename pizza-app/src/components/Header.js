import React from "react"
import Logo from "../assets/img/logo.png"
import CartIcon from "../assets/img/cart-black.png"
import { Link } from "react-router-dom"
import { signout } from "../actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import { Layout, Avatar } from "antd"
const Header = Layout
export default function HeaderLayout() {
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart
	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin
	const dispatch = useDispatch()
	const signoutHandler = () => {
		dispatch(signout())
	}
	return (
		<Header className='' style={{ backgroundColor: "white", padding: 10, height: 80 }}>
			<nav class='container mx-auto flex items-center justify-between'>
				<div>
					<Link to='/'>
						<img src={Logo} alt='logo' />
					</Link>
				</div>
				<div>
					{userInfo ? (
						<ul class='flex items-center text-black'>
							<li className='ml-6'>
								<Link to='/orderhistory'>Order History</Link>
							</li>
							<li className='ml-6'>
								<Link to='#signout' onClick={signoutHandler}>
									Sign Out
								</Link>
							</li>

							<li class='ml-6'>
								<div>
									<a href='/cart' class=' px-4 py-2 rounded-full flex items-center'>
										<span class='text-black font-bold pr-2'>{cartItems.length}</span>
										<img src={CartIcon} alt='carticon' />
									</a>
								</div>
							</li>
							<li className='ml-6'>
								<Avatar
									// className='ant-dropdown-link cursor-pointer'
									// onClick={(e) => e.preventDefault()}
									size={45}
									style={{ color: "white", backgroundColor: "#fe5f1e" }}
								>
									{userInfo.firstName.charAt(0).toLocaleUpperCase() +
										userInfo.lastName.charAt(0).toLocaleUpperCase()}
								</Avatar>
							</li>
						</ul>
					) : (
						<ul class='flex items-center text-black'>
							<li className='ml-6'>
								<Link to='/login'>Sign In</Link>
							</li>
							<li className='ml-6'>
								<Link to='/register'>register</Link>
							</li>

							<li class='ml-6'>
								<div>
									<a href='/cart' class=' px-4 py-2 rounded-full flex items-center'>
										<span class='text-black font-bold pr-2'>{cartItems.length}</span>
										<img src={CartIcon} alt='carticon' />
									</a>
								</div>
							</li>
						</ul>
					)}
				</div>

				{userInfo && userInfo.isAdmin && (
					<div className='dropdown'>
						<Link to='#admin'>
							Admin <i className='fa fa-caret-down'></i>
						</Link>
						<ul className='dropdown-content'>
							<li>
								<Link to='/dashboard'>Dashboard</Link>
							</li>
							<li>
								<Link to='/productlist'>Products</Link>
							</li>
							<li>
								<Link to='/orderlist'>Orders</Link>
							</li>
							<li>
								<Link to='/userlist'>Users</Link>
							</li>
							<li>
								<Link to='/support'>Support</Link>
							</li>
						</ul>
					</div>
				)}
			</nav>
		</Header>
	)
}
