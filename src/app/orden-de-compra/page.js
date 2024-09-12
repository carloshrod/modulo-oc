import Link from 'next/link';
import styles from './page.module.css';
import { fetchData } from '@/services/utils';

const OeuvresPage = async () => {
	const oeuvres = await fetchData('/oeuvres');

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
