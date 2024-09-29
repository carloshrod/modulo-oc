import FormPurchaseOrder from '@/components/forms/FormPurchaseOrder';
import TitleForm from '@/components/ui/TitleForm';
import Toolbar from '@/components/ui/Toolbar';
import { fetchData } from '@/services/utils';
import styles from './EditPurchaseOrderPage.module.css';

const EditPurchaseOrderPage = async props => {
	const {
		params: { oc_number, slug },
	} = props;
	const title = oc_number?.replace('oc-', 'OC ');
	const poNumber = oc_number?.replace('editar-', '');
	const oeuvre = await fetchData(`/oeuvres/${slug}`);

	return (
		<div className={styles.editPo}>
			<Toolbar />
			<section className={styles.editPoForm}>
				<TitleForm title={title} />
				<FormPurchaseOrder oeuvre={oeuvre} poNumber={poNumber} />
			</section>
		</div>
	);
};

export default EditPurchaseOrderPage;
