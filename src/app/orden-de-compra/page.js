import Link from 'next/link';
import axios from 'axios';
import styles from './page.module.css';

const OeuvresPage = async () => {
	const res = await axios.get('http://localhost:4000/api/v1/oeuvres');
	const oeuvres = res.data;

	return (
		<section className={styles.home}>
			<h3>Selecciona una obra:</h3>
			<div className={styles.linksContainer}>
				{oeuvres.length > 0
					? oeuvres.map(item => {
							const slug = item.oeuvre_name.toLowerCase().split(' ').join('-');
							return (
								<Link
									className={styles.oeuvreLinks}
									key={item.id}
									href={`/orden-de-compra/${slug}`}
								>
									<span>{item.oeuvre_name}</span>
								</Link>
							);
						})
					: null}
			</div>
		</section>
	);
};

export default OeuvresPage;
