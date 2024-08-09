import { Input, Table } from 'antd';
import styles from './InfoReceiptOC.module.css';
import useTableColumns from '@/hooks/useTableColumns';
import { receiptsData } from '@/utils/consts';

const InfoReceiptOC = ({ purchaseOrder }) => {
	const { id, oc_name, oc_gloss, provider_rut, provider_name } = purchaseOrder;
	const { itemsReceiptsOcColumns, receiptsHistoryColumns } = useTableColumns();

	const receiptsHistory = receiptsData.filter(el => {
		return el.oc_number === purchaseOrder.oc_number;
	});

	return (
		<div className={styles.mainContainer}>
			<div className={styles.topContainer}>
				<section className={styles.detailOC}>
					<h3>Detalle OC</h3>
					<div className={styles.inputsContainer}>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>Nombre OC</label>
							<Input readOnly id={id} value={oc_name} />
						</div>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>Glosa OC</label>
							<Input readOnly id={id} value={oc_gloss} />
						</div>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>RUT Proveedor</label>
							<Input readOnly id={id} value={provider_rut} />
						</div>
						<div className={styles.inputReadOnly}>
							<label htmlFor={id}>Proveedor</label>
							<Input readOnly id={id} value={provider_name} />
						</div>
					</div>
				</section>
				<section className={styles.items}>
					<h3>Artículos</h3>
					<Table
						rowKey='sku'
						columns={itemsReceiptsOcColumns}
						dataSource={purchaseOrder?.items}
						pagination={false}
					/>
				</section>
			</div>
			<div className={styles.bottomContainer}>
				<Table
					rowKey='id'
					columns={receiptsHistoryColumns}
					dataSource={receiptsHistory}
					pagination={false}
				/>
			</div>
		</div>
	);
};

export default InfoReceiptOC;
