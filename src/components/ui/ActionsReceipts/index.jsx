import { usePathname, useRouter } from 'next/navigation';
import { Button, Space, Tooltip } from 'antd';
import { GiReceiveMoney } from 'react-icons/gi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { getPurchaseOrderByNumber } from '@/services/purchaseOrderServices';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';

const { GET_ONE_PURCHASE_ORDER, GET_PURCHASE_ORDER_TO_RECEIVE } = PO_TYPES;

const ActionsReceipts = ({ record }) => {
	const { dispatch: poDispatch } = usePurchaseOrderContext();
	const router = useRouter();
	const pathname = usePathname();

	const handleDisplayReceipt = async poNumber => {
		const data = await getPurchaseOrderByNumber({
			oeuvreId: record?.oeuvre_id,
			poNumber,
		});
		poDispatch({
			type: GET_ONE_PURCHASE_ORDER,
			payload: data,
		});
	};

	const handleReceivePo = async poNumber => {
		const data = await getPurchaseOrderByNumber({
			oeuvreId: record?.oeuvre_id,
			poNumber,
		});
		poDispatch({
			type: GET_PURCHASE_ORDER_TO_RECEIVE,
			payload: data,
		});
		router.push(`${pathname}/recibir-oc`);
	};

	return (
		<Space>
			<Tooltip title='Ver recepción'>
				<Button
					type='text'
					icon={<IoDocumentTextOutline size={20} color='#0D6EFD' />}
					onClick={() => handleDisplayReceipt(record.number)}
				/>
			</Tooltip>
			<Tooltip title='Recibir OC'>
				<Button
					type='text'
					icon={<GiReceiveMoney size={20} color='#0D6EFD' />}
					onClick={() => handleReceivePo(record.number)}
				/>
			</Tooltip>
		</Space>
	);
};

export default ActionsReceipts;
