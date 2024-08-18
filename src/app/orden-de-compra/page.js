import styles from './page.module.css';
import Link from 'next/link';

const OeuvresPage = () => {
	const oeuvre = 'xxx-calle-santa-julia';

	return (
		<section className={styles.home}>
			<h3>Selecciona una obra:</h3>
			<Link href={`/orden-de-compra/${oeuvre}`}>XXX Calle Santa Julia</Link>
		</section>
	);
};

export default OeuvresPage;
