import styles from './PostDetails.module.css'
import { Link } from 'react-router-dom'

const PostDetails = ({ post }) => {
	return (
		<div className={styles.post_detail}>
			<img src={post.image} alt={post.title} />
			<div>
				<h3>{post.title}</h3>
				<small className={styles.createdby}>{post.createdBy}</small>
				<div className={styles.tags}>
					{post.tags.map((tag) => (
						<p key={tag}>
							<span>#</span>
							{tag}
						</p>
					))}
				</div>
				<Link to={`/posts/${post.id}`} className="btn btn-outline">
					Read article
				</Link>
			</div>
		</div>
	)
}

export default PostDetails
