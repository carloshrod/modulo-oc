'use client';
import { useRouter } from 'next/navigation';
import Toolbar from '@/components/ui/Toolbar';
import Datatable from '../Datatable';
import useTableColumns from '@/hooks/useTableColumns';
import { ocData } from '@/utils/consts';

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
			<Datatable columns={ocColumns} dataSource={ocData} />
		</>
	);
};

export default TableOC;
