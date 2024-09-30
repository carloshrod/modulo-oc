import { Button, Tooltip } from 'antd';
import { IoAdd, IoDownloadOutline } from 'react-icons/io5';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import {
	downloadExcel,
	generatePoExcelData,
	generatePoReceiptsExcelData,
} from '@/utils/documents';
import styles from './Toolbar.module.css';
import { fetchData } from '@/services/utils';

const TableToolbar = ({ oeuvreId, table, noData, onClick }) => {
	const { loggedUser } = usePurchaseOrderContext();
	const isTableOc = table === 'oc';
	const disableGenerateOc =
		isTableOc && loggedUser?.approver_role === 'approver4';

	const getPurchaseOrdersByOeuvre = async () => {
		return await fetchData(`/purchase-orders/${oeuvreId}?includeItems=true`);
	};

	const getPoWithReceipts = async () => {
		return await fetchData(
			`/purchase-orders/${oeuvreId}?includeItemReceipts=true`,
		);
	};

	const handleDownloadExcel = async () => {
		try {
			const data = isTableOc
				? await getPurchaseOrdersByOeuvre()
				: await getPoWithReceipts();

			const excelData =
				data &&
				(isTableOc
					? generatePoExcelData(data)
					: generatePoReceiptsExcelData(data));

			if (excelData) {
				const prefix = isTableOc ? 'OCS' : 'RCPS';
				downloadExcel(excelData, prefix);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className={styles.toolbar}>
			<div className={styles.actionButtons}>
				<Button
					type='primary'
					ghost
					icon={<IoDownloadOutline size={20} />}
					iconPosition='end'
					onClick={handleDownloadExcel}
					disabled={noData}
				>
					Descargar Excel
				</Button>
				<Tooltip
					title={
						disableGenerateOc
							? 'No puedes generar OCs porque eres el último aprobador'
							: ''
					}
				>
					<Button
						type='primary'
						icon={<IoAdd size={30} />}
						onClick={onClick}
						disabled={disableGenerateOc || noData}
					>
						{isTableOc ? 'Generar OC' : 'Recibir OC'}
					</Button>
				</Tooltip>
			</div>
		</section>
	);
};

export default TableToolbar;
