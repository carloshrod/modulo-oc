'use client';
import TableToolbar from '@/components/ui/TableToolbar';
import TableOCReceipts from '../TableOCReceipts';
import useOcContext from '@/hooks/useOcContext';
import InfoReceiptOC from '../InfoReceiptOC';
import { usePathname, useRouter } from 'next/navigation';
import GoBack from '@/components/ui/GoBack';

const OCReceipt = () => {
	const { purchaseOrder, getPurchaseOrder } = useOcContext();
	const router = useRouter();
	const pathname = usePathname();

	return purchaseOrder?.oc_number ? (
		<>
			<GoBack onClick={() => getPurchaseOrder(undefined)} />
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
