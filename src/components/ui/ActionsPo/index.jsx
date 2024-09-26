import { usePathname, useRouter } from 'next/navigation';
import { Button, Space, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbPencilMinus } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import useUiContext from '@/hooks/useUiContext';
import InfoPurchaseOrder from '@/components/purchase-orders/InfoPurchaseOrder';
import { cancelPurchaseOrder } from '@/services/purchaseOrderServices';
import usePurchaseOrderContext from '@/hooks/usePurchaseOrderContext';
import { PO_TYPES } from '@/context/purchase-order/purchaseOrderActions';
import { UI_TYPES } from '@/context/ui/uiActions';
import { checkIsDeletable, checkIsEditable } from '@/components/utils';

const { SHOW_DRAWER } = UI_TYPES;
const { UPDATE_PURCHASE_ORDER } = PO_TYPES;

export const ActionsPo = ({ record }) => {
	const {
		showModalConfirm,
		showModalNotification,
		dispatch: uiDispatch,
	} = useUiContext();
	const { loggedUser, dispatch: poDispatch } = usePurchaseOrderContext();
	const router = useRouter();
	const pathname = usePathname();

	const isEditable = checkIsEditable(record, loggedUser);
	const isDeletable = checkIsDeletable(record, loggedUser);

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
				const res = await cancelPurchaseOrder(record.id, loggedUser?.id);
				if (res.status === 200) {
					poDispatch({
						type: UPDATE_PURCHASE_ORDER,
						payload: { ...record, status: res.data.newStatus },
					});
					showModalNotification({
						notificationText: res.data.message,
					});
				}
			},
			{
				warning: true,
				title: `¿Deseas ${record?.status === 'Borrador' ? 'cancelar' : 'cerrar'} esta Orden de Compra?`,
				subtitle: 'Si lo haces no podrás revertirlo',
				okText: 'Aceptar',
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
			<Tooltip title={isEditable ? 'Editar OC' : ''}>
				<Button
					type='text'
					icon={
						<TbPencilMinus
							size={20}
							color={isEditable ? '#0D6EFD' : '#A0AEC0'}
						/>
					}
					onClick={() =>
						router.push(`${pathname}/${record?.number?.toLowerCase()}`)
					}
					disabled={!isEditable}
				/>
			</Tooltip>
			<Tooltip
				title={
					isDeletable
						? `${record?.status === 'Borrador' ? 'Cancelar' : 'Cerrar'} OC`
						: ''
				}
			>
				<Button
					type='text'
					icon={
						<AiOutlineDelete
							size={20}
							color={isDeletable ? '#E53535' : '#FCBABA'}
						/>
					}
					onClick={handleDelete}
					disabled={!isDeletable}
				/>
			</Tooltip>
		</Space>
	);
};
