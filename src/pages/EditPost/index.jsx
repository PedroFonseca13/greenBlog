import styles from './EditPost.module.css'

// hooks
import { useAuthValue } from '../../context/AuthContext'
import { useEffect, useState } from 'react'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
	const { id } = useParams()
	const { document: post } = useFetchDocument('posts', id)

	const [title, setTitle] = useState('')
	const [image, setImage] = useState('')
	const [body, setBody] = useState('')
	const [tags, setTags] = useState([])
	const [formError, setFormError] = useState('')

	useEffect(() => {
		if (post) {
			setTitle(post.title)
			setBody(post.body)
			setImage(post.image)

			const textTags = post.tags.join(', ')
			setTags(textTags)
		}
	}, [post])

	const { user } = useAuthValue()

	const navigate = useNavigate()

	const { updateDocument, response } = useUpdateDocument('posts')

	const handleSubmit = (e) => {
		e.preventDefault()
		setFormError('')

		// validate image
		try {
			new URL(image)
		} catch (error) {
			setFormError('Image must be a valid URL')
		}

		// create tags array
		const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

		// check values
		if (!title || !image || !tags || !body) {
			setFormError('Please fill in all the fields!')
		}

		if (formError) return

		const data = {
			title,
			image,
			body,
			tags: tagsArray,
			uid: user.uid,
			createdBy: user.displayName,
		}
		updateDocument(id, data)

		navigate('/dashboard')
	}

	return (
		<div className={styles.edit_post}>
			{post && (
				<>
					<h2>Edição do post: {post.title}</h2>
					<p>Faça suas alterações e salve novamente seu post </p>
					<form onSubmit={handleSubmit}>
						<label>
							<span>Title</span>
							<input
								type="text"
								name="title"
								placeholder="Think of a good title."
								onChange={(e) => setTitle(e.target.value)}
								value={title}
								required
							/>
						</label>

						<label>
							<span>Image URL</span>
							<input
								type="text"
								name="image"
								placeholder="An image to illustrate your post."
								onChange={(e) => setImage(e.target.value)}
								value={image}
								required
							/>
						</label>

						<label>
							<span>Post body</span>
							<textarea
								name="body"
								placeholder="Put here the text of your post."
								onChange={(e) => setBody(e.target.value)}
								value={body}
								required
							></textarea>
						</label>

						<label>
							<span>Tags</span>
							<input
								type="text"
								name="tags"
								placeholder="Insert the tags separated by comma."
								onChange={(e) => setTags(e.target.value)}
								value={tags}
							/>
						</label>

						{!response.loading && <button className="btn">Salvar</button>}
						{response.loading && (
							<button className="btn" disabled>
								Wait
							</button>
						)}
						{response.error && <p className="error">{response.error}</p>}
						{formError && <p className="error">{formError}</p>}
					</form>
				</>
			)}
		</div>
	)
}

export default EditPost
