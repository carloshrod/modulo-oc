import { Button, Tooltip } from 'antd';
import { IoAdd, IoDownloadOutline } from 'react-icons/io5';
import { downloadExcel } from '@/utils/utils';
import styles from './Toolbar.module.css';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';

const TableToolbar = ({ table, excelData, onClick }) => {
	const { loggedUser } = usePurchaseOrderContext();
	const BTN_LABELS = {
		oc: 'Generar OC',
		receipts: 'Recibir OC',
	};

	const disableGenerateOc =
		table === 'oc' && loggedUser?.approver_role === 'approver4';

	return (
		<section className={styles.toolbar}>
			<div className={styles.actionButtons}>
				<Button
					type='primary'
					ghost
					icon={<IoDownloadOutline size={20} />}
					iconPosition='end'
					onClick={() => downloadExcel(excelData)}
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
						disabled={disableGenerateOc}
					>
						{BTN_LABELS[table]}
					</Button>
				</Tooltip>
			</div>
		</section>
	);
};

export default TableToolbar;
