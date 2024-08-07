'use client';
import { useState } from 'react';
import Toolbar from '@/components/layout/Toolbar';
import Datatable from '../Datatable';
import useTableColumns from '@/hooks/useTableColumns';
import { receiptsData } from '@/utils/consts';

const TableOCReceipts = () => {
	const [showTable, setShowTable] = useState(true);
	const { receiptsColumns } = useTableColumns();

	const handleShow = () => setShowTable(!showTable);

	return (
		<>
			<Toolbar table='receipts' showTable={showTable} onClick={handleShow} />
			{showTable ? (
				<Datatable columns={receiptsColumns} dataSource={receiptsData} />
			) : (
				<h1>Recibir OC</h1>
			)}
		</>
	);
};

export default TableOCReceipts;
