import { Tabs } from 'antd';
import TableOC from '@/components/purchase-orders/TableOC';
import OCReceipt from '@/components/oc-receipt/OCReceipt';
import { fetchData } from '@/services/utils';

const PurchaseOrderPage = async ({ params }) => {
	const { slug } = params;
	const oeuvre = await fetchData(`/oeuvres/${slug}`);

	const items = [
		{
			key: '1',
			label: 'Órdenes de Compra',
			children: <TableOC oeuvre={oeuvre} />,
		},
		{
			key: '2',
			label: 'Recepción de OC',
			children: <OCReceipt />,
		},
	];

	return <Tabs defaultActiveKey='1' items={items} />;
};

export default PurchaseOrderPage;
