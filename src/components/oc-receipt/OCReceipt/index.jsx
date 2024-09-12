'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import Toolbar from '@/components/ui/Toolbar';
import InfoReceiptOC from '../InfoReceiptOC';
import TableToolbar from '@/components/ui/TableToolbar';
import TableOCReceipts from '../TableOCReceipts';
import useOcContext from '@/hooks/useOcContext';
import { useEffect } from 'react';
import { PO_TYPES } from '@/context/OC/purchaseOrdersActions';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrdersServices';

const { GET_ONE_PURCHASE_ORDER, GET_PURCHASE_ORDER_TO_RECEIVE } = PO_TYPES;

const OCReceipt = () => {
	const { purchaseOrder, dispatch } = useOcContext();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		dispatch({ type: GET_ONE_PURCHASE_ORDER, payload: {} });
		dispatch({ type: GET_PURCHASE_ORDER_TO_RECEIVE, payload: {} });
	}, []);

	const handleReceiveOc = async () => {
		const data = await getPurchaseOrderByNumber({
			poNumber: purchaseOrder?.number,
		});
		dispatch({ type: GET_PURCHASE_ORDER_TO_RECEIVE, payload: data });
		router.push(`${pathname}/recibir-oc`);
	};

	return purchaseOrder?.number ? (
		<>
			<Toolbar
				onClick={() => dispatch({ type: GET_ONE_PURCHASE_ORDER, payload: {} })}
				back={false}
			>
				<Button
					type='primary'
					icon={<GiReceiveMoney size={20} />}
					iconPosition='start'
					size='large'
					onClick={handleReceiveOc}
				>
					Recibir {purchaseOrder?.number}
				</Button>
			</Toolbar>
			<InfoReceiptOC purchaseOrder={purchaseOrder} />
		</>
	) : (
		<>
			<TableToolbar
				table='receipts'
				onClick={() => router.push(`${pathname}/recibir-oc`)}
			/>
			<TableOCReceipts />
		</>
	);
};

export default OCReceipt;
