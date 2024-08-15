import FormOc from '@/components/forms/FormOc';
import TitleForm from '@/components/ui/TitleForm';
import styles from './GenerateOC.module.css';
import GoBack from '@/components/ui/GoBack';

const GenerateOCPage = () => {
	return (
		<div className={styles.generateOc}>
			<GoBack />
			<section className={styles.generateOcForm}>
				<TitleForm title='Nueva Orden de Compra' />
				<FormOc />
			</section>
		</div>
	);
};

export default GenerateOCPage;
