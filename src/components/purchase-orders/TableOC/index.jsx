'use client';
import { usePathname, useRouter } from 'next/navigation';
import TableToolbar from '@/components/ui/TableToolbar';
import useTableColumns from '@/hooks/useTableColumns';
import { Table } from 'antd';
import useOcContext from '@/hooks/useOcContext';
import { useEffect } from 'react';
import { fetchData } from '@/services/utils';

const TableOC = ({ oeuvre }) => {
	const { getPurchaseOrders, purchaseOrders } = useOcContext();
	const { ocColumns } = useTableColumns();
	const router = useRouter();
	const pathname = usePathname();

	const getPurchaseOrdersByOeuvre = async () => {
		const data = await fetchData(`/purchase-orders/${oeuvre?.id}`);
		getPurchaseOrders(data);
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

export default TableOC;
