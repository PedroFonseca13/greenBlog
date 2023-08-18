import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import './App.css'

// components
import Footer from './components/Footer'
import Navbar from './components/Navbar'

// pages
import About from './pages/About'
import CreatePost from './pages/CreatePost'
import Dashboard from './pages/Dashboard'
import EditPost from './pages/EditPost'
import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Register from './pages/Register'
import Search from './pages/Search'

// context
import { AuthProvider } from './context/AuthContext'

// hooks
import { useAuthentication } from './hooks/useAuthentication'

function App() {
	const [user, setUser] = useState(undefined)
	const { auth } = useAuthentication()

	const loadingUser = user === undefined

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user)
		})
	})

	if (loadingUser) return <p>Loading</p>

	return (
		<div className="App">
			<AuthProvider value={{ user }}>
				<BrowserRouter>
					<Navbar />
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/search" element={<Search />} />
							<Route path="/posts/:id" element={<Post />} />
							<Route
								path="/login"
								element={!user ? <Login /> : <Navigate to="/" />}
							/>
							<Route
								path="/register"
								element={!user ? <Register /> : <Navigate to="/" />}
							/>
							<Route
								path="/dashboard"
								element={user ? <Dashboard /> : <Navigate to="/login" />}
							/>
							<Route
								path="/posts/create"
								element={user ? <CreatePost /> : <Navigate to="/login" />}
							/>
							<Route
								path="/posts/edit/:id"
								element={user ? <EditPost /> : <Navigate to="/login" />}
							/>
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	)
}

export default App
