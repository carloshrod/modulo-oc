import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useTableColumns from '@/hooks/useTableColumns';
import { Table } from 'antd';

const TablePoReceipts = () => {
	const { purchaseOrders } = usePurchaseOrderContext();
	const { receiptsColumns } = useTableColumns();

	const approvedOrders =
		purchaseOrders?.length > 0 &&
		purchaseOrders.filter(po => po.status === 'Aprobada');

	return (
		<div className='mainTableContainer'>
			<Table
				rowKey='id'
				columns={receiptsColumns}
				dataSource={approvedOrders}
			/>
		</div>
	);
};

export default TablePoReceipts;
