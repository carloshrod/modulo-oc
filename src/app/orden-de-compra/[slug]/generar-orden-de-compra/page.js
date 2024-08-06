'use client';
import { FaRegCircle } from 'react-icons/fa';
import FormOc from '@/components/forms/FormOc';
import styles from './Generate.module.css';

const GenerateOC = () => {
	return (
		<main className={styles.main}>
			<section className={styles.formHeader}>
				<span className={styles.icon}>
					<FaRegCircle size={18} color='#fff' />
				</span>
				<div className={styles.title}>
					<h4>Nueva Orden de Compra</h4>
					<span>DD/MM/YY Nombre usuario</span>
				</div>
			</section>
			<FormOc />
		</main>
	);
};

export default GenerateOC;
