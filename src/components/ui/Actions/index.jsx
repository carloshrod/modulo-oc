import { usePathname, useRouter } from 'next/navigation';
import { Button, Space, Tooltip } from 'antd';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { TbPencilMinus } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi2';
import useGlobalContext from '@/hooks/useGlobalContext';
import InfoOC from '@/components/purchase-orders/InfoOC';

export const Actions = ({ record }) => {
	const { showDrawer, showModalConfirm, showModalNotification } =
		useGlobalContext();
	const router = useRouter();
	const pathname = usePathname();

	const notDisabled =
		record.oc_status === 'Rechazada' || record.oc_status === 'Borrador';

	const deleteOc = () => {
		console.log('Eliminando OC');
		showModalNotification({
			successText: 'Orden de compra eliminada exitosamente',
		});
	};

	const handleDelete = () => {
		showModalConfirm(() => deleteOc(), {
			danger: true,
			title: '¿Deseas eliminar esta Orden de Compra?',
			subtitle: 'Si eliminas no podrás recuperar los datos',
			okText: 'Eliminar',
			icon: {
				bgColor: '#FFEBEB',
				component: <HiOutlineTrash size={38} color='#E53535' />,
			},
		});
	};

	return (
		<Space size='small'>
			<Tooltip title='Ver OC'>
				<Button
					type='text'
					icon={<IoDocumentTextOutline size={20} color='#0D6EFD' />}
					onClick={() =>
						showDrawer({ title: record.oc_number, children: <InfoOC /> })
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
						router.push(`${pathname}/${record?.oc_number?.toLowerCase()}`)
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
