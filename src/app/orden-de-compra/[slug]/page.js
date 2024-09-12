import { Tabs } from 'antd';
import TablePurchaseOrders from '@/components/purchase-orders/TablePurchaseOrders';
import PurchaseOrderReceipt from '@/components/po-receipt/PurchaseOrderReceipt';
import { fetchData } from '@/services/utils';

const PurchaseOrderPage = async ({ params }) => {
	const { slug } = params;
	const oeuvre = await fetchData(`/oeuvres/${slug}`);

	const items = [
		{
			key: '1',
			label: 'Órdenes de Compra',
			children: <TablePurchaseOrders oeuvre={oeuvre} />,
		},
		{
			key: '2',
			label: 'Recepción de OC',
			children: <PurchaseOrderReceipt />,
		},
	];

	return <Tabs defaultActiveKey='1' items={items} />;
};

export default PurchaseOrderPage;
