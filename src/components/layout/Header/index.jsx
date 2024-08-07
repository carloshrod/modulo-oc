import { Breadcrumb, Layout } from 'antd';
import { BiSolidChart, BiSolidUser } from 'react-icons/bi';
import { PiBuildingsFill } from 'react-icons/pi';
import { useParams, usePathname } from 'next/navigation';
import { generateBreadcrumbs } from '@/utils/utils';
import styles from './Header.module.css';

const { Header } = Layout;

const CustomHeader = () => {
	const obra = 'XXX Calle Santa Julia';
	const pathname = usePathname();
	const params = useParams();
	const hasBreadcrumb = pathname.includes('generar') || params?.oc_number;
	const bcItems = generateBreadcrumbs(pathname);

	return (
		<Header
			style={{
				height: 70,
				backgroundColor: 'transparent',
				padding: '16px 24px 0',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<div className={styles.header}>
				<div className={styles.title}>
					{hasBreadcrumb && <Breadcrumb items={bcItems} />}
					<h3>
						Orden de compra <span>{obra}</span>
					</h3>
				</div>
				<section className={styles.info}>
					<BiSolidChart size={16} />
					<span className={styles.constructor}>
						<PiBuildingsFill size={16} />
						Contructora Ejemplo
					</span>
					<span className={styles.fullName}>
						<BiSolidUser size={16} />
						Nombre Apellido
					</span>
					<span>12 Ene 2023 17:38</span>
				</section>
			</div>
		</Header>
	);
};

export default CustomHeader;
