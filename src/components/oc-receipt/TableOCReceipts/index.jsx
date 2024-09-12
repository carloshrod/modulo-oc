import useOcContext from '@/hooks/useOcContext';
import useTableColumns from '@/hooks/useTableColumns';
import { Table } from 'antd';

const TableOCReceipts = () => {
	const { purchaseOrders } = useOcContext();
	const { receiptsColumns } = useTableColumns();

	const approvedOrders = purchaseOrders.filter(po => po.status === 'Aprobada');

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

export default TableOCReceipts;
