import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
	return (
		<div className={styles.about}>
			<h2>
				Sobre o <span>green</span>Blog.
			</h2>
			<p>
				O <span>green</span>Blog é um cativante projeto de mini blog
				desenvolvido em React, utilizando os poderosos hooks para uma
				experiência de desenvolvimento moderna e eficiente. Este blog dinâmico e
				responsivo oferece aos usuários a oportunidade de compartilhar e
				descobrir uma variedade de conteúdos relacionados ao mundo verde e
				ambiental.
			</p>
			<p>
				Com recursos intuitivos e interativos, os leitores podem explorar uma
				coleção diversificada de postagens, abrangendo tópicos sustentáveis,
				dicas ecológicas e novidades ambientais. A integração perfeita com o
				Firebase permite um gerenciamento simplificado de autenticação de
				usuários e armazenamento de dados em tempo real, garantindo uma
				experiência fluida. Junte-se a nós no <span>green</span>Blog para se
				inspirar, aprender e contribuir para um futuro mais sustentável.
			</p>
			<Link to="/posts/create" className="btn">
				Create a new post
			</Link>
		</div>
	)
}

export default About
