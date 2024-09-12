'use client';
import { usePathname, useRouter } from 'next/navigation';
import TableToolbar from '@/components/ui/TableToolbar';
import useTableColumns from '@/hooks/useTableColumns';
import { Table } from 'antd';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { useEffect } from 'react';
import { fetchData } from '@/services/utils';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';

const { GET_ALL_PURCHASE_ORDERS } = PO_TYPES;

const TablePurchaseOrders = ({ oeuvre }) => {
	const { purchaseOrders, dispatch } = usePurchaseOrderContext();
	const { ocColumns } = useTableColumns();
	const router = useRouter();
	const pathname = usePathname();

	const getPurchaseOrdersByOeuvre = async () => {
		const data = await fetchData(`/purchase-orders/${oeuvre?.id}`);
		dispatch({
			type: GET_ALL_PURCHASE_ORDERS,
			payload: data,
		});
	};

	useEffect(() => {
		getPurchaseOrdersByOeuvre();
	}, [oeuvre?.id]);

	return (
		<>
			<TableToolbar
				table='oc'
				showTable={true}
				onClick={() => router.push(`${pathname}/generar-orden-de-compra`)}
			/>
			<div className='mainTableContainer'>
				<Table rowKey='id' columns={ocColumns} dataSource={purchaseOrders} />
			</div>
		</>
	);
};

export default TablePurchaseOrders;
