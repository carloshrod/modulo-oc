import { Breadcrumb, Layout } from 'antd';
import { BiSolidChart, BiSolidUser } from 'react-icons/bi';
import { PiBuildingsFill } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { generateBreadcrumbs } from '@/utils/utils';
import styles from './Header.module.css';

const { Header } = Layout;

const CustomHeader = () => {
	const obra = 'XXX Calle Santa Julia';
	const pathname = usePathname();
	const hasBreadcrumb = pathname.includes('generar');
	const bcItems = generateBreadcrumbs(pathname);

	return (
		<Header
			style={{
				height: 70,
				backgroundColor: 'transparent',
				padding: '12px 16px 0',
			}}
		>
			<div className={styles.header}>
				<div className={styles.title}>
					{hasBreadcrumb && (
						<Breadcrumb items={bcItems} style={{ fontSize: 12 }} />
					)}
					<h3>
						Orden de compra <span>{obra}</span>
					</h3>
				</div>
				<section className={styles.info}>
					<BiSolidChart size={16} />
					<span>
						<PiBuildingsFill size={16} />
						Contructora Ejemplo
					</span>
					<span>
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
