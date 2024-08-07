import { Button } from 'antd';
import { IoAdd, IoDownloadOutline, IoArrowBackOutline } from 'react-icons/io5';
import styles from './Toolbar.module.css';

const Toolbar = ({ table, showTable, onClick }) => {
	const BTN_LABELS = {
		oc: 'Generar OC',
		receipts: 'Recepción OC',
	};

	return (
		<section className={styles.toolbar}>
			<div className={styles.actionButtons}>
				{showTable ? (
					<Button
						type='primary'
						ghost
						icon={<IoDownloadOutline size={20} />}
						iconPosition='end'
						onClick={() => console.log('Descargando excel!')}
					>
						Descargar Excel
					</Button>
				) : null}
				<Button
					type='primary'
					icon={
						showTable ? <IoAdd size={24} /> : <IoArrowBackOutline size={24} />
					}
					onClick={onClick}
				>
					{showTable ? BTN_LABELS[table] : 'Volver'}
				</Button>
			</div>
		</section>
	);
};

export default Toolbar;
