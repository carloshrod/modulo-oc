import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
	const obra = 'xxx-calle-santa-julia';

	return (
		<main className={styles.main}>
			<h3>Selecciona una obra:</h3>
			<Link href={`/orden-de-compra/${obra}`}>XXX Calle Santa Julia</Link>
		</main>
	);
}
