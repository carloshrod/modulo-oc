'use client';
import styles from './PurchaseOrder.module.css';
import { Drawer, Layout } from 'antd';
import CustomHeader from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import Datatable from '@/components/Datatable';
import useGlobalContext from '@/hooks/useGlobalContext';
import OcPDF from '@/components/OcPDF';

const { Content } = Layout;

const PurchaseOrder = () => {
	const {
		drawer: { open, title },
		onClose,
	} = useGlobalContext();

	return (
		<Layout>
			<CustomHeader />
			<Content style={{ padding: '8px 16px' }}>
				<Toolbar />
				<div className={styles.tableContainer}>
					<Datatable />
				</div>
			</Content>
			<Drawer
				title={title}
				onClose={onClose}
				open={open}
				style={{ backgroundColor: '#E1E1E2' }}
			>
				<OcPDF />
			</Drawer>
		</Layout>
	);
};

export default PurchaseOrder;
