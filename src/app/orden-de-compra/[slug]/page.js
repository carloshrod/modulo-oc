import { Tabs } from 'antd';
import TableOC from '@/components/tables/TableOC';
import TableOCReceipts from '@/components/tables/TableOCReceipts';

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
			children: <TableOCReceipts />,
		},
	];

	return <Tabs defaultActiveKey='1' items={items} />;
};

export default PurchaseOrder;
