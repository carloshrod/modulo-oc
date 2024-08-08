'use client';
import { useState } from 'react';
import Toolbar from '@/components/ui/Toolbar';
import useTableColumns from '@/hooks/useTableColumns';
import { receiptsData } from '@/utils/consts';
import { Table } from 'antd';

const TableOCReceipts = () => {
	const [showTable, setShowTable] = useState(true);
	const { receiptsColumns } = useTableColumns();

	const handleShow = () => setShowTable(!showTable);

	return showTable ? (
		<>
			<Toolbar table='receipts' onClick={handleShow} />
			<div className='mainTableContainer'>
				<Table
					rowKey='id'
					columns={receiptsColumns}
					dataSource={receiptsData}
				/>
			</div>
		</>
	) : (
		<h1>Recibir OC</h1>
	);
};

export default TableOCReceipts;
