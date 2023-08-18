import styles from './Post.module.css'

// hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
	const { id } = useParams()
	const { document: post, loading } = useFetchDocument('posts', id)
	return (
		<div className={styles.post_container}>
			{loading && <p>Loading post</p>}
			{post && (
				<>
					<h2>{post.title}</h2>
					<img src={post.image} alt={post.title} />
					<p>{post.body}</p>
					<h3>Este post trata sobre:</h3>
					<div className={styles.tags}>
						{post.tags.map((tag) => (
							<p key={tag}>
								<span>#</span>
								{tag}
							</p>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default Post