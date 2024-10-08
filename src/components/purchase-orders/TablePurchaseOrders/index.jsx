'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Table } from 'antd';
import TableToolbar from '@/components/ui/TableToolbar';
import CustomEmpty from '@/components/ui/CustomEmpty';
import useUiContext from '@/hooks/useUiContext';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import useTableColumns from '@/hooks/useTableColumns';
import { fetchData } from '@/services/utils';

const TablePurchaseOrders = ({ oeuvre }) => {
	const { drawer } = useUiContext();
	const { purchaseOrders, setPurchaseOrders, setPurchaseOrder } =
		usePurchaseOrderContext();
	const { poColumns } = useTableColumns();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => setPurchaseOrder({}), [drawer.isOpen]);

	const getPurchaseOrdersByOeuvre = async () => {
		const data = await fetchData(
			`/purchase-orders/${oeuvre?.id}?includeItems=false`,
		);
		setPurchaseOrders(data);
	};

	useEffect(() => {
		getPurchaseOrdersByOeuvre();
	}, [oeuvre?.id]);

	return (
		<>
			<TableToolbar
				oeuvreId={oeuvre?.id}
				table='oc'
				noData={!purchaseOrders}
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
