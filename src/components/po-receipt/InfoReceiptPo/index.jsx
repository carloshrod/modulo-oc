import { Input, Table } from 'antd';
import useTableColumns from '@/hooks/useTableColumns';
import styles from './InfoReceiptPO.module.css';
import { getReceiptsByPurchaseOrder } from '@/services/purchaseOrderServices';
import { useEffect } from 'react';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';

const { GET_RECEIPTS } = PO_TYPES;

const InfoReceiptPo = ({ purchaseOrder }) => {
	const { id, name, gloss, supplier_rut, supplier_name } = purchaseOrder;
	const { itemsReceiptsPoColumns, receiptsHistoryColumns } = useTableColumns();
	const { receipts, dispatch } = usePurchaseOrderContext();

	const fetchReceipts = async () => {
		if (purchaseOrder?.id) {
			const data = await getReceiptsByPurchaseOrder(purchaseOrder.id);
			dispatch({ type: GET_RECEIPTS, payload: data });
		}
	};

	useEffect(() => {
		fetchReceipts();
	}, []);

	return (
		<div className={styles.mainContainer}>
			<div className={styles.topContainer}>
				<section className={styles.detailOC}>
					<h3>Detalle OC</h3>
					<div className={styles.inputsContainer}>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>Nombre OC</label>
							<Input readOnly id={id} value={name} />
						</div>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>Glosa OC</label>
							<Input readOnly id={id} value={gloss} />
						</div>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>RUT Proveedor</label>
							<Input readOnly id={id} value={supplier_rut} />
						</div>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>Proveedor</label>
							<Input readOnly id={id} value={supplier_name} />
						</div>
					</div>
				</section>
				<section className={styles.items}>
					<h3>Artículos</h3>
					<Table
						rowKey='id'
						columns={itemsReceiptsPoColumns}
						dataSource={purchaseOrder?.items}
						pagination={false}
					/>
				</section>
			</div>
			<div className={styles.bottomContainer}>
				<h3>Historial recepción</h3>
				<Table
					rowKey='id'
					columns={receiptsHistoryColumns}
					dataSource={receipts}
					pagination={false}
				/>
			</div>
		</div>
	);
};

export default InfoReceiptPo;
