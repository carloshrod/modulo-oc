import { Button } from 'antd';
import { IoAdd, IoDownloadOutline } from 'react-icons/io5';
import { downloadExcel } from '@/utils/utils';
import styles from './Toolbar.module.css';

const TableToolbar = ({ table, excelData, onClick }) => {
	const BTN_LABELS = {
		oc: 'Generar OC',
		receipts: 'Recibir OC',
	};

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
				<Button type='primary' icon={<IoAdd size={30} />} onClick={onClick}>
					{BTN_LABELS[table]}
				</Button>
			</div>
		</section>
	);
};

export default TableToolbar;
