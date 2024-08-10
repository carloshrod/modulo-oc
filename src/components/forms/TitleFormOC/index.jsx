import { FaRegCircle } from 'react-icons/fa';
import styles from './TitleFormOC.module.css';

const TitleFormOC = ({ ocNumber }) => {
	const title = ocNumber?.replace('oc-', 'OC ') ?? 'Nueva Orden de Compra';

	return (
		<section className={styles.titleFormOC}>
			<span className={styles.icon}>
				<FaRegCircle size={18} color='#fff' />
			</span>
			<div className={styles.title}>
				<h4>{title}</h4>
				<span>DD/MM/YY Nombre usuario</span>
			</div>
		</section>
	);
};

export default TitleFormOC;
