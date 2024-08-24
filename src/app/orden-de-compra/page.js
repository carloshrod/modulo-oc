import Link from 'next/link';
import axios from 'axios';
import { env } from '@/config/env';
import styles from './page.module.css';

const OeuvresPage = async () => {
	const getAllOeuvres = async () => {
		try {
			const res = await axios.get(`${env.API_URL}/oeuvres`);
			return res.data;
		} catch (error) {
			console.error(error);
		}
	};
	const oeuvres = await getAllOeuvres();

	return (
		<section className={styles.home}>
			<h3>Selecciona una obra:</h3>
			<div className={styles.linksContainer}>
				{oeuvres?.length > 0 ? (
					oeuvres.map(item => {
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
				) : (
					<h3>¡No hay obras para mostrar!</h3>
				)}
			</div>
		</section>
	);
};

export default OeuvresPage;
