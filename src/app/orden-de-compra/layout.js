'use client';
import { Drawer, Layout } from 'antd';
import CustomHeader from '@/components/Header';
import OcPDF from '@/components/OcPDF';
import CustomModal from '@/components/Modal';
import useGlobalContext from '@/hooks/useGlobalContext';

const { Content } = Layout;

const PurchaseOrderLayout = ({ children }) => {
	const {
		drawer: { drawerOpen, title },
		hideDrawer,
	} = useGlobalContext();

	return (
		<Layout>
			<CustomHeader />
			<Content style={{ padding: '8px 16px' }}>{children}</Content>
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
