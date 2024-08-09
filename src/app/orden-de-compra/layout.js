import { Layout } from 'antd';
import CustomHeader from '@/components/layout/Header';
import CustomModal from '@/components/layout/Modal';
import CustomDrawer from '@/components/layout/Drawer';
import ModalForm from '@/components/layout/ModalForm';

const PurchaseOrderLayout = ({ children }) => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<CustomHeader />
			<main>{children}</main>
			<CustomDrawer />
			<CustomModal />
			<ModalForm />
		</Layout>
	);
};

export default PurchaseOrderLayout;
