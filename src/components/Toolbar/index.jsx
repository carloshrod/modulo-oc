import { Button } from 'antd';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { IoAdd, IoDownloadOutline } from 'react-icons/io5';
import styles from './Toolbar.module.css';

const Toolbar = () => {
	return (
		<section className={styles.toolbar}>
			<Link href='/' className={styles.goBack}>
				<span>
					<BiArrowBack /> Volver a todas las Obras
				</span>
			</Link>
			<div className={styles.actionButtons}>
				<Button
					type='primary'
					ghost
					icon={<IoDownloadOutline size={20} />}
					iconPosition='end'
				>
					Descargar Excel
				</Button>
				<Button type='primary' icon={<IoAdd size={24} />}>
					Generar OC
				</Button>
			</div>
		</section>
	);
};

export default Toolbar;
