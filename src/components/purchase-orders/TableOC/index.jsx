'use client';
import { useRouter } from 'next/navigation';
import Toolbar from '@/components/ui/Toolbar';
import useTableColumns from '@/hooks/useTableColumns';
import { Table } from 'antd';
import useOcContext from '@/hooks/useOcContext';

const TableOC = () => {
	const obra = 'xxx-calle-santa-julia';
	const { purchaseOrders } = useOcContext();
	const { ocColumns } = useTableColumns();
	const router = useRouter();

	return (
		<>
			<Toolbar
				table='oc'
				showTable={true}
				onClick={() =>
					router.push(`/orden-de-compra/${obra}/generar-orden-de-compra`)
				}
			/>
			<div className='mainTableContainer'>
				<Table rowKey='id' columns={ocColumns} dataSource={purchaseOrders} />
			</div>
		</>
	);
};

export default TableOC;
