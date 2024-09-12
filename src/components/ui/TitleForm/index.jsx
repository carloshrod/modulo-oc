import { FaRegCircle } from 'react-icons/fa';
import styles from './TitleForm.module.css';

const TitleForm = ({ title }) => {
	return (
		<section className={styles.titleForm}>
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

export default TitleForm;
