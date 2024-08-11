import FormOc from '@/components/forms/FormOc';
import TitleForm from '@/components/ui/TitleForm';
import styles from './GenerateOC.module.css';

const GenerateOCPage = () => {
	return (
		<section className={styles.generateOc}>
			<TitleForm title='Nueva Orden de Compra' />
			<FormOc />
		</section>
	);
};

export default GenerateOCPage;
