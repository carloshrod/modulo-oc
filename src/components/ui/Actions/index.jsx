import { usePathname, useRouter } from 'next/navigation';
import { Button, Space, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbPencilMinus } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import useGlobalContext from '@/hooks/useGlobalContext';
import InfoOC from '@/components/purchase-orders/InfoOC';
import { deletePurchaseOrder as deletePurchaseOrderService } from '@/services/purchaseOrdersServices';
import useOcContext from '@/hooks/useOcContext';
import { PO_TYPES } from '@/context/OC/purchaseOrdersActions';

const { DELETE_PURCHASE_ORDER } = PO_TYPES;

export const Actions = ({ record }) => {
	const { showDrawer, showModalConfirm, showModalNotification } =
		useGlobalContext();
	const { dispatch } = useOcContext();
	const router = useRouter();
	const pathname = usePathname();

	const notDisabled =
		record.status === 'Rechazada' ||
		record.status === 'Borrador' ||
		record.status === 'En revisión';

	const handleDelete = () => {
		showModalConfirm(
			async () => {
				const res = await deletePurchaseOrderService(record.id);
				if (res.deletedCount !== 0) {
					dispatch({ type: DELETE_PURCHASE_ORDER, payload: record.id });
					showModalNotification({
						notificationText: 'Orden de compra eliminada exitosamente',
					});
				}
			},
			{
				danger: true,
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
					onClick={() =>
						showDrawer({ title: record.number, children: <InfoOC /> })
					}
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
