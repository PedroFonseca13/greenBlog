import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Login.module.css'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const { login, error: authError, loading } = useAuthentication()
	const handleSubmit = async (e) => {
		e.preventDefault()

		setError('')

		const user = {
			email,
			password,
		}

		const res = await login(user)
		console.log(res)
	}

	useEffect(() => {
		if (authError) {
			setError(authError)
		}
	}, [authError])
	return (
		<div className={styles.login}>
			<h1>Login</h1>
			<p>
				Login to access your green<span>Blog</span> account
			</p>
			<form onSubmit={handleSubmit}>
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

				{!loading && <button className="btn">Login</button>}
				{loading && (
					<button className="btn" disabled>
						Wait
					</button>
				)}
				{error && <p className="error">{error}</p>}
			</form>
		</div>
	)
}

export default Login
