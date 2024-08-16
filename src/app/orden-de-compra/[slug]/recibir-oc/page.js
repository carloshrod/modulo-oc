'use client';
import TitleForm from '@/components/ui/TitleForm';
import styles from './ReceiveOC.module.css';
import SearchInput from '@/components/forms/SearchInput';
import LayoutIcon from '@/components/oc-receipt/LayoutIcon';
import FormReceipt from '@/components/forms/FormReceipt';
import useOcContext from '@/hooks/useOcContext';
import Toolbar from '@/components/ui/Toolbar';

const ReceiveOCPage = () => {
	const { purchaseOrderToReceive } = useOcContext();

	return (
		<div className={styles.receiveOC}>
			<Toolbar />
			<section className={styles.formContainer}>
				<div className={styles.formHeader}>
					<TitleForm title='Recepción OC' />
					<SearchInput />
				</div>
				{purchaseOrderToReceive?.oc_number ? <FormReceipt /> : null}
			</section>
			{!purchaseOrderToReceive?.oc_number ? (
				<section className={styles.selectOcMessage}>
					<LayoutIcon />
					<p>Selecciona una OC para realizar la recepción.</p>
				</section>
			) : null}
		</div>
	);
};

export default ReceiveOCPage;
