import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { signin } from "../actions/userActions"

export default function SignInScreen(props) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

	const userSignin = useSelector((state) => state.userSignin)
	const { userInfo } = userSignin

	const dispatch = useDispatch()
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(signin(email, password))
	}
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect)
		}
	}, [props.history, redirect, userInfo])
	return (
		<section class='flex flex-col md:flex-row h-screen items-center'>
			<div class='bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen'>
				<img
					src='https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
					alt=''
					class='w-full h-full object-cover'
				/>
			</div>

			<div
				class='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center'
			>
				<div class='w-full h-100'>
					<h1 class='text-xl md:text-2xl font-bold leading-tight mt-12'>Log in to your account</h1>

					<form class='mt-6' onSubmit={submitHandler} autocomplete='on'>
						<div>
							<label class='block text-gray-700'>Email Address</label>
							<input
								type='email'
								name='email'
								id='email'
								onChange={(e) => setEmail(e.target.value)}
								// defaultValue={this.state.email}
								// value={this.state.email}
								placeholder='Enter Email Address'
								class='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
								autofocus
								autocomplete
								required
							/>
						</div>

						<div class='mt-4'>
							<label class='block text-gray-700'>Password</label>
							<input
								type='password'
								name='password'
								id='password'
								onChange={(e) => setPassword(e.target.value)}
								// defaultValue={this.state.password}
								// value={this.state.password}
								placeholder='Enter Password'
								minlength='6'
								class='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none'
								required
							/>
						</div>
						<button
							type='submit'
							class='w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                                 px-4 py-3 mt-6'
						>
							Log In
						</button>
					</form>

					<hr class='my-6 border-gray-300 w-full' />

					<p class='mt-8'>
						Need an account?{" "}
						<a href='/register' class='text-blue-500 hover:text-blue-700 font-semibold'>
							Create an account
						</a>
					</p>
				</div>
			</div>
		</section>
	)
}
