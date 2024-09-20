'use client';
import { FaRegCircle } from 'react-icons/fa';
import styles from './TitleForm.module.css';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import moment from 'moment';

const TitleForm = ({ title }) => {
	const { loggedUser } = usePurchaseOrderContext();
	const today = moment(new Date()).startOf('day').format('DD/MM/YY');

	return (
		<section className={styles.titleForm}>
			<span className={styles.icon}>
				<FaRegCircle size={18} color='#fff' />
			</span>
			<div className={styles.title}>
				<h4>{title}</h4>
				<span>
					{today} {loggedUser?.full_name}
				</span>
			</div>
		</section>
	);
};

export default TitleForm;
