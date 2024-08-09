import { FaRegCircle } from 'react-icons/fa';
import styles from './FormHeader.module.css';

const FormHeader = ({ ocNumber }) => {
	const title = ocNumber?.replace('oc-', 'OC ') ?? 'Nueva Orden de Compra';

	return (
		<section className={styles.formHeader}>
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

export default FormHeader;
