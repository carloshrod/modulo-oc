import FormPurchaseOrder from '@/components/forms/FormPurchaseOrder';
import TitleForm from '@/components/ui/TitleForm';
import Toolbar from '@/components/ui/Toolbar';
import { getOneOeuvre } from '@/services/useOeuvreServices';
import styles from './GeneratePurchaseOrderPage.module.css';

const GeneratePurchaseOrderPage = async ({ params }) => {
	const { slug } = params;
	const oeuvre = await getOneOeuvre(slug);

	return (
		<div className={styles.generatePo}>
			<Toolbar />
			<section className={styles.generatePoForm}>
				<TitleForm title='Nueva Orden de Compra' />
				<FormPurchaseOrder oeuvreId={oeuvre?.id} />
			</section>
		</div>
	);
};

export default GeneratePurchaseOrderPage;
