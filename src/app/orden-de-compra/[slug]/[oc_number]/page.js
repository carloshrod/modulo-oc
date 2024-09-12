import FormOc from '@/components/forms/FormOc';
import TitleForm from '@/components/ui/TitleForm';
import styles from './EditOC.module.css';
import Toolbar from '@/components/ui/Toolbar';
import { getOneOeuvre } from '@/services/useOeuvreServices';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrdersServices';

const EditOCPage = async props => {
	const { params } = props;
	const title = params.oc_number?.replace('oc-', 'OC ');
	const poNumber = params.oc_number?.replace('editar-', '');
	const oeuvre = await getOneOeuvre(params?.slug);
	const data = await getPurchaseOrderByNumber({
		poNumber,
		includeEvents: false,
	});

	return (
		<div className={styles.editOc}>
			<Toolbar />
			<section className={styles.editOcForm}>
				<TitleForm title={title} />
				<FormOc oeuvreId={oeuvre.id} purchaseOrder={data} />
			</section>
		</div>
	);
};

export default EditOCPage;
