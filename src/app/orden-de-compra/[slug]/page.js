'use client';
import styles from './PurchaseOrder.module.css';
import { Drawer, Layout } from 'antd';
import CustomHeader from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import Datatable from '@/components/Datatable';
import OcPDF from '@/components/OcPDF';
import CustomModal from '@/components/CustomModal';
import useGlobalContext from '@/hooks/useGlobalContext';

const { Content } = Layout;

const PurchaseOrder = () => {
	const {
		drawer: { drawerOpen, title },
		hideDrawer,
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
				onClose={hideDrawer}
				open={drawerOpen}
				style={{ backgroundColor: '#E1E1E2' }}
			>
				<OcPDF />
			</Drawer>
			<CustomModal />
		</Layout>
	);
};

export default PurchaseOrder;
