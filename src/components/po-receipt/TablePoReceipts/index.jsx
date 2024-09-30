import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Table } from 'antd';
import CustomEmpty from '@/components/ui/CustomEmpty';
import TableToolbar from '@/components/ui/TableToolbar';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useTableColumns from '@/hooks/useTableColumns';

const TablePoReceipts = ({ oeuvreId }) => {
	const { purchaseOrders } = usePurchaseOrderContext();
	const { receiptsColumns } = useTableColumns();
	const [approvedOrders, setApprovedOrders] = useState([]);
	const router = useRouter();
	const pathname = usePathname();

	const getApprovedOrders = () =>
		purchaseOrders.filter(po => po.status === 'Aprobada');

	useEffect(() => {
		if (purchaseOrders?.length > 0) {
			const data = getApprovedOrders();
			setApprovedOrders(data);
		} else {
			setApprovedOrders(undefined);
		}
	}, []);

	return (
		<>
			<TableToolbar
				oeuvreId={oeuvreId}
				table='receipts'
				noData={!approvedOrders}
				onClick={() => router.push(`${pathname}/recibir-oc`)}
			/>

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
		</>
	);
};

export default TablePoReceipts;
