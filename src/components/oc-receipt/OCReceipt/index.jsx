'use client';
import { useState } from 'react';
import Toolbar from '@/components/ui/Toolbar';
import TableOCReceipts from '../TableOCReceipts';
import SearchReceipt from '../SearchReceipt';

const OCReceipt = () => {
	const [showTable, setShowTable] = useState(true);

	const handleShow = () => setShowTable(!showTable);

	return showTable ? (
		<>
			<Toolbar table='receipts' onClick={handleShow} />
			<TableOCReceipts />
		</>
	) : (
		<SearchReceipt handleShow={handleShow} />
	);
};

export default OCReceipt;
