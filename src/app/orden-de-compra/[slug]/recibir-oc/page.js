'use client';
import Toolbar from '@/components/ui/Toolbar';
import TitleForm from '@/components/ui/TitleForm';
import SearchInput from '@/components/forms/SearchInput';
import FormReceipt from '@/components/forms/FormReceipt';
import LayoutIcon from '@/components/po-receipt/LayoutIcon';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import styles from './ReceivePurchaseOrderPage.module.css';
import { fetchData } from '@/services/utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ReceivePurchaseOrderPage = () => {
	const { purchaseOrderToReceive, setPurchaseOrders } =
		usePurchaseOrderContext();
	const { slug } = useParams();
	const [oeuvreId, setOeuvreId] = useState(null);

	const getApprovedOrdersByOeuvre = async () => {
		const oeuvre = await fetchData(`/oeuvres/${slug}`);
		setOeuvreId(oeuvre?.id);
		const data = await fetchData(`/purchase-orders/${oeuvre?.id}`);
		const approvedOrders =
			data?.length > 0 && data.filter(po => po.status === 'Aprobada');

		setPurchaseOrders(approvedOrders);
	};

	useEffect(() => {
		getApprovedOrdersByOeuvre();
	}, []);

	return (
		<div className={styles.receivePo}>
			<Toolbar />
			<section className={styles.formContainer}>
				<div className={styles.formHeader}>
					<TitleForm title='Recepción OC' />
					<SearchInput oeuvreId={oeuvreId} />
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
