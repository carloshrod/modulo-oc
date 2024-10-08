'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import Toolbar from '@/components/ui/Toolbar';
import InfoReceiptPo from '../InfoReceiptPo';
import TablePoReceipts from '../TablePoReceipts';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrderServices';

const PurchaseOrderReceipt = ({ oeuvreId }) => {
	const { purchaseOrder, setPurchaseOrder, setPurchaseOrderToReceive } =
		usePurchaseOrderContext();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		setPurchaseOrder({});
		setPurchaseOrderToReceive({});
	}, []);

	const handleReceiveOc = async () => {
		const data = await getPurchaseOrderByNumber({
			oeuvreId,
			poNumber: purchaseOrder?.number,
		});
		setPurchaseOrderToReceive(data);
		router.push(`${pathname}/recibir-oc`);
	};

	return purchaseOrder?.number ? (
		<>
			<Toolbar onClick={() => setPurchaseOrder({})} back={false}>
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
		<TablePoReceipts oeuvreId={oeuvreId} />
	);
};

export default PurchaseOrderReceipt;
