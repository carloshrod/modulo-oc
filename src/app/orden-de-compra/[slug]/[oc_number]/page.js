import FormPurchaseOrder from '@/components/forms/FormPurchaseOrder';
import TitleForm from '@/components/ui/TitleForm';
import Toolbar from '@/components/ui/Toolbar';
import { getOneOeuvre } from '@/services/useOeuvreServices';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrderServices';
import styles from './EditPurchaseOrderPage.module.css';

const EditPurchaseOrderPage = async props => {
	const { params } = props;
	const title = params.oc_number?.replace('oc-', 'OC ');
	const poNumber = params.oc_number?.replace('editar-', '');
	const oeuvre = await getOneOeuvre(params?.slug);
	const data = await getPurchaseOrderByNumber({
		poNumber,
		includeEvents: false,
	});

	return (
		<div className={styles.editPo}>
			<Toolbar />
			<section className={styles.editPoForm}>
				<TitleForm title={title} />
				<FormPurchaseOrder oeuvreId={oeuvre.id} purchaseOrder={data} />
			</section>
		</div>
	);
};

export default EditPurchaseOrderPage;
