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

	const canCreatorEdit =
		record?.user_create === loggedUser?.id && record.status === 'Borrador';

	const canApproverEdit =
		record?.current_approver?.user_id === loggedUser?.id &&
		record.status === 'En revisión';

	const userResponsible = record?.current_approver
		? record?.current_approver?.user_id
		: record?.user_create;
	const poRejectedIsEditable =
		record.status === 'Rechazada' && userResponsible === loggedUser?.id;

	const isEditable = canCreatorEdit || canApproverEdit || poRejectedIsEditable;

	const isDeletable =
		record.status === 'Borrador' || record.status === 'Aprobada';

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
			<Tooltip title={isDeletable ? 'Eliminar OC' : ''}>
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
