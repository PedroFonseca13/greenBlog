import React, { useState } from 'react'
import styles from './CreatePots.module.css'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
	const [title, setTitle] = useState('')
	const [image, setImage] = useState('')
	const [body, setBody] = useState('')
	const [tags, setTags] = useState([])
	const [formError, setFormError] = useState('')

	const { user } = useAuthValue()
	const { insertDocument, response } = useInsertDocument('posts')

	const handleSubmit = (e) => {
		e.preventDefault()
		setFormError('')
	}

	insertDocument({
		title,
		image,
		body,
		tags,
		uid: user.uid,
		createdBy: user.displayName,
	})

	return (
		<div className={styles.create_post}>
			<h2>CreatePost</h2>
			<p>Escreva sobre o que quiser e compartilhe o seu conhecimento. </p>
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
				{!response.loading && <button className="btn">Add new post</button>}
				{response.loading && (
					<button className="btn" disabled>
						Wait
					</button>
				)}
				{response.error && <p className="error">{response.error}</p>}
			</form>
		</div>
	)
}

export default CreatePost
