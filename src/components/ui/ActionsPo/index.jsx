import { usePathname, useRouter } from 'next/navigation';
import { Button, Space, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbPencilMinus } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import useUiContext from '@/hooks/useUiContext';
import InfoPurchaseOrder from '@/components/purchase-orders/InfoPurchaseOrder';
import { deletePurchaseOrder as deletePurchaseOrderService } from '@/services/purchaseOrderServices';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';
import { UI_TYPES } from '@/context/ui/uiActions';

const { SHOW_DRAWER } = UI_TYPES;
const { DELETE_PURCHASE_ORDER } = PO_TYPES;

export const ActionsPo = ({ record }) => {
	const {
		showModalConfirm,
		showModalNotification,
		dispatch: uiDispatch,
	} = useUiContext();
	const { dispatch: poDispatch } = usePurchaseOrderContext();
	const router = useRouter();
	const pathname = usePathname();

	const notDisabled =
		record.status === 'Rechazada' ||
		record.status === 'Borrador' ||
		record.status === 'En revisión';

	const handleShowDrawer = () =>
		uiDispatch({
			type: SHOW_DRAWER,
			payload: {
				title: record.number,
				children: <InfoPurchaseOrder />,
			},
		});

	const handleDelete = () => {
		showModalConfirm(
			async () => {
				const res = await deletePurchaseOrderService(record.id);
				if (res.deletedCount !== 0) {
					poDispatch({ type: DELETE_PURCHASE_ORDER, payload: record.id });
					showModalNotification({
						notificationText: 'Orden de compra eliminada exitosamente',
					});
				}
			},
			{
				warning: true,
				title: '¿Deseas eliminar esta Orden de Compra?',
				subtitle: 'Si eliminas no podrás recuperar los datos',
				okText: 'Eliminar',
			},
		);
	};

	return (
		<Space size='small'>
			<Tooltip title='Ver OC'>
				<Button
					type='text'
					icon={<IoDocumentTextOutline size={20} color='#0D6EFD' />}
					onClick={handleShowDrawer}
				/>
			</Tooltip>
			<Tooltip title={notDisabled ? 'Editar OC' : ''}>
				<Button
					type='text'
					icon={
						<TbPencilMinus
							size={20}
							color={notDisabled ? '#0D6EFD' : '#A0AEC0'}
						/>
					}
					onClick={() =>
						router.push(`${pathname}/${record?.number?.toLowerCase()}`)
					}
					disabled={!notDisabled}
				/>
			</Tooltip>
			<Tooltip title={notDisabled ? 'Eliminar OC' : ''}>
				<Button
					type='text'
					icon={
						<AiOutlineDelete
							size={20}
							color={notDisabled ? '#E53535' : '#FCBABA'}
						/>
					}
					onClick={handleDelete}
					disabled={!notDisabled}
				/>
			</Tooltip>
		</Space>
	);
};
