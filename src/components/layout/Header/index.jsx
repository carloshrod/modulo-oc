'use client';
import { Breadcrumb, Button, Layout } from 'antd';
import {
	BiArrowBack,
	BiSolidChart,
	BiSolidUser,
	BiLogOut,
} from 'react-icons/bi';
import { PiBuildingsFill } from 'react-icons/pi';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { formatTitle, generateBreadcrumbs } from '@/utils/utils';
import styles from './Header.module.css';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import moment from 'moment';
import 'moment/locale/es';

const { Header } = Layout;

const CustomHeader = () => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const oeuvreName = formatTitle(params?.slug);
	const hasBreadcrumb =
		pathname.includes('generar') ||
		params?.oc_number ||
		pathname.includes('recibir');
	const bcItems = generateBreadcrumbs(pathname);
	const { loggedUser, setLoggedUser } = usePurchaseOrderContext();

	const today = moment(new Date()).format('DD MMM YYYY HH:mm');

	return (
		<Header
			style={{
				height: 'auto',
				backgroundColor: 'transparent',
				padding: '16px 24px 0',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<section className={styles.header}>
				<div className={styles.title}>
					{hasBreadcrumb && <Breadcrumb items={bcItems} />}
					<h3>
						Orden de compra <span>{oeuvreName}</span>
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
						{loggedUser.full_name}
					</span>
					<span>{today}</span>
					<Button
						type='text'
						icon={<BiLogOut size={20} />}
						iconPosition='start'
						onClick={() => {
							localStorage.removeItem('loggedUser');
							router.push('/');
							setLoggedUser({});
						}}
						style={{ color: '#718096' }}
					/>
				</section>
			</section>
			{pathname === `/orden-de-compra/${params?.slug}` ? (
				<section className={styles.goHome}>
					<Button
						type='primary'
						ghost
						icon={<BiArrowBack size={20} />}
						iconPosition='start'
						onClick={() => router.push('/orden-de-compra')}
					>
						Volver a todas las Obras
					</Button>
				</section>
			) : null}
		</Header>
	);
};

export default CustomHeader;
