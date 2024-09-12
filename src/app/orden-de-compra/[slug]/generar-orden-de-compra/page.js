import FormOc from '@/components/forms/FormOc';
import TitleForm from '@/components/ui/TitleForm';
import styles from './GenerateOC.module.css';
import Toolbar from '@/components/ui/Toolbar';
import { getOneOeuvre } from '@/services/useOeuvreServices';

const GenerateOCPage = async ({ params }) => {
	const { slug } = params;
	const oeuvre = await getOneOeuvre(slug);

	return (
		<div className={styles.generateOc}>
			<Toolbar />
			<section className={styles.generateOcForm}>
				<TitleForm title='Nueva Orden de Compra' />
				<FormOc oeuvreId={oeuvre?.id} />
			</section>
		</div>
	);
};

export default GenerateOCPage;
