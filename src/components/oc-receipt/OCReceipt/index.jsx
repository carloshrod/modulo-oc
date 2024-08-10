'use client';
import { useState } from 'react';
import TableToolbar from '@/components/ui/TableToolbar';
import TableOCReceipts from '../TableOCReceipts';
import SearchReceipt from '../SearchReceipt';
import useOcContext from '@/hooks/useOcContext';
import InfoReceiptOC from '../InfoReceiptOC';
import { BiArrowBack } from 'react-icons/bi';
import { Button } from 'antd';

const OCReceipt = () => {
	const { purchaseOrder, getPurchaseOrder } = useOcContext();
	const [showTable, setShowTable] = useState(true);

	const handleShow = () => setShowTable(!showTable);

	return showTable ? (
		purchaseOrder?.oc_number ? (
			<>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						type='primary'
						ghost
						icon={<BiArrowBack size={20} />}
						iconPosition='start'
						size='large'
						onClick={() => getPurchaseOrder(undefined)}
					>
						Volver a tabla
					</Button>
				</div>
				<InfoReceiptOC purchaseOrder={purchaseOrder} />
			</>
		) : (
			<>
				<TableToolbar table='receipts' onClick={handleShow} />
				<TableOCReceipts />
			</>
		)
	) : (
		<SearchReceipt handleShow={handleShow} />
	);
};

export default OCReceipt;
