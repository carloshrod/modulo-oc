'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Table } from 'antd';
import TableToolbar from '@/components/ui/TableToolbar';
import useUiContext from '@/hooks/useUiContext';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useTableColumns from '@/hooks/useTableColumns';
import { fetchData } from '@/services/utils';
import { generatePoExcelData } from '@/utils/documents';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';
import CustomEmpty from '@/components/ui/CustomEmpty';

const { GET_ALL_PURCHASE_ORDERS, GET_ONE_PURCHASE_ORDER } = PO_TYPES;

const TablePurchaseOrders = ({ oeuvre }) => {
	const { drawer } = useUiContext();
	const { purchaseOrders, dispatch } = usePurchaseOrderContext();
	const { poColumns } = useTableColumns();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(
		() => dispatch({ type: GET_ONE_PURCHASE_ORDER, payload: {} }),
		[drawer.isOpen],
	);

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
				excelData={generatePoExcelData(purchaseOrders)}
				onClick={() => router.push(`${pathname}/generar-orden-de-compra`)}
			/>
			<div className='mainTableContainer'>
				<Table
					rowKey='id'
					columns={poColumns}
					dataSource={purchaseOrders}
					rowClassName={record =>
						record.status === 'Cerrada' ? 'closed-row' : ''
					}
					locale={{
						emptyText: <CustomEmpty itemName='OCs' />,
					}}
				/>
			</div>
		</>
	);
};

export default TablePurchaseOrders;
