import CustomEmpty from '@/components/ui/CustomEmpty';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useTableColumns from '@/hooks/useTableColumns';
import { Table } from 'antd';
import { useEffect, useState } from 'react';

const TablePoReceipts = () => {
	const { purchaseOrders } = usePurchaseOrderContext();
	const { receiptsColumns } = useTableColumns();
	const [approvedOrders, setapprovedOrders] = useState([]);

	const getApprovedOrders = () =>
		purchaseOrders.filter(po => po.status === 'Aprobada');

	useEffect(() => {
		if (purchaseOrders?.length > 0) {
			const data = getApprovedOrders();
			setapprovedOrders(data);
		}
	}, []);

	return (
		<div className='mainTableContainer'>
			<Table
				rowKey='id'
				columns={receiptsColumns}
				dataSource={approvedOrders}
				locale={{
					emptyText: <CustomEmpty itemName='OCs' />,
				}}
			/>
		</div>
	);
};

export default TablePoReceipts;
