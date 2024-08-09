'use client';
import useTableColumns from '@/hooks/useTableColumns';
import { receiptsData } from '@/utils/consts';
import { Table } from 'antd';

const TableOCReceipts = () => {
	const { receiptsColumns } = useTableColumns();

	return (
		<div className='mainTableContainer'>
			<Table rowKey='id' columns={receiptsColumns} dataSource={receiptsData} />
		</div>
	);
};

export default TableOCReceipts;
