'use client';
import { Drawer, Layout } from 'antd';
import CustomHeader from '@/components/layout/Header';
import CustomModal from '@/components/layout/Modal';
import OcPDF from '@/components/OcPDF';
import useGlobalContext from '@/hooks/useGlobalContext';

const { Content } = Layout;

const PurchaseOrderLayout = ({ children }) => {
	const {
		drawer: { drawerOpen, title },
		hideDrawer,
	} = useGlobalContext();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<CustomHeader />
			<Content style={{ padding: '8px 24px' }}>{children}</Content>
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

export default PurchaseOrderLayout;
