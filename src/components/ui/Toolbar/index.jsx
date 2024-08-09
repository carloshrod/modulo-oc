import { Button } from 'antd';
import { IoAdd, IoDownloadOutline } from 'react-icons/io5';
import styles from './Toolbar.module.css';

const Toolbar = ({ table, onClick }) => {
	const BTN_LABELS = {
		oc: 'Generar OC',
		receipts: 'Recepción OC',
	};

	return (
		<section className={styles.toolbar}>
			<div className={styles.actionButtons}>
				<Button
					type='primary'
					ghost
					icon={<IoDownloadOutline size={20} />}
					iconPosition='end'
					onClick={() => console.log('Descargando excel!')}
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

export default Toolbar;
