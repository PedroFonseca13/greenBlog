import styles from './Search.module.css'

import { Link } from 'react-router-dom'
// components
import PostDetails from '../../components/PostDetails'

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

const Search = () => {
	const query = useQuery()
	const search = query.get('q')

	const { documents: posts } = useFetchDocuments('posts', search)

	return (
		<div className={styles.search_container}>
			<h3>Search</h3>
			<div>
				{posts && posts.length === 0 && (
					<div className="no_posts">
						<p className={styles.no_posts}>
							A sua pesquisa não encontrou resultados
						</p>
						<Link to="/" className="btn btn-dark">
							Voltar
						</Link>
					</div>
				)}
				{posts &&
					posts.map((post) => <PostDetails key={post.id} post={post} />)}
			</div>
		</div>
	)
}

export default Search
