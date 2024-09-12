'use client';
import Toolbar from '@/components/ui/Toolbar';
import TitleForm from '@/components/ui/TitleForm';
import SearchInput from '@/components/forms/SearchInput';
import FormReceipt from '@/components/forms/FormReceipt';
import LayoutIcon from '@/components/po-receipt/LayoutIcon';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import styles from './ReceivePurchaseOrderPage.module.css';

const ReceivePurchaseOrderPage = () => {
	const { purchaseOrderToReceive } = usePurchaseOrderContext();

	return (
		<div className={styles.receivePo}>
			<Toolbar />
			<section className={styles.formContainer}>
				<div className={styles.formHeader}>
					<TitleForm title='Recepción OC' />
					<SearchInput />
				</div>
				{purchaseOrderToReceive?.number ? <FormReceipt /> : null}
			</section>
			{!purchaseOrderToReceive?.number ? (
				<section className={styles.selectPoMessage}>
					<LayoutIcon />
					<p>Selecciona una OC para realizar la recepción.</p>
				</section>
			) : null}
		</div>
	);
};

export default ReceivePurchaseOrderPage;
