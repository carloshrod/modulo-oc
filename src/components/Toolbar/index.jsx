'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { BiArrowBack } from 'react-icons/bi';
import { IoAdd, IoDownloadOutline } from 'react-icons/io5';
import styles from './Toolbar.module.css';

const Toolbar = () => {
	const router = useRouter();
	const obra = 'xxx-calle-santa-julia';

	return (
		<section className={styles.toolbar}>
			<Button
				type='primary'
				ghost
				icon={<BiArrowBack size={20} />}
				iconPosition='start'
				onClick={() => router.push('/')}
			>
				Volver a todas las Obras
			</Button>
			<div className={styles.actionButtons}>
				<Button
					type='primary'
					ghost
					icon={<IoDownloadOutline size={20} />}
					iconPosition='end'
				>
					Descargar Excel
				</Button>
				<Button
					type='primary'
					icon={<IoAdd size={24} />}
					onClick={() => router.push(`/orden-de-compra/${obra}/generar-oc`)}
				>
					Generar OC
				</Button>
			</div>
		</section>
	);
};

export default Toolbar;
