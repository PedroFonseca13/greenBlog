import styles from './Home.module.css'

// hooks
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

// componets
import PostDetails from '../../components/PostDetails'

const Home = () => {
	const [query, setQuery] = useState('')
	const { documents: posts, loading } = useFetchDocuments('posts')

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()

		if (query) {
			return navigate(`/search?q=${query}`)
		}
	}

	return (
		<div className={styles.home}>
			<h2>Latest articles</h2>
			<form onSubmit={handleSubmit} className={styles.search_form}>
				<input
					type="text"
					placeholder="Type your search"
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className="btn btn-dark">Search</button>
			</form>
			<div className={styles.posts_area}>
				{loading && <p>Loading</p>}
				{posts &&
					posts.map((post) => <PostDetails key={post.id} post={post} />)}
				{posts && posts.length === 0 && (
					<div className={styles.nopost}>
						<p>Posts not found </p>
						<Link to="/posts/create" className="btn">
							Create you first post
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
