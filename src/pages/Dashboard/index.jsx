import styles from './Dashboard.module.css'
import { Link } from 'react-router-dom'

// hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'

const Dashboard = () => {
	const { user } = useAuthValue()
	const uid = user.uid

	const { documents: posts, loading } = useFetchDocuments('posts', null, uid)

	const { deleteDocument } = useDeleteDocument('posts')

	// const deleteDocuments = (id) => {}

	return (
		<div className={styles.dashboard}>
			<h2>Dashboard</h2>
			{loading && <p>Loading</p>}
			{posts && posts.length === 0 ? (
				<div className={styles.nopost}>
					<p>Posts not found </p>
					<Link to="/posts/create" className="btn">
						Create you first post
					</Link>
				</div>
			) : (
				<table>
					<thead>
						<tr>
							<th>Título</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{posts &&
							posts.map((post) => (
								<tr key={post.id} className={styles.post_row}>
									<td>{post.title}</td>
									<td>
										<Link to={`/posts/${post.id}`} className="btn btn-outline">
											ver
										</Link>
										<Link
											to={`/posts/edit/${post.id}`}
											className="btn btn-outline"
										>
											Editar
										</Link>
										<button
											onClick={() => deleteDocument(post.id)}
											className="btn btn-outline btn-danger"
										>
											Deletar
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Dashboard
