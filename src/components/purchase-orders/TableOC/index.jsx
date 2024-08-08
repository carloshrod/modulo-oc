'use client';
import { useRouter } from 'next/navigation';
import Toolbar from '@/components/ui/Toolbar';
import useTableColumns from '@/hooks/useTableColumns';
import { ocData } from '@/utils/consts';
import { Table } from 'antd';

const TableOC = () => {
	const obra = 'xxx-calle-santa-julia';
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
				<Table rowKey='id' columns={ocColumns} dataSource={ocData} />
			</div>
		</>
	);
};

export default TableOC;
