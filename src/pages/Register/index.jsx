import { useEffect, useState } from 'react'
import style from './Register.module.css'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
	const [displayName, setDisplayName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const { createUser, error: authError, loading } = useAuthentication()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError('')

		const user = {
			displayName,
			email,
			password,
		}

		if (password !== confirmPassword) {
			setError('Passwords need to be equal')
			return
		}

		const res = await createUser(user)

		console.log(res)
		setDisplayName('')
		setEmail('')
		setPassword('')
		setConfirmPassword('')
	}

	useEffect(() => {
		if (authError) {
			setError(authError)
		}
	}, [authError])

	return (
		<div className={style.register}>
			<h1>Sign up to post</h1>
			<p>Create your user and share your stories</p>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Name:</span>
					<input
						type="text"
						name="displayName"
						placeholder="User name"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						required
					/>
				</label>
				<label>
					<span>E-mail:</span>
					<input
						type="email"
						name="email"
						placeholder="User email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					<span>Password:</span>
					<input
						type="password"
						name="password"
						placeholder="User password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					<span>Confirm your password:</span>
					<input
						type="password"
						name="confirmPassword"
						placeholder="User password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{!loading && <button className="btn">Register</button>}
				{loading && <button className="btn">Wait</button>}
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	)
}

export default Register
