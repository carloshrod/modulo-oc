'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import Toolbar from '@/components/ui/Toolbar';
import InfoReceiptPo from '../InfoReceiptPo';
import TableToolbar from '@/components/ui/TableToolbar';
import TablePoReceipts from '../TablePoReceipts';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrderServices';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';

const { GET_ONE_PURCHASE_ORDER, GET_PURCHASE_ORDER_TO_RECEIVE } = PO_TYPES;

const PurchaseOrderReceipt = ({ oeuvreId }) => {
	const { purchaseOrder, dispatch } = usePurchaseOrderContext();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		dispatch({ type: GET_ONE_PURCHASE_ORDER, payload: {} });
		dispatch({ type: GET_PURCHASE_ORDER_TO_RECEIVE, payload: {} });
	}, []);

	const handleReceiveOc = async () => {
		const data = await getPurchaseOrderByNumber({
			oeuvreId,
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
			<InfoReceiptPo />
		</>
	) : (
		<>
			<TableToolbar
				table='receipts'
				onClick={() => router.push(`${pathname}/recibir-oc`)}
			/>
			<TablePoReceipts />
		</>
	);
};

export default PurchaseOrderReceipt;
