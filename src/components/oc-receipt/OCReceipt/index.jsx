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

const OCReceipt = () => {
	const { purchaseOrder, getPurchaseOrder, getPurchaseOrderToReceive } =
		useOcContext();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => getPurchaseOrderToReceive(undefined), []);

	const handleReceiveOc = () => {
		router.push(`${pathname}/recibir-oc`);
		getPurchaseOrderToReceive(purchaseOrder?.oc_number);
	};

	return purchaseOrder?.oc_number ? (
		<>
			<Toolbar onClick={() => getPurchaseOrder(undefined)} back={false}>
				<Button
					type='primary'
					icon={<GiReceiveMoney size={20} />}
					iconPosition='start'
					size='large'
					onClick={handleReceiveOc}
				>
					Recibir {purchaseOrder?.oc_number}
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
