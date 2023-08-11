import { db } from '../firebase/config'

import { useEffect, useState } from 'react'

import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
} from 'firebase/auth'

export const useAuthentication = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

	//cleanup
	// deal with memory leak
	const [cancelled, setCancelled] = useState(false)

	const auth = getAuth()

	function checkIfIsCancelled() {
		if (cancelled) {
			return
		}
	}

	// register
	const createUser = async (data) => {
		checkIfIsCancelled()
		setLoading(true)
		setError(null)

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			)

			await updateProfile(user, {
				displayName: data.displayName,
			})
			setLoading(false)

			return user
		} catch (error) {
			console.log(error.message)
			console.log(typeof error.message)

			let systemErrorMessage

			if (error.message.includes('Password')) {
				systemErrorMessage = 'Password should be at least 6 characters'
			} else if (error.message.includes('email-already')) {
				systemErrorMessage = 'E-mail already registered'
			} else {
				systemErrorMessage = 'Internal server error'
			}

			setLoading(false)
			setError(systemErrorMessage)
		}
	}

	// logout user
	const logout = () => {
		checkIfIsCancelled()

		signOut(auth)
	}

	const login = async (data) => {
		checkIfIsCancelled()

		setLoading(true)
		setError(false)

		try {
			await signInWithEmailAndPassword(auth, data.email, data.password)
			setLoading(false)
		} catch (error) {
			let systemErrorMessage

			if (error.message.includes('user-not-found')) {
				systemErrorMessage = 'e-mail or password is invalid'
			} else if (error.message.includes('invalid-password')) {
				systemErrorMessage = 'e-mail or password is invalid'
			} else {
				systemErrorMessage = 'Internal server error'
			}
			setLoading(false)
			setError(systemErrorMessage)
		}
	}

	useEffect(() => {
		return () => setCancelled(true)
	}, [])

	return {
		auth,
		createUser,
		error,
		loading,
		logout,
		login,
	}
}
