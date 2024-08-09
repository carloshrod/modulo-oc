import { Tabs } from 'antd';
import TableOC from '@/components/purchase-orders/TableOC';
import OCReceipt from '@/components/oc-receipt/OCReceipt';

const PurchaseOrder = () => {
	const items = [
		{
			key: '1',
			label: 'Órdenes de Compra',
			children: <TableOC />,
		},
		{
			key: '2',
			label: 'Recepción de OC',
			children: <OCReceipt />,
		},
	];

	return <Tabs defaultActiveKey='1' items={items} />;
};

export default PurchaseOrder;
